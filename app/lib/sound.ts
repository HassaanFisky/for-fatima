/**
 * Apple Spatial Audio & Heart Resonance Engine (iOS 27 Bespoke Spec)
 * Zero external audio assets required. 100% private, offline, and lightweight.
 * Default state: Strictly OFF / Muted until user interacts.
 */

export class AppleSpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
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
          this.masterGain.gain.setValueAtTime(0.045, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        } catch {
          this.ctx = null;
          this.masterGain = null;
        }
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  /** Subtle Apple Taptic Engine click */
  playHaptic(freq = 560) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.02, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      // Graceful fallback
    }
  }

  /** Deep acoustic tactile heartbeat thump (46Hz Sub-bass resonance) */
  triggerHeartbeatPulse() {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(48, t);
      osc.frequency.exponentialRampToValueAtTime(14, t + 0.22);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.26);

      if (typeof window !== "undefined" && navigator.vibrate) {
        navigator.vibrate(18);
      }
    } catch {
      // Graceful fallback
    }
  }

  /** Warm resonant pluck note with lowpass biquad filter */
  playPluck(freq: number, duration = 1.8, decay = 0.85) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const noteGain = this.ctx.createGain();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, t);
      filter.frequency.exponentialRampToValueAtTime(240, t + duration * 0.7);

      osc1.type = this.mode === "acoustic" ? "triangle" : "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 2, t);

      noteGain.gain.setValueAtTime(0.0001, t);
      noteGain.gain.exponentialRampToValueAtTime(0.045, t + 0.025);
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
      // Graceful fallback
    }
  }

  /** Harmonic chime chord */
  playChimeChord() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 2.4, 1.2), i * 120);
    });
  }

  startLoop() {
    this.stopLoop();
    this.isPlaying = true;
    let step = 0;

    const acousticNotes = [220.0, 261.63, 329.63, 293.66, 196.0, 246.94, 329.63, 261.63];
    const dreamNotes = [261.63, 329.63, 392.0, 493.88, 349.23, 440.0, 523.25, 392.0];

    const tick = () => {
      if (!this.isPlaying) return;
      const notes = this.mode === "acoustic" ? acousticNotes : dreamNotes;
      const freq = notes[step % notes.length];
      this.playPluck(freq, 2.2, 0.95);
      if (step % 2 === 0) {
        this.playPluck(freq * 0.5, 2.8, 1.2);
      }
      step++;
    };

    tick();
    this.intervalId = setInterval(tick, 1050);
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

export const audioEngine = new AppleSpatialAudioEngine();
