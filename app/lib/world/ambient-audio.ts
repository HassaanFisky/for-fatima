/**
 * Original Web Audio harmonic ambient synthesis engine for The Living World.
 * Strictly OFF by default. Requires explicit user activation.
 * No copyrighted melodies, lyrics, or realistic nature imitations.
 */

import type { WorldPhase } from "./world-state";

interface AudioMood {
  frequencies: readonly [number, number, number];
  filterCutoff: number;
  voiceGain: number;
  chimeProbability: number;
}

export const AUDIO_MOODS: Record<WorldPhase, AudioMood> = {
  preDawn: {
    frequencies: [146.83, 220.0, 329.63], // D - A - E
    filterCutoff: 480,
    voiceGain: 0.012,
    chimeProbability: 0.15,
  },
  sunrise: {
    frequencies: [174.61, 261.63, 392.0], // F - C - G
    filterCutoff: 900,
    voiceGain: 0.016,
    chimeProbability: 0.4,
  },
  morning: {
    frequencies: [196.0, 293.66, 440.0], // G - D - A
    filterCutoff: 1_300,
    voiceGain: 0.014,
    chimeProbability: 0.5,
  },
  afternoon: {
    frequencies: [174.61, 261.63, 349.23], // F - C - A
    filterCutoff: 1_050,
    voiceGain: 0.013,
    chimeProbability: 0.3,
  },
  goldenHour: {
    frequencies: [164.81, 246.94, 369.99], // E - B - F#
    filterCutoff: 850,
    voiceGain: 0.015,
    chimeProbability: 0.35,
  },
  sunset: {
    frequencies: [146.83, 220.0, 329.63], // D - A - E
    filterCutoff: 700,
    voiceGain: 0.015,
    chimeProbability: 0.3,
  },
  blueHour: {
    frequencies: [130.81, 196.0, 293.66], // C - G - D
    filterCutoff: 620,
    voiceGain: 0.013,
    chimeProbability: 0.25,
  },
  night: {
    frequencies: [110.0, 164.81, 246.94], // A - E - B
    filterCutoff: 520,
    voiceGain: 0.011,
    chimeProbability: 0.2,
  },
};

const HARMONIC_SCALE = [
  523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.5,
];

interface Voice {
  oscillator: OscillatorNode;
  gain: GainNode;
  panner: StereoPannerNode;
}

export class AmbientAudioEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  private voices: Voice[] = [];
  private modulationOscillator: OscillatorNode | null = null;
  private modulationGain: GainNode | null = null;

  private mood: WorldPhase = "night";
  private enabledByUser = false;
  private wasRunningBeforeHide = false;
  private chimeTimer: number | null = null;

  public get isEnabled(): boolean {
    return this.enabledByUser;
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

    const filter = new BiquadFilterNode(context, {
      type: "lowpass",
      frequency: AUDIO_MOODS[this.mood].filterCutoff,
      Q: 0.7,
    });

    const master = new GainNode(context, {
      gain: 0,
    });

    const compressor = new DynamicsCompressorNode(context, {
      threshold: -24,
      knee: 18,
      ratio: 4,
      attack: 0.02,
      release: 0.5,
    });

    filter.connect(master);
    master.connect(compressor);
    compressor.connect(context.destination);

    const panPositions = [-0.45, 0, 0.45];

    this.voices = AUDIO_MOODS[this.mood].frequencies.map(
      (frequency, index) => {
        const oscillator = new OscillatorNode(context, {
          type: index === 2 ? "triangle" : "sine",
          frequency,
        });

        const gain = new GainNode(context, {
          gain: AUDIO_MOODS[this.mood].voiceGain,
        });

        const panner = new StereoPannerNode(context, {
          pan: panPositions[index],
        });

        oscillator.connect(gain);
        gain.connect(panner);
        panner.connect(filter);
        oscillator.start();

        return { oscillator, gain, panner };
      }
    );

    const modulationOscillator = new OscillatorNode(context, {
      type: "sine",
      frequency: 0.045,
    });

    const modulationGain = new GainNode(context, {
      gain: 75,
    });

    modulationOscillator.connect(modulationGain);
    modulationGain.connect(filter.frequency);
    modulationOscillator.start();

    this.context = context;
    this.filter = filter;
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
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(value, now + durationSeconds);
  }

  public setMood(mood: WorldPhase): void {
    this.mood = mood;

    if (!this.context || !this.filter) {
      return;
    }

    const target = AUDIO_MOODS[mood];
    const now = this.context.currentTime;
    const transitionEnd = now + 8;

    this.voices.forEach((voice, index) => {
      voice.oscillator.frequency.cancelScheduledValues(now);
      voice.oscillator.frequency.setValueAtTime(
        Math.max(1, voice.oscillator.frequency.value),
        now
      );
      voice.oscillator.frequency.exponentialRampToValueAtTime(
        target.frequencies[index],
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

  private playChime(): void {
    if (
      !this.context ||
      !this.master ||
      !this.enabledByUser ||
      typeof document === "undefined" ||
      document.visibilityState !== "visible"
    ) {
      return;
    }

    const mood = AUDIO_MOODS[this.mood];
    if (Math.random() > mood.chimeProbability) {
      return;
    }

    const base =
      mood.frequencies[Math.floor(Math.random() * mood.frequencies.length)];

    const context = this.context;
    const now = context.currentTime;
    const frequency = base * (Math.random() > 0.5 ? 2 : 4);

    const oscillator = new OscillatorNode(context, {
      type: "sine",
      frequency,
    });

    const gain = new GainNode(context, {
      gain: 0.0001,
    });

    const panner = new StereoPannerNode(context, {
      pan: -0.55 + Math.random() * 1.1,
    });

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.012, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    oscillator.connect(gain);
    gain.connect(panner);
    panner.connect(this.master);

    oscillator.start(now);
    oscillator.stop(now + 3.3);

    oscillator.addEventListener(
      "ended",
      () => {
        oscillator.disconnect();
        gain.disconnect();
        panner.disconnect();
      },
      { once: true }
    );
  }

  public playInteractionNote(stepIndex = 0): void {
    if (
      !this.context ||
      !this.master ||
      !this.enabledByUser ||
      this.context.state !== "running"
    ) {
      return;
    }

    const context = this.context;
    const now = context.currentTime;
    const frequency =
      HARMONIC_SCALE[Math.abs(stepIndex) % HARMONIC_SCALE.length];

    const oscillator = new OscillatorNode(context, {
      type: "sine",
      frequency,
    });

    const gain = new GainNode(context, {
      gain: 0.0001,
    });

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.018, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    oscillator.connect(gain);
    gain.connect(this.master);

    oscillator.start(now);
    oscillator.stop(now + 1.45);

    oscillator.addEventListener(
      "ended",
      () => {
        oscillator.disconnect();
        gain.disconnect();
      },
      { once: true }
    );
  }

  public playCompletionChord(): void {
    if (
      !this.context ||
      !this.master ||
      !this.enabledByUser ||
      this.context.state !== "running"
    ) {
      return;
    }

    [0, 2, 4, 5].forEach((noteIndex, i) => {
      window.setTimeout(() => {
        this.playInteractionNote(noteIndex);
      }, i * 110);
    });
  }

  private scheduleNextChime(): void {
    if (this.chimeTimer !== null && typeof window !== "undefined") {
      window.clearTimeout(this.chimeTimer);
    }

    if (!this.enabledByUser || typeof window === "undefined") {
      this.chimeTimer = null;
      return;
    }

    const delay = 12_000 + Math.random() * 16_000;

    this.chimeTimer = window.setTimeout(() => {
      this.playChime();
      this.scheduleNextChime();
    }, delay);
  }

  public async start(): Promise<boolean> {
    if (!this.isSupported) {
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

      this.enabledByUser = true;
      this.setMood(this.mood);
      this.rampMaster(0.22, 1.8);
      this.scheduleNextChime();
      return true;
    } catch {
      this.enabledByUser = false;
      return false;
    }
  }

  public async mute(): Promise<void> {
    if (!this.context) {
      this.enabledByUser = false;
      return;
    }

    this.enabledByUser = false;
    this.scheduleNextChime();
    this.rampMaster(0, 0.35);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 400);
    });

    if (!this.enabledByUser && this.context.state === "running") {
      try {
        await this.context.suspend();
      } catch {
        // Ignore suspend errors
      }
    }
  }

  public handleVisibility(visible: boolean): void {
    if (!this.context) {
      return;
    }

    if (!visible) {
      this.wasRunningBeforeHide =
        this.enabledByUser && this.context.state === "running";

      this.scheduleNextChime();

      if (this.context.state === "running") {
        void this.context.suspend().catch(() => {});
      }
      return;
    }

    if (visible && this.wasRunningBeforeHide && this.enabledByUser) {
      void this.context
        .resume()
        .then(() => this.scheduleNextChime())
        .catch(() => {});
    }
  }

  public async dispose(): Promise<void> {
    this.enabledByUser = false;

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
    this.compressor = null;
    this.voices = [];
    this.modulationOscillator = null;
    this.modulationGain = null;
  }
}
