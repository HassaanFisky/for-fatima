/**
 * High-Fidelity Apple-Caliber Web Audio Engine
 * Zero external MP3 assets required. 100% private and offline-capable.
 * Default state: OFF.
 */

export class GentleAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  public isPlaying: boolean = false;
  public mode: "acoustic" | "dream" = "acoustic";

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.065, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        } catch {
          // Graceful fallback if Web Audio is unsupported/blocked
          this.ctx = null;
          this.masterGain = null;
        }
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  /** Subtle haptic tick sound for buttons and tab switches */
  playHaptic(freq = 580) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.025, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
      // Ignore unsupported browser errors gracefully
    }
  }

  /** Warm resonant pluck note with custom lowpass biquad filter */
  playPluck(freq: number, duration = 1.6, decay = 0.85) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(280, t + duration * 0.7);

      osc1.type = this.mode === "acoustic" ? "triangle" : "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 2, t);

      noteGain.gain.setValueAtTime(0.0001, t);
      noteGain.gain.exponentialRampToValueAtTime(0.05, t + 0.025);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + duration * decay);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + duration);
      osc2.stop(t + duration);
    } catch {
      // Ignore unsupported browser errors gracefully
    }
  }

  /** Harmonic chime for milestone interactions */
  playChimeChord() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 2.2, 1.1), i * 110);
    });
  }

  startLoop() {
    this.stopLoop();
    this.isPlaying = true;
    let step = 0;

    // Mode 1: Introspective minor progression (A minor / C major warmth)
    const acousticNotes = [220.0, 261.63, 329.63, 293.66, 196.0, 246.94, 329.63, 261.63];
    // Mode 2: Dreamy sunset progression (E minor / G major chill lo-fi)
    const dreamNotes = [261.63, 329.63, 392.0, 493.88, 349.23, 440.0, 523.25, 392.0];

    const tick = () => {
      if (!this.isPlaying) return;
      const notes = this.mode === "acoustic" ? acousticNotes : dreamNotes;
      const freq = notes[step % notes.length];
      this.playPluck(freq, 2.0, 0.9);
      if (step % 2 === 0) {
        this.playPluck(freq * 0.5, 2.5, 1.1); // Sub octave bass note
      }
      step++;
    };

    tick();
    this.intervalId = setInterval(tick, 980);
  }

  stopLoop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  switchMode(newMode: "acoustic" | "dream") {
    this.mode = newMode;
    if (this.isPlaying) {
      this.startLoop();
    }
  }

  dispose() {
    this.stopLoop();
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => {});
      this.ctx = null;
      this.masterGain = null;
    }
  }
}

export const audioEngine = new GentleAudioEngine();
