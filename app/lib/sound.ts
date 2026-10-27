/**
 * Tiny Web Audio chime synth. No audio files needed. OFF by default and
 * never plays until the visitor flips the sound toggle.
 */
type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let enabled = false;
const listeners = new Set<Listener>();

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isSoundOn() {
  return enabled;
}

export function setSound(on: boolean) {
  enabled = on;
  listeners.forEach((l) => l(on));
  if (on) chord();
}

export function subscribeSound(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function chime(freq = 523.25, duration = 1.4, volume = 0.06) {
  if (!enabled) return;
  const c = getCtx();
  if (!c) return;
  try {
    const t = c.currentTime;
    const osc = c.createOscillator();
    const overtone = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    overtone.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    overtone.frequency.setValueAtTime(freq * 2, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    overtone.start(t);
    osc.stop(t + duration);
    overtone.stop(t + duration);
  } catch {
    /* ignore audio failures on restricted devices */
  }
}

const SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
export function note(i: number) {
  chime(SCALE[((i % SCALE.length) + SCALE.length) % SCALE.length]);
}

export function chord() {
  [392, 523.25, 659.25, 783.99].forEach((f, i) => window.setTimeout(() => chime(f, 2, 0.05), i * 120));
}
