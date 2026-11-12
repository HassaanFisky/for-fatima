/**
 * Ambient & Tactile Sound Engine for For Fatima.
 * - Intended experience: Sound ON by default (desiredSoundOn = true).
 * - Background Music: Plays the creator-provided instrumental (/audio/background-instrumental.mp3)
 *   in a single seamless loop with volume set to 0.70 (70%).
 * - Attempts autoplay on load; if blocked by browser autoplay policy,
 *   seamlessly starts on the first user interaction unless muted.
 * - Provides dedicated tactile sound identities:
 *   1. playStarBell(): Soft two-note bell "tin tin" for all stars and the moon.
 *   2. playPlushTouch(): Soft, gentle "puchup" plush-squish for teddy bears.
 *   3. playInteractionNote() & playCompletionChord() for cards, lantern, and flowers.
 */

import type { WorldPhase } from "./world-state";

export const BACKGROUND_INSTRUMENTAL_SRC = "/audio/background-instrumental.mp3";
export const BACKGROUND_INSTRUMENTAL_VOLUME = 0.7; // 70% volume

const CELESTA_SCALE = [
  329.63, // E4
  369.99, // F#4
  440.0,  // A4
  493.88, // B4
  554.37, // C#5
  659.25, // E5
  739.99, // F#5
  880.0,  // A5
];

export class AmbientAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private bgAudio: HTMLAudioElement | null = null;

  private mood: WorldPhase = "night";
  private desiredSoundOn = true;
  private playing = false;
  private wasRunningBeforeHide = false;
  private lastStarBellMs = 0;
  private lastPlushMs = 0;
  private stateChangeCallback: ((desired: boolean, playing: boolean) => void) | null = null;

  public get isDesired(): boolean {
    return this.desiredSoundOn;
  }

  public get isPlaying(): boolean {
    const bgPlaying = Boolean(
      this.bgAudio && !this.bgAudio.paused && !this.bgAudio.ended
    );
    const ctxRunning = this.context?.state === "running";
    return this.desiredSoundOn && (bgPlaying || Boolean(ctxRunning && this.playing));
  }

  public get isSupported(): boolean {
    if (typeof window === "undefined") {
      return false;
    }
    const win = window as Window & {
      webkitAudioContext?: typeof AudioContext;
    };
    return Boolean(window.AudioContext || win.webkitAudioContext || window.Audio);
  }

  public onStateChange(cb: (desired: boolean, playing: boolean) => void): void {
    this.stateChangeCallback = cb;
  }

  private notifyState(): void {
    this.stateChangeCallback?.(this.desiredSoundOn, this.isPlaying);
  }

  private ensureBackgroundAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined" || typeof Audio === "undefined") {
      return null;
    }
    if (!this.bgAudio) {
      const audio = new Audio(BACKGROUND_INSTRUMENTAL_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = BACKGROUND_INSTRUMENTAL_VOLUME;

      audio.addEventListener("play", () => {
        this.playing = this.desiredSoundOn;
        this.notifyState();
      });
      audio.addEventListener("pause", () => {
        if (!this.desiredSoundOn) {
          this.playing = false;
        }
        this.notifyState();
      });

      this.bgAudio = audio;
    } else {
      this.bgAudio.volume = BACKGROUND_INSTRUMENTAL_VOLUME;
      this.bgAudio.loop = true;
    }
    return this.bgAudio;
  }

  private ensureWebAudioGraph(): void {
    if (typeof window === "undefined") {
      return;
    }
    if (this.context && this.context.state !== "closed") {
      return;
    }

    const win = window as Window & {
      webkitAudioContext?: typeof AudioContext;
    };
    const AudioContextCtor = window.AudioContext || win.webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    const context = new AudioContextCtor({
      latencyHint: "interactive",
    });

    const master = new GainNode(context, {
      gain: 0.34,
    });

    const compressor = new DynamicsCompressorNode(context, {
      threshold: -20,
      knee: 18,
      ratio: 3.0,
      attack: 0.015,
      release: 0.35,
    });

    master.connect(compressor);
    compressor.connect(context.destination);

    context.addEventListener("statechange", () => {
      this.notifyState();
    });

    this.context = context;
    this.master = master;
    this.compressor = compressor;
  }

  public setMood(mood: WorldPhase): void {
    this.mood = mood;
  }

  private playWarmBellTone(
    frequency: number,
    peakGain: number,
    durationSeconds: number,
    pan = 0,
    delaySeconds = 0
  ): void {
    if (
      !this.context ||
      !this.master ||
      !this.desiredSoundOn ||
      this.context.state !== "running"
    ) {
      return;
    }

    const context = this.context;
    const startTime = context.currentTime + delaySeconds;

    const fundamental = new OscillatorNode(context, {
      type: "sine",
      frequency,
    });
    const overtone = new OscillatorNode(context, {
      type: "triangle",
      frequency: frequency * 2,
    });

    const overtoneGain = new GainNode(context, {
      gain: 0.14,
    });

    const toneFilter = new BiquadFilterNode(context, {
      type: "lowpass",
      frequency: Math.min(2400, frequency * 2.6),
      Q: 0.5,
    });

    const envelope = new GainNode(context, {
      gain: 0.0001,
    });

    const panner = new StereoPannerNode(context, {
      pan,
    });

    envelope.gain.setValueAtTime(0.0001, startTime);
    envelope.gain.linearRampToValueAtTime(peakGain, startTime + 0.018);
    envelope.gain.exponentialRampToValueAtTime(
      peakGain * 0.32,
      startTime + durationSeconds * 0.35
    );
    envelope.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + durationSeconds
    );

    fundamental.connect(toneFilter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(toneFilter);
    toneFilter.connect(envelope);
    envelope.connect(panner);
    panner.connect(this.master);

    fundamental.start(startTime);
    overtone.start(startTime);
    fundamental.stop(startTime + durationSeconds + 0.04);
    overtone.stop(startTime + durationSeconds + 0.04);

    fundamental.addEventListener(
      "ended",
      () => {
        fundamental.disconnect();
        overtone.disconnect();
        overtoneGain.disconnect();
        toneFilter.disconnect();
        envelope.disconnect();
        panner.disconnect();
      },
      { once: true }
    );
  }

  /**
   * Consistent two-note bell-like "tin tin" sound for all stars and the moon.
   */
  public playStarBell(): void {
    if (!this.desiredSoundOn) {
      return;
    }

    const nowMs = Date.now();
    if (nowMs - this.lastStarBellMs < 135) {
      return;
    }
    this.lastStarBellMs = nowMs;

    const triggerTinTin = () => {
      this.playWarmBellTone(1046.5, 0.032, 0.52, -0.08, 0);
      this.playWarmBellTone(1318.51, 0.036, 0.68, 0.08, 0.095);
    };

    if (!this.context || this.context.state !== "running") {
      void this.unlockAndStart().then((started) => {
        if (started) {
          triggerTinTin();
        }
      });
      return;
    }

    triggerTinTin();
  }

  /**
   * Soft, gentle "puchup" plush-squish sound when touching Mochi or Yume teddy bears.
   */
  public playPlushTouch(): void {
    if (!this.desiredSoundOn) {
      return;
    }

    const nowMs = Date.now();
    if (nowMs - this.lastPlushMs < 150) {
      return;
    }
    this.lastPlushMs = nowMs;

    const triggerPuchup = () => {
      if (
        !this.context ||
        !this.master ||
        this.context.state !== "running"
      ) {
        return;
      }

      const context = this.context;
      const now = context.currentTime;

      const osc = new OscillatorNode(context, {
        type: "sine",
        frequency: 220,
      });
      const sub = new OscillatorNode(context, {
        type: "triangle",
        frequency: 145,
      });
      const filter = new BiquadFilterNode(context, {
        type: "lowpass",
        frequency: 580,
        Q: 0.7,
      });
      const env = new GainNode(context, {
        gain: 0.0001,
      });

      // Syllable 1 ("pu"): soft cushion compress
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(185, now + 0.042);
      // Syllable 2 ("chup"): gentle plush rebound
      osc.frequency.setValueAtTime(255, now + 0.052);
      osc.frequency.exponentialRampToValueAtTime(345, now + 0.115);

      sub.frequency.setValueAtTime(140, now);
      sub.frequency.exponentialRampToValueAtTime(195, now + 0.115);

      env.gain.setValueAtTime(0.0001, now);
      env.gain.linearRampToValueAtTime(0.036, now + 0.016);
      env.gain.exponentialRampToValueAtTime(0.008, now + 0.048);
      env.gain.linearRampToValueAtTime(0.04, now + 0.066);
      env.gain.exponentialRampToValueAtTime(0.0001, now + 0.135);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(env);
      env.connect(this.master);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.15);
      sub.stop(now + 0.15);

      osc.addEventListener(
        "ended",
        () => {
          osc.disconnect();
          sub.disconnect();
          filter.disconnect();
          env.disconnect();
        },
        { once: true }
      );
    };

    if (!this.context || this.context.state !== "running") {
      void this.unlockAndStart().then((started) => {
        if (started) {
          triggerPuchup();
        }
      });
      return;
    }

    triggerPuchup();
  }

  public playInteractionNote(stepIndex = 0): void {
    if (!this.desiredSoundOn) {
      return;
    }

    const triggerNote = () => {
      const frequency =
        CELESTA_SCALE[Math.abs(stepIndex) % CELESTA_SCALE.length];
      this.playWarmBellTone(frequency, 0.028, 1.4, 0);
    };

    if (!this.context || this.context.state !== "running") {
      void this.unlockAndStart().then((started) => {
        if (started) {
          triggerNote();
        }
      });
      return;
    }

    triggerNote();
  }

  public playCompletionChord(): void {
    if (!this.desiredSoundOn) {
      return;
    }

    const triggerArpeggio = () => {
      [0, 2, 4, 5].forEach((noteIndex, i) => {
        window.setTimeout(() => {
          const freq = CELESTA_SCALE[noteIndex % CELESTA_SCALE.length];
          this.playWarmBellTone(freq, 0.025, 1.9, -0.24 + i * 0.16);
        }, i * 110);
      });
    };

    if (!this.context || this.context.state !== "running") {
      void this.unlockAndStart().then((started) => {
        if (started) {
          triggerArpeggio();
        }
      });
      return;
    }

    triggerArpeggio();
  }

  public async unlockAndStart(): Promise<boolean> {
    if (!this.isSupported || !this.desiredSoundOn) {
      return false;
    }

    let startedAny = false;

    try {
      this.ensureWebAudioGraph();
      if (this.context && this.context.state === "suspended") {
        await this.context.resume();
      }
      if (this.context?.state === "running") {
        startedAny = true;
      }
    } catch {
      // Continue to HTMLAudioElement playback
    }

    try {
      const bg = this.ensureBackgroundAudio();
      if (bg) {
        bg.volume = BACKGROUND_INSTRUMENTAL_VOLUME;
        bg.loop = true;
        if (bg.paused) {
          await bg.play();
        }
        startedAny = true;
      }
    } catch {
      // Autoplay blocked until first user gesture
    }

    this.playing = startedAny;
    this.notifyState();
    return startedAny;
  }

  public async unmute(): Promise<boolean> {
    this.desiredSoundOn = true;
    this.notifyState();
    return this.unlockAndStart();
  }

  public async mute(): Promise<void> {
    this.desiredSoundOn = false;
    this.playing = false;

    if (this.bgAudio && !this.bgAudio.paused) {
      this.bgAudio.pause();
    }

    if (this.context && this.context.state === "running") {
      try {
        await this.context.suspend();
      } catch {
        // Ignore suspend errors
      }
    }

    this.notifyState();
  }

  public handleVisibility(visible: boolean): void {
    if (!visible) {
      this.wasRunningBeforeHide = this.desiredSoundOn && this.isPlaying;

      if (this.bgAudio && !this.bgAudio.paused) {
        this.bgAudio.pause();
      }
      if (this.context && this.context.state === "running") {
        void this.context.suspend().catch(() => {});
      }
      return;
    }

    if (visible && this.wasRunningBeforeHide && this.desiredSoundOn) {
      void this.unlockAndStart();
    }
  }

  public async dispose(): Promise<void> {
    this.desiredSoundOn = false;
    this.playing = false;

    if (this.bgAudio) {
      try {
        this.bgAudio.pause();
        this.bgAudio.src = "";
      } catch {
        // Ignore errors
      }
      this.bgAudio = null;
    }

    if (this.context && this.context.state !== "closed") {
      try {
        await this.context.close();
      } catch {
        // Ignore close errors
      }
    }

    this.context = null;
    this.master = null;
    this.compressor = null;
  }
}

export const AmbientNightSynth = AmbientAudioEngine;
