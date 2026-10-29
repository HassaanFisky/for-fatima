"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Flame,
  Gift,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  Star,
  Activity,
} from "lucide-react";

// ─── HIGH-FIDELITY WEB AUDIO SYNTHESIZER ───
// Custom acoustic piano & dreamy tape-synth physics with harmonic overtones and lowpass resonance
class PremiumAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  public isPlaying: boolean = false;
  public mode: "shikwa" | "postyou" = "shikwa";

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playPluck(freq: number, duration = 1.6, decaySpeed = 0.8) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // Dual Oscillator: Fundamental warm sine + harmonic overtone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(320, t + duration * 0.7);

      osc1.type = this.mode === "shikwa" ? "triangle" : "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq * 2, t);

      noteGain.gain.setValueAtTime(0.0001, t);
      noteGain.gain.exponentialRampToValueAtTime(0.06, t + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, t + duration * decaySpeed);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + duration);
      osc2.stop(t + duration);
    } catch {
      // Graceful fallback for non-audio environments
    }
  }

  playHapticChime(freq = 640) {
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.035, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch {
      // Ignore
    }
  }

  startLoop() {
    this.stopLoop();
    this.isPlaying = true;
    let step = 0;

    // Shikwa (TY acoustic minor chords in A-minor/C-major vibe)
    const shikwaNotes = [220.0, 261.63, 329.63, 293.66, 196.0, 246.94, 329.63, 261.63];
    // Post You (Sunset dream-pop chords in G/E-minor vibe)
    const postYouNotes = [261.63, 329.63, 392.0, 493.88, 349.23, 440.0, 523.25, 392.0];

    const triggerStep = () => {
      if (!this.isPlaying) return;
      const notes = this.mode === "shikwa" ? shikwaNotes : postYouNotes;
      const freq = notes[step % notes.length];
      this.playPluck(freq, 2.1, 0.95);
      if (step % 2 === 0) {
        this.playPluck(freq * 0.5, 2.6, 1.1); // Sub octave bass note
      }
      step++;
    };

    triggerStep();
    this.intervalId = setInterval(triggerStep, 950);
  }

  stopLoop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  switchMode(newMode: "shikwa" | "postyou") {
    this.mode = newMode;
    if (this.isPlaying) {
      this.startLoop();
    }
  }
}

const soundEngine = new PremiumAudioEngine();

// ─── CURATED LYRIC & HOOK DECK ───
const SWIPE_CARDS = [
  {
    tag: "SHIKWA • VERSE",
    line: "Muskura de agar wo, ye duniya ruk si gayi hai...",
    sub: "Gham chhupaye inn aankhon mein, wo toh hasti rahi hai.",
    meta: "Talha Yunus Acoustic Vibe 💜",
    bgAccent: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    tag: "UNSPOKEN TRUTH",
    line: "Jahan khushbuein gulaab ki, wahan yaad tu hi aaye...",
    sub: "Kya hi shikwa karein phir — teri galti nahi hai.",
    meta: "Pure Ishq & Respect ✨",
    bgAccent: "from-pink-500/10 via-rose-500/5 to-transparent",
  },
  {
    tag: "POST YOU • HARMONY",
    line: "Phir se jeena chahta hun...",
    sub: "Wohi line jo tum gaa rahi thi aur maine usi pal likh di thi. Unbreakable bond.",
    meta: "Sunset Telepathy 🎵",
    bgAccent: "from-amber-500/10 via-purple-500/5 to-transparent",
  },
  {
    tag: "THE SECRET HOOK",
    line: "Bracelet toh pyara tha... par woh ek kami abhi bhi baqi hai 😉",
    sub: "Aur woh kami WhatsApp ya phone pe nahi, sirf samne aane par dikhegi.",
    meta: "15 Oct Birthday Chapter 🎁",
    bgAccent: "from-violet-500/10 via-pink-500/5 to-transparent",
  },
  {
    tag: "MIDNIGHT OBSERVATION",
    line: "Chaand ban ke chhup gayi hai peeche badalon ke...",
    sub: "Khud se saadgi ka waada, sarr pe haath bhi Khuda ka.",
    meta: "Late Night Karachi Calm 🌙",
    bgAccent: "from-indigo-500/10 via-purple-500/5 to-transparent",
  },
  {
    tag: "SUKOON PRIORITY",
    line: "Jab dimaag bhari ho ya thakan ho — Ice cream kha lena 🍦",
    sub: "Kyunke tumhara sukoon aur muskurahat har behas se hazaar guna zaroori hai.",
    meta: "Zero Pressure • Pure Care 🤍",
    bgAccent: "from-cyan-500/10 via-purple-500/5 to-transparent",
  },
];

// ─── MEDICAL PULSE & OBSERVANT DETAILS ───
const PULSE_TILES = [
  {
    id: 1,
    emoji: "🍨",
    title: "Ice Cream = Sukoon",
    subtitle: "Tumhara verified totka",
    deep: "Jab bhi sar dard ho, hectic din ho ya mood down ho: 'Ice cream khyn, skn milega.' Tumhara sukoon hamesha top priority hai.",
  },
  {
    id: 2,
    emoji: "📿",
    title: "Gajre & 3 Piercings",
    subtitle: "Chhoti observant details",
    deep: "Center wali Ramzan piercing ho ya hath mein pehne gajre—chhoti se chhoti khoobsurat detail bina kahe yaad rehti hai.",
  },
  {
    id: 3,
    emoji: "🎂",
    title: "15 Oct • Libra Queen",
    subtitle: "Pending Belated Chapter",
    deep: "Yousuf Plaza ke 1400 flats mein courier nahi bheja—kyunke woh surprise sirf mere hath se tumhare hath mein aane ke liye bana hai.",
  },
  {
    id: 4,
    emoji: "📱",
    title: "Side Pe Rakh Ke Sona",
    subtitle: "Woh 5:14 AM ka sach",
    deep: "'Phone pass rakh ke soti thi aur feel karti aap call pe hain.' Kuch ehsaas lafzon se kahin zyada gehre hote hain.",
  },
];

// ─── NIGHT SKY CONSTELLATION POINTS ───
const SKY_STARS = [
  { id: 1, x: 20, y: 24, word: "Muskurahat", note: 523.25 },
  { id: 2, x: 50, y: 16, word: "Sabr", note: 587.33 },
  { id: 3, x: 80, y: 24, word: "Sukoon", note: 659.25 },
  { id: 4, x: 26, y: 56, word: "Aankhein", note: 698.46 },
  { id: 5, x: 74, y: 58, word: "Khwab", note: 783.99 },
  { id: 6, x: 50, y: 78, word: "Ishq", note: 880.0 },
];

function getKarachiTimeGreeting() {
  if (typeof window === "undefined") return "Karachi Quiet Hours • Calm & peaceful 💜";
  const hrs = new Date().getHours();
  if (hrs >= 1 && hrs < 6) {
    return "3 AM Karachi Quiet Hours • Abhi tak jaag rahi ho? 🌙";
  } else if (hrs >= 6 && hrs < 12) {
    return "Morning Glow • Fresh start, zero stress ☀️";
  } else if (hrs >= 12 && hrs < 19) {
    return "Afternoon Vibe • Routine ke beech thora sa sukoon 🌸";
  } else {
    return "Night Mode • Sabr aur sukoon ka waqt 💜";
  }
}

export default function PremiumFatimaUniverse() {
  const [activeTab, setActiveTab] = useState<"vibe" | "pulse" | "kami" | "sky">("vibe");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<"shikwa" | "postyou">("shikwa");

  // Tab 1: Cards
  const [cardIndex, setCardIndex] = useState(0);

  // Tab 2: Pulse & BPM
  const [activeTile, setActiveTile] = useState<number>(1);
  const [bpm, setBpm] = useState(78);
  const [isHeartBeating, setIsHeartBeating] = useState(false);

  // Tab 3: Kami Vault
  const [tapsRemaining, setTapsRemaining] = useState(5);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Tab 4: Sky
  const [litStars, setLitStars] = useState<number[]>([1, 2]);
  const [timeGreeting, setTimeGreeting] = useState(getKarachiTimeGreeting);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeGreeting(getKarachiTimeGreeting());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Audio Toggles
  const toggleMusic = useCallback(() => {
    soundEngine.playHapticChime(580);
    if (isPlaying) {
      soundEngine.stopLoop();
      setIsPlaying(false);
    } else {
      soundEngine.startLoop();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const switchTrack = useCallback(
    (mode: "shikwa" | "postyou") => {
      soundEngine.playHapticChime(720);
      setAudioMode(mode);
      soundEngine.switchMode(mode);
      if (!isPlaying) {
        soundEngine.startLoop();
        setIsPlaying(true);
      }
    },
    [isPlaying]
  );

  const nextCard = useCallback(() => {
    soundEngine.playHapticChime(560);
    setCardIndex((prev) => (prev + 1) % SWIPE_CARDS.length);
  }, []);

  const prevCard = useCallback(() => {
    soundEngine.playHapticChime(480);
    setCardIndex((prev) => (prev - 1 + SWIPE_CARDS.length) % SWIPE_CARDS.length);
  }, []);

  const handleHeartTap = useCallback(() => {
    soundEngine.playPluck(bpm > 95 ? 659.25 : 523.25, 0.45, 0.6);
    setIsHeartBeating(true);
    setBpm((b) => (b < 118 ? b + 6 : 76));
    setTimeout(() => setIsHeartBeating(false), 300);
  }, [bpm]);

  const handleUnlockTap = useCallback(() => {
    if (tapsRemaining > 1) {
      soundEngine.playHapticChime(420 + (5 - tapsRemaining) * 80);
      setTapsRemaining((t) => t - 1);
    } else {
      soundEngine.playPluck(880, 1.8, 1.2);
      setTapsRemaining(0);
      setIsUnlocked(true);
    }
  }, [tapsRemaining]);

  const handleStarTap = useCallback(
    (star: (typeof SKY_STARS)[0]) => {
      soundEngine.playPluck(star.note, 1.2, 0.9);
      if (!litStars.includes(star.id)) {
        setLitStars((prev) => [...prev, star.id]);
      }
    },
    [litStars]
  );

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#1E162B] font-sans select-none overflow-x-hidden pb-28 relative">
      {/* ─── Apple Luminous Pastel Backdrops ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="ambient-orb absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-[#E9D5FF]/50 blur-[90px]" />
        <div className="ambient-orb absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-[#FBCFE8]/40 blur-[85px]" />
        <div className="ambient-orb absolute -bottom-20 left-1/4 w-[450px] h-[450px] rounded-full bg-[#DDD6FE]/40 blur-[100px]" />
      </div>

      {/* ─── iPHONE 14 PRO DYNAMIC ISLAND AUDIO PILL ─── */}
      <header className="sticky top-3.5 z-50 px-4 flex justify-center">
        <div className="ios-glass-dark rounded-full px-3 py-2 text-white shadow-2xl flex items-center justify-between gap-3 max-w-md w-full transition-all">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Mute music" : "Play music"}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40"
                  : "bg-white/10 text-purple-200 hover:bg-white/20"
              }`}
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-purple-300" />
              )}
            </button>
            <div className="leading-tight text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <p className="text-[11px] font-semibold tracking-wide">
                  {audioMode === "shikwa" ? "Shikwa (Talha Yunus Pluck)" : "Post You (Dream Synth)"}
                </p>
              </div>
              <p className="text-[10px] text-purple-300/70">
                {isPlaying ? "Playing lossless soft synthesizer" : "Tap icon to start soothing audio"}
              </p>
            </div>
          </div>

          {/* iOS Dual Track Selector */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-0.5 text-[10px] font-medium">
            <button
              type="button"
              onClick={() => switchTrack("shikwa")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                audioMode === "shikwa"
                  ? "bg-white text-[#181224] font-bold shadow-sm"
                  : "text-purple-200 hover:text-white"
              }`}
            >
              Shikwa
            </button>
            <button
              type="button"
              onClick={() => switchTrack("postyou")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                audioMode === "postyou"
                  ? "bg-white text-[#181224] font-bold shadow-sm"
                  : "text-purple-200 hover:text-white"
              }`}
            >
              Post You
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="relative z-10 max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* Real-time Karachi Status Indicator */}
        <div className="ios-glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-purple-700">{timeGreeting}</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
            For Fatima 💜
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* ══════════════ TAB 1: SHIKWA DECK ══════════════ */}
          {activeTab === "vibe" && (
            <motion.section
              key="vibe"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  Card {cardIndex + 1} of {SWIPE_CARDS.length}
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-[#1E162B]">
                  Kuch Alfaaz Jo Dil Ko Chhute Hain
                </h1>
                <p className="text-xs text-[#6D5A82]">
                  Swipe karo ya next tap karo agle lafz parhne ke liye
                </p>
              </div>

              {/* Ultra-Tactile iOS Card */}
              <motion.div
                key={cardIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) nextCard();
                  else if (info.offset.x > 40) prevCard();
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`ios-glass sheen rounded-[32px] p-7 shadow-xl min-h-[300px] flex flex-col justify-between relative bg-gradient-to-br ${SWIPE_CARDS[cardIndex].bgAccent}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100/90 text-purple-800 border border-purple-200/50">
                    {SWIPE_CARDS[cardIndex].tag}
                  </span>
                  <span className="text-xs font-semibold text-purple-700">
                    {SWIPE_CARDS[cardIndex].meta}
                  </span>
                </div>

                <div className="my-6 space-y-3">
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#1F152E] leading-snug">
                    &ldquo;{SWIPE_CARDS[cardIndex].line}&rdquo;
                  </p>
                  <p className="text-sm text-[#5D4A73] leading-relaxed font-medium">
                    {SWIPE_CARDS[cardIndex].sub}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-purple-200/60 text-xs font-semibold text-purple-700">
                  <button
                    type="button"
                    onClick={prevCard}
                    className="flex items-center gap-1 hover:text-purple-900 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextCard}
                    className="flex items-center gap-1 hover:text-purple-900 transition-colors"
                  >
                    Next Card <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Quick Emotional Anchors */}
              <div className="grid grid-cols-2 gap-3">
                <div className="ios-glass p-4 rounded-2xl shadow-sm text-left space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                    Shikwa Hook
                  </p>
                  <p className="text-xs text-[#2A1D3B] font-serif italic">
                    &ldquo;Tere bin mera guzaara nahi...&rdquo;
                  </p>
                </div>
                <div className="ios-glass p-4 rounded-2xl shadow-sm text-left space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-pink-700">
                    Unspoken Bond
                  </p>
                  <p className="text-xs text-[#2A1D3B] font-serif italic">
                    &ldquo;Dilon mein, dimaag mein hun...&rdquo;
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ══════════════ TAB 2: MEDICAL PULSE ══════════════ */}
          {activeTab === "pulse" && (
            <motion.section
              key="pulse"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Interactive BPM Sensor */}
              <div className="ios-glass rounded-[28px] p-5 shadow-lg flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                    Interactive Vitals Check
                  </span>
                  <h2 className="text-xl font-bold text-[#1E162B] flex items-center gap-2">
                    <span>{bpm} BPM</span>
                    <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
                  </h2>
                  <p className="text-xs text-[#6D5A82]">
                    {bpm > 95
                      ? "Jab tum samne aati ho toh aise hi barhti hai 😉"
                      : "Heart button pe tap karke pulse check karo"}
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.88 }}
                  onClick={handleHeartTap}
                  aria-label="Tap heart sensor"
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-pink-500/30 transition-transform ${
                    isHeartBeating ? "scale-110" : "scale-100"
                  }`}
                >
                  <Heart className="w-8 h-8 fill-current" />
                </motion.button>
              </div>

              {/* 4 Detail Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {PULSE_TILES.map((tile) => {
                  const isSelected = activeTile === tile.id;
                  return (
                    <button
                      type="button"
                      key={tile.id}
                      onClick={() => {
                        soundEngine.playHapticChime(540);
                        setActiveTile(tile.id);
                      }}
                      className={`p-4 rounded-3xl text-left border transition-all ${
                        isSelected
                          ? "bg-[#231733] text-white border-[#231733] shadow-lg scale-[1.02]"
                          : "ios-glass text-[#231733] hover:border-purple-300"
                      }`}
                    >
                      <span className="text-2xl">{tile.emoji}</span>
                      <p className="text-sm font-bold mt-2 leading-snug">{tile.title}</p>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? "text-purple-200" : "text-[#7A6891]"
                        }`}
                      >
                        {tile.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Detail Note */}
              {PULSE_TILES.map(
                (tile) =>
                  tile.id === activeTile && (
                    <motion.div
                      key={tile.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ios-glass rounded-3xl p-5 shadow-md border-purple-200 text-left space-y-1.5"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                        {tile.title}
                      </p>
                      <p className="text-sm text-[#2E2040] leading-relaxed font-medium">
                        {tile.deep}
                      </p>
                    </motion.div>
                  )
              )}
            </motion.section>
          )}

          {/* ══════════════ TAB 3: WOH KAMI VAULT ══════════════ */}
          {activeTab === "kami" && (
            <motion.section
              key="kami"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="ios-glass rounded-[32px] p-7 text-center space-y-5 shadow-xl">
                <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
                  {isUnlocked ? (
                    <Unlock className="w-8 h-8 text-pink-600" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    The Secret Hook • &ldquo;Knsi Kami??&rdquo;
                  </span>
                  <h2 className="text-2xl font-bold text-[#1E162B]">
                    {isUnlocked ? "Raaz Phir Bhi Mehfooz Hai 😉" : `Tap ${tapsRemaining} Times To Reveal`}
                  </h2>
                </div>

                {!isUnlocked ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={handleUnlockTap}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm shadow-xl shadow-purple-500/30"
                  >
                    Tap to Unlock ({tapsRemaining} left) ✨
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#FAF5FF] border border-purple-200/90 rounded-2xl p-5 text-left space-y-3 shadow-inner"
                  >
                    <p className="text-sm font-bold text-[#2B1B3D]">
                      &ldquo;Ufffff / Achwww&rdquo; bolne se baat nahi banegi! 😂
                    </p>
                    <p className="text-xs text-[#544169] leading-relaxed">
                      Bracelet wali picture mein jo ek cheez missing thi, aur jo 15 October ka pending surprise hai—woh chat ya website par leak nahi ho sakta.
                    </p>
                    <p className="text-xs font-bold text-purple-700">
                      Shart abhi bhi wohi hai: Samne aane par khud ba khud dikh jayegi. 💜
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUnlocked(false);
                        setTapsRemaining(5);
                        soundEngine.playHapticChime(460);
                      }}
                      className="text-xs text-purple-600 underline font-semibold pt-1"
                    >
                      Lock again
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* ══════════════ TAB 4: NIGHT SKY ══════════════ */}
          {activeTab === "sky" && (
            <motion.section
              key="sky"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-b from-[#211438] via-[#2F1A4E] to-[#160B29] text-white rounded-[32px] p-6 shadow-2xl border border-purple-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">
                      Interactive Midnight Sky
                    </p>
                    <h2 className="text-lg font-bold">Chaand Ban Ke Chhup Gayi Hai...</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playPluck(880, 1.8);
                      setLitStars([1, 2, 3, 4, 5, 6]);
                    }}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-white/15 text-purple-100 font-semibold hover:bg-white/25 transition-colors"
                  >
                    Light All ✨
                  </button>
                </div>

                <div className="relative h-64 w-full border border-white/10 rounded-2xl bg-black/30 backdrop-blur-sm">
                  {SKY_STARS.map((star) => {
                    const isLit = litStars.includes(star.id);
                    return (
                      <button
                        type="button"
                        key={star.id}
                        onClick={() => handleStarTap(star)}
                        style={{ left: `${star.x}%`, top: `${star.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none"
                      >
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isLit
                              ? "bg-gradient-to-tr from-pink-400 to-purple-300 text-[#1E1230] scale-110 shadow-lg shadow-pink-400/50"
                              : "bg-white/15 text-white/60 hover:bg-white/25"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isLit ? "fill-current" : ""}`} />
                        </span>
                        <span className="text-[10px] mt-1 text-purple-200 font-semibold tracking-wide">
                          {star.word}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-purple-200/90 text-center mt-4 italic font-serif">
                  &ldquo;Sabr ka phal meetha hota hai — no rush, no pressure. — Hassaan 💜&rdquo;
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ─── iPHONE 14 PRO BOTTOM GLASS APP DOCK ─── */}
      <nav className="fixed bottom-4 inset-x-0 z-50 px-4 flex justify-center">
        <div className="ios-glass rounded-full p-1.5 shadow-2xl flex items-center justify-between max-w-sm w-full border border-white/90">
          {[
            { id: "vibe", label: "Shikwa Deck", icon: Flame },
            { id: "pulse", label: "Pulse", icon: Heart },
            { id: "kami", label: "Woh Kami", icon: Gift },
            { id: "sky", label: "Night Sky", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => {
                  soundEngine.playHapticChime(active ? 620 : 540);
                  setActiveTab(tab.id as "vibe" | "pulse" | "kami" | "sky");
                }}
                className={`flex-1 py-2 px-1 rounded-full flex flex-col items-center gap-0.5 transition-all duration-200 ${
                  active
                    ? "bg-[#1F152E] text-white shadow-md scale-[1.03]"
                    : "text-[#6D5A82] hover:text-[#1F152E]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-pink-300" : ""}`} />
                <span className="text-[10px] font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
