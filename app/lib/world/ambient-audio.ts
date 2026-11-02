/**
 * Warm Celesta & Ambient Pad Synthesis Engine for Konpeitō Night.
 * - Intended experience: Sound ON by default (desiredSoundOn = true).
 * - Attempts gentle autoplay on load; if blocked by browser autoplay policy,
 *   seamlessly unlocks on the first deliberate user interaction unless muted.
 * - Warm low-pass filtered acoustic pad + soft music-box bell harmonics.
 */

import type { WorldPhase } from "./world-state";

interface AudioMood {
  frequencies: readonly [number, number, number, number];
  filterCutoff: number;
  voiceGain: number;
  chimeProbability: number;
}

export const AUDIO_MOODS: Record<WorldPhase, AudioMood> = {
  preDawn: {
    frequencies: [130.81, 196.0, 246.94, 293.66], // Cmaj9 warm voicing
    filterCutoff: 440,
    voiceGain: 0.011,
    chimeProbability: 0.25,
  },
  sunrise: {
    frequencies: [146.83, 220.0, 277.18, 329.63], // Dmaj9
    filterCutoff: 680,
    voiceGain: 0.014,
    chimeProbability: 0.45,
  },
  morning: {
    frequencies: [174.61, 261.63, 329.63, 392.0], // Fmaj9
    filterCutoff: 860,
    voiceGain: 0.013,
    chimeProbability: 0.5,
  },
  afternoon: {
    frequencies: [164.81, 246.94, 329.63, 369.99], // Eadd9
    filterCutoff: 780,
    voiceGain: 0.012,
    chimeProbability: 0.35,
  },
  goldenHour: {
    frequencies: [146.83, 220.0, 293.66, 369.99], // Dmaj7
    filterCutoff: 660,
    voiceGain: 0.014,
    chimeProbability: 0.42,
  },
  sunset: {
    frequencies: [130.81, 196.0, 261.63, 329.63], // Cmaj7
    filterCutoff: 560,
    voiceGain: 0.014,
    chimeProbability: 0.38,
  },
  blueHour: {
    frequencies: [110.0, 164.81, 220.0, 261.63], // Am7 warm
    filterCutoff: 490,
    voiceGain: 0.012,
    chimeProbability: 0.32,
  },
  night: {
    frequencies: [110.0, 164.81, 246.94, 277.18], // Amaj9 dreamy lullaby
    filterCutoff: 450,
    voiceGain: 0.011,
    chimeProbability: 0.3,
  },
};

// Warm pentatonic music-box scale (A major / F# minor pentatonic in warm middle register)
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

interface Voice {
  oscillator: OscillatorNode;
  subOscillator: OscillatorNode;
  gain: GainNode;
  panner: StereoPannerNode;
}

export class AmbientAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private warmthFilter: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private voices: Voice[] = [];
  private modulationOscillator: OscillatorNode | null = null;
  private modulationGain: GainNode | null = null;

  private mood: WorldPhase = "night";
  private desiredSoundOn = true;
  private playing = false;
  private wasRunningBeforeHide = false;
  private chimeTimer: number | null = null;
  private stateChangeCallback: ((desired: boolean, playing: boolean) => void) | null = null;

  public get isDesired(): boolean {
    return this.desiredSoundOn;
  }

  public get isPlaying(): boolean {
    return this.playing && this.context?.state === "running";
  }

  public get isSupported(): boolean {
    if (typeof window === "undefined") {
      return false;
    }
    const win = window as Window & {
      webkitAudioContext?: typeof AudioContext;
    };
    return Boolean(window.AudioContext || win.webkitAudioContext);
  }

  public onStateChange(cb: (desired: boolean, playing: boolean) => void): void {
    this.stateChangeCallback = cb;
  }

  private notifyState(): void {
    this.stateChangeCallback?.(this.desiredSoundOn, this.isPlaying);
  }

  private createGraph(): void {
    if (typeof window === "undefined") {
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
      latencyHint: "playback",
    });

    // Primary lowpass filter to remove any harsh high-frequency buzz on phone speakers
    const filter = new BiquadFilterNode(context, {
      type: "lowpass",
      frequency: AUDIO_MOODS[this.mood].filterCutoff,
      Q: 0.55,
    });

    // Warm body shelf filter
    const warmthFilter = new BiquadFilterNode(context, {
      type: "lowshelf",
      frequency: 240,
      gain: 2.5,
    });

    const master = new GainNode(context, {
      gain: 0.0001,
    });

    const compressor = new DynamicsCompressorNode(context, {
      threshold: -22,
      knee: 20,
      ratio: 3.5,
      attack: 0.03,
      release: 0.45,
    });

    filter.connect(warmthFilter);
    warmthFilter.connect(master);
    master.connect(compressor);
    compressor.connect(context.destination);

    const panPositions = [-0.45, -0.15, 0.15, 0.45];

    this.voices = AUDIO_MOODS[this.mood].frequencies.map(
      (frequency, index) => {
        const oscillator = new OscillatorNode(context, {
          type: index % 2 === 0 ? "sine" : "triangle",
          frequency,
          detune: index % 2 === 0 ? -4 : 4,
        });

        const subOscillator = new OscillatorNode(context, {
          type: "sine",
          frequency: frequency * 0.5,
          detune: 2,
        });

        const subGain = new GainNode(context, {
          gain: 0.35,
        });

        const gain = new GainNode(context, {
          gain: AUDIO_MOODS[this.mood].voiceGain,
        });

        const panner = new StereoPannerNode(context, {
          pan: panPositions[index] ?? 0,
        });

        oscillator.connect(gain);
        subOscillator.connect(subGain);
        subGain.connect(gain);
        gain.connect(panner);
        panner.connect(filter);

        oscillator.start();
        subOscillator.start();

        return { oscillator, subOscillator, gain, panner };
      }
    );

    const modulationOscillator = new OscillatorNode(context, {
      type: "sine",
      frequency: 0.05,
    });

    const modulationGain = new GainNode(context, {
      gain: 48,
    });

    modulationOscillator.connect(modulationGain);
    modulationGain.connect(filter.frequency);
    modulationOscillator.start();

    context.addEventListener("statechange", () => {
      this.playing = this.desiredSoundOn && context.state === "running";
      this.notifyState();
    });

    this.context = context;
    this.filter = filter;
    this.warmthFilter = warmthFilter;
    this.master = master;
    this.compressor = compressor;
    this.modulationOscillator = modulationOscillator;
    this.modulationGain = modulationGain;
  }

  private rampMaster(value: number, durationSeconds: number): void {
    if (!this.context || !this.master) {
      return;
    }

    const now = this.context.currentTime;
    const gain = this.master.gain;

    gain.cancelScheduledValues(now);
    gain.setValueAtTime(Math.max(0.0001, gain.value), now);
    gain.linearRampToValueAtTime(value, now + durationSeconds);
  }

  public setMood(mood: WorldPhase): void {
    this.mood = mood;

    if (!this.context || !this.filter) {
      return;
    }

    const target = AUDIO_MOODS[mood];
    const now = this.context.currentTime;
    const transitionEnd = now + 6;

    this.voices.forEach((voice, index) => {
      const targetFreq = target.frequencies[index] ?? target.frequencies[0];
      voice.oscillator.frequency.cancelScheduledValues(now);
      voice.oscillator.frequency.setValueAtTime(
        Math.max(20, voice.oscillator.frequency.value),
        now
      );
      voice.oscillator.frequency.exponentialRampToValueAtTime(
        targetFreq,
        transitionEnd
      );

      voice.subOscillator.frequency.cancelScheduledValues(now);
      voice.subOscillator.frequency.setValueAtTime(
        Math.max(20, voice.subOscillator.frequency.value),
        now
      );
      voice.subOscillator.frequency.exponentialRampToValueAtTime(
        targetFreq * 0.5,
        transitionEnd
      );

      voice.gain.gain.cancelScheduledValues(now);
      voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
      voice.gain.gain.linearRampToValueAtTime(
        target.voiceGain,
        transitionEnd
      );
    });

    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setValueAtTime(this.filter.frequency.value, now);
    this.filter.frequency.linearRampToValueAtTime(
      target.filterCutoff,
      transitionEnd
    );
  }

  private playWarmBellTone(
    frequency: number,
    peakGain: number,
    durationSeconds: number,
    pan = 0
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
    const now = context.currentTime;

    // Warm celesta voice: fundamental sine + soft octave harmonic through lowpass
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
      frequency: Math.min(1800, frequency * 2.6),
      Q: 0.5,
    });

    const envelope = new GainNode(context, {
      gain: 0.0001,
    });

    const panner = new StereoPannerNode(context, {
      pan,
    });

    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.linearRampToValueAtTime(peakGain, now + 0.035);
    envelope.gain.exponentialRampToValueAtTime(
      peakGain * 0.32,
      now + durationSeconds * 0.35
    );
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    fundamental.connect(toneFilter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(toneFilter);
    toneFilter.connect(envelope);
    envelope.connect(panner);
    panner.connect(this.master);

    fundamental.start(now);
    overtone.start(now);
    fundamental.stop(now + durationSeconds + 0.05);
    overtone.stop(now + durationSeconds + 0.05);

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

  private playChime(): void {
    if (
      !this.context ||
      !this.master ||
      !this.desiredSoundOn ||
      typeof document === "undefined" ||
      document.visibilityState !== "visible"
    ) {
      return;
    }

    const mood = AUDIO_MOODS[this.mood];
    if (Math.random() > mood.chimeProbability) {
      return;
    }

    const note =
      CELESTA_SCALE[Math.floor(Math.random() * CELESTA_SCALE.length)];
    const pan = -0.4 + Math.random() * 0.8;

    this.playWarmBellTone(note, 0.015, 2.8, pan);
  }

  public playInteractionNote(stepIndex = 0): void {
    if (!this.desiredSoundOn) {
      return;
    }

    // If audio is desired ON and user just interacted, ensure context is running
    if (!this.isPlaying) {
      void this.unlockAndStart().then((started) => {
        if (started) {
          const freq =
            CELESTA_SCALE[Math.abs(stepIndex) % CELESTA_SCALE.length];
          this.playWarmBellTone(freq, 0.02, 1.6, 0);
        }
      });
      return;
    }

    const frequency =
      CELESTA_SCALE[Math.abs(stepIndex) % CELESTA_SCALE.length];
    this.playWarmBellTone(frequency, 0.02, 1.6, 0);
  }

  public playCompletionChord(): void {
    if (!this.desiredSoundOn) {
      return;
    }

    const triggerArpeggio = () => {
      [0, 2, 4, 5].forEach((noteIndex, i) => {
        window.setTimeout(() => {
          const freq = CELESTA_SCALE[noteIndex % CELESTA_SCALE.length];
          this.playWarmBellTone(freq, 0.018, 2.1, -0.25 + i * 0.16);
        }, i * 115);
      });
    };

    if (!this.isPlaying) {
      void this.unlockAndStart().then((started) => {
        if (started) {
          triggerArpeggio();
        }
      });
      return;
    }

    triggerArpeggio();
  }

  private scheduleNextChime(): void {
    if (this.chimeTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this.chimeTimer);
    }

    if (!this.desiredSoundOn || !this.isPlaying || typeof window === "undefined") {
      this.chimeTimer = null;
      return;
    }

    const delay = 8_500 + Math.random() * 11_000;

    this.chimeTimer = window.setTimeout(() => {
      this.playChime();
      this.scheduleNextChime();
    }, delay);
  }

  /**
   * Attempts to start playback immediately (or on first user gesture).
   * Returns true if AudioContext entered "running" state.
   */
  public async unlockAndStart(): Promise<boolean> {
    if (!this.isSupported || !this.desiredSoundOn) {
      return false;
    }

    try {
      if (!this.context || this.context.state === "closed") {
        this.createGraph();
      }

      if (!this.context) {
        return false;
      }

      if (this.context.state === "suspended") {
        await this.context.resume();
      }

      const isNowRunning = this.context.state === "running";
      this.playing = isNowRunning;

      if (isNowRunning) {
        this.setMood(this.mood);
        this.rampMaster(0.24, 1.5);
        this.scheduleNextChime();
      }

      this.notifyState();
      return isNowRunning;
    } catch {
      this.playing = false;
      this.notifyState();
      return false;
    }
  }

  public async unmute(): Promise<boolean> {
    this.desiredSoundOn = true;
    this.notifyState();
    return this.unlockAndStart();
  }

  public async mute(): Promise<void> {
    this.desiredSoundOn = false;
    this.playing = false;
    this.scheduleNextChime();
    this.notifyState();

    if (!this.context) {
      return;
    }

    this.rampMaster(0.0001, 0.3);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 320);
    });

    if (!this.desiredSoundOn && this.context && this.context.state === "running") {
      try {
        await this.context.suspend();
      } catch {
        // Ignore suspend errors
      }
    }
    this.notifyState();
  }

  public handleVisibility(visible: boolean): void {
    if (!this.context) {
      return;
    }

    if (!visible) {
      this.wasRunningBeforeHide =
        this.desiredSoundOn && this.context.state === "running";

      this.scheduleNextChime();

      if (this.context.state === "running") {
        void this.context.suspend().catch(() => {});
      }
      return;
    }

    if (visible && this.wasRunningBeforeHide && this.desiredSoundOn) {
      void this.context
        .resume()
        .then(() => {
          this.playing = this.context?.state === "running";
          this.scheduleNextChime();
          this.notifyState();
        })
        .catch(() => {});
    }
  }

  public async dispose(): Promise<void> {
    this.desiredSoundOn = false;
    this.playing = false;

    if (this.chimeTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
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
    this.filter = null;
    this.warmthFilter = null;
    this.compressor = null;
    this.voices = [];
    this.modulationOscillator = null;
    this.modulationGain = null;
  }
}
