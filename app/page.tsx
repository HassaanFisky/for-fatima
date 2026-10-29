"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  VolumeX,
  Flame,
  Gift,
  Lock,
  Unlock,
  ChevronRight,
  Star,
  Disc3,
} from "lucide-react";

// ─── DUAL INSTRUMENTAL SYNTH ENGINE (SHIKWA & POST YOU TONES) ───
class DualToneAudioEngine {
  private ctx: AudioContext | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  public isPlaying: boolean = false;
  public mode: "shikwa" | "postyou" = "shikwa";

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playNote(freq: number, duration = 1.6, type: OscillatorType = "sine", vol = 0.05) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(vol, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio restriction errors
    }
  }

  startLoop() {
    this.stopLoop();
    this.isPlaying = true;
    let step = 0;

    // Shikwa: Melancholic minor acoustic-like pluck progression
    const shikwaNotes = [220.0, 261.63, 329.63, 293.66, 196.0, 246.94, 329.63, 261.63];
    // Post You: Warm major/dreamy positive progression
    const postYouNotes = [261.63, 329.63, 392.0, 493.88, 349.23, 440.0, 523.25, 392.0];

    const triggerStep = () => {
      if (!this.isPlaying) return;
      const notes = this.mode === "shikwa" ? shikwaNotes : postYouNotes;
      const freq = notes[step % notes.length];
      this.playNote(freq, 1.9, this.mode === "shikwa" ? "triangle" : "sine", 0.045);
      if (step % 2 === 0) {
        this.playNote(freq * 0.5, 2.4, "sine", 0.03);
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

const audioEngine = new DualToneAudioEngine();

// ─── SWIPE DECK CARDS (SHIKWA + POST YOU + INSIDE HOOKS) ───
const SWIPE_CARDS = [
  {
    tag: "SHIKWA • VERSE",
    line: "Muskura de agar wo, ye duniya ruk si gayi hai...",
    sub: "Gham chhupaye inn aankhon mein, wo toh hasti rahi hai.",
    badge: "TY Vibe 💜",
  },
  {
    tag: "UNSAID TRUTH",
    line: "Jahan khushbuein gulaab ki, wahan yaad tu hi aaye...",
    sub: "Kya hi shikwa karein phir — teri galti nahi hai.",
    badge: "Pure Ishq ✨",
  },
  {
    tag: "POST YOU • MELODY",
    line: "Phir se jeena chahta hun...",
    sub: "Wohi line jo tum gaa rahi thi aur maine usi waqt likh di thi. Bond hai.",
    badge: "Telepathy 🎵",
  },
  {
    tag: "THE SECRET HOOK",
    line: "Bracelet toh pyara tha... par woh ek kami abhi bhi baqi hai 😉",
    sub: "Aur woh kami chat pe nahi, sirf samne aane par dikhegi.",
    badge: "15 Oct Surprise 🎁",
  },
  {
    tag: "DEEP VERSE",
    line: "Chaand ban ke chhup gayi hai peeche badalon ke...",
    sub: "Khud se saadgi ka waada, sarr pe haath bhi Khuda ka.",
    badge: "Midnight 🌙",
  },
  {
    tag: "SUKOON REMINDER",
    line: "Jab dimaag bhari ho ya thakan ho — Ice cream kha lena 🍦",
    sub: "Kyunke tumhara sukoon har behas se zyada zaroori hai.",
    badge: "Zero Pressure 🤍",
  },
];

// ─── HEARTBEAT PULSE MOMENTS (PAGE 2) ───
const PULSE_TILES = [
  {
    id: 1,
    emoji: "🍨",
    title: "Ice Cream = Sukoon",
    short: "Tumhara favourite totka",
    reveal: "Jab bhi sar dard ho ya mood off ho: 'Ice cream khyn, skn milega.'",
  },
  {
    id: 2,
    emoji: "📿",
    title: "Gajre & 3 Piercings",
    short: "Chhoti details jo yaad hain",
    reveal: "Center wali Ramzan piercing ho ya hath mein gajre—kuch cheezein bina bole notice hoti hain.",
  },
  {
    id: 3,
    emoji: "🎂",
    title: "15 October • Libra Queen",
    short: "Belated Birthday Chapter",
    reveal: "Yousuf Plaza ke 1400 flats mein courier nahi bheja—kyunke woh surprise sirf mere hath se tumhare liye hai.",
  },
  {
    id: 4,
    emoji: "📱",
    title: "Phone Side Pe Rakh Ke Sona",
    short: "Woh 5:14 AM ka sach",
    reveal: "'Phone pass rakh ke soti aur feel karti aap call pe hain' — ishq chhupane se bhi nahi chhupta.",
  },
];

const skyPoints = [
  { id: 1, x: 22, y: 26, word: "Muskurahat" },
  { id: 2, x: 50, y: 18, word: "Sabr" },
  { id: 3, x: 78, y: 28, word: "Sukoon" },
  { id: 4, x: 30, y: 58, word: "Aankhein" },
  { id: 5, x: 70, y: 60, word: "Khwab" },
  { id: 6, x: 50, y: 80, word: "Ishq" },
];

function getGreeting() {
  if (typeof window === "undefined") return "Karachi Quiet Hours • Calm & peaceful 💜";
  const hrs = new Date().getHours();
  if (hrs >= 1 && hrs < 6) {
    return "3 AM Karachi Quiet Hours • Abhi tak jaag rahi ho? 🌙";
  } else if (hrs >= 6 && hrs < 12) {
    return "Morning Glow • Fresh start, zero stress ☀️";
  } else if (hrs >= 12 && hrs < 19) {
    return "Afternoon Vibe • Gym ya routine ke beech thora sa sukoon 🌸";
  } else {
    return "Night Mode • Sabr aur sukoon ka waqt 💜";
  }
}

export default function FatimaIOSUniverse() {
  const [activePage, setActivePage] = useState<"vibe" | "pulse" | "kami" | "sky">("vibe");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<"shikwa" | "postyou">("shikwa");

  // Page 1: Swipe Deck state
  const [cardIndex, setCardIndex] = useState(0);

  // Page 2: Pulse Tile state
  const [activeTile, setActiveTile] = useState<number>(1);
  const [bpm, setBpm] = useState(76);

  // Page 3: Kami Scratch/Tap Lock state
  const [tapsRemaining, setTapsRemaining] = useState(5);

  // Page 4: Starry Sky Touch state
  const [litStars, setLitStars] = useState<number[]>([1, 3]);
  const [timeGreeting, setTimeGreeting] = useState(getGreeting);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioEngine.stopLoop();
      setIsPlaying(false);
    } else {
      audioEngine.startLoop();
      setIsPlaying(true);
    }
  };

  const switchTrack = (mode: "shikwa" | "postyou") => {
    setAudioMode(mode);
    audioEngine.switchMode(mode);
    if (!isPlaying) {
      audioEngine.startLoop();
      setIsPlaying(true);
    }
  };

  const nextCard = () => {
    audioEngine.playNote(587.33, 0.4, "sine", 0.04);
    setCardIndex((prev) => (prev + 1) % SWIPE_CARDS.length);
  };

  const handleHeartTap = () => {
    audioEngine.playNote(659.25, 0.5, "sine", 0.05);
    setBpm((b) => (b < 118 ? b + 6 : 78));
  };

  const handleUnlockTap = () => {
    if (tapsRemaining > 0) {
      audioEngine.playNote(440 + (5 - tapsRemaining) * 70, 0.6, "triangle", 0.05);
      setTapsRemaining((t) => t - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8FF] via-[#FDF4F8] to-[#F3E8FF] text-[#1E162B] font-sans select-none overflow-x-hidden pb-28 relative">
      {/* Bright iOS 17 Ambient Pastel Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#E9D5FF]/60 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#FBCFE8]/50 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-[#DDD6FE]/50 blur-3xl" />
      </div>

      {/* ━━━ iPHONE 14 PRO DYNAMIC ISLAND MUSIC BAR ━━━ */}
      <div className="sticky top-3 z-50 px-4 flex justify-center">
        <motion.div
          layout
          className="bg-[#181224]/95 text-white backdrop-blur-xl rounded-full px-3.5 py-2 shadow-xl shadow-purple-950/15 border border-white/15 flex items-center gap-3 max-w-md w-full justify-between"
        >
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Stop music" : "Play music"}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isPlaying ? "bg-[#A855F7] text-white" : "bg-white/15 text-purple-200"
              }`}
            >
              {isPlaying ? (
                <Disc3 className="w-4 h-4 animate-spin" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold tracking-wide flex items-center gap-1.5">
                <span>{audioMode === "shikwa" ? "Shikwa (Instrumental)" : "Post You (Sunset Loop)"}</span>
              </p>
              <p className="text-[10px] text-purple-300/80">
                {isPlaying ? "Playing soft synth tone..." : "Tap icon for background tone"}
              </p>
            </div>
          </div>

          {/* Track Switcher Pill */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => switchTrack("shikwa")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                audioMode === "shikwa"
                  ? "bg-white text-[#181224] font-semibold"
                  : "text-purple-200"
              }`}
            >
              Shikwa
            </button>
            <button
              type="button"
              onClick={() => switchTrack("postyou")}
              className={`px-2.5 py-1 rounded-full transition-all ${
                audioMode === "postyou"
                  ? "bg-white text-[#181224] font-semibold"
                  : "text-purple-200"
              }`}
            >
              Post You
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-md mx-auto px-4 pt-5 space-y-6">
        {/* Live Status Pill */}
        <div className="bg-white/75 backdrop-blur-md border border-purple-200/70 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm">
          <span className="text-xs font-medium text-[#583C78]">{timeGreeting}</span>
          <span className="text-xs font-semibold text-purple-600">Fatima 💜</span>
        </div>

        <AnimatePresence mode="wait">
          {/* ━━━ PAGE 1: SWIPE LYRIC & VIBE DECK ━━━ */}
          {activePage === "vibe" && (
            <motion.section
              key="vibe"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              <div className="text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-purple-600">
                  Interactive Lyric Deck • {cardIndex + 1}/{SWIPE_CARDS.length}
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-[#1E162B]">
                  Kuch Alfaaz Jo Dil Ko Lagte Hain
                </h1>
                <p className="text-xs text-[#6D5A82]">
                  Tap ya swipe karo agla card dekhne ke liye
                </p>
              </div>

              {/* Swipeable iOS Card */}
              <motion.div
                key={cardIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 50) nextCard();
                }}
                onClick={nextCard}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="cursor-pointer bg-white/90 backdrop-blur-xl border border-purple-200/80 rounded-[32px] p-7 shadow-xl shadow-purple-900/5 min-h-[270px] flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-gradient-to-br from-purple-200/60 to-pink-200/50 blur-xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                    {SWIPE_CARDS[cardIndex].tag}
                  </span>
                  <span className="text-xs font-medium text-pink-600">
                    {SWIPE_CARDS[cardIndex].badge}
                  </span>
                </div>

                <div className="my-6 space-y-3">
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[#231733] leading-snug">
                    &ldquo;{SWIPE_CARDS[cardIndex].line}&rdquo;
                  </p>
                  <p className="text-sm text-[#5E4B73] leading-relaxed">
                    {SWIPE_CARDS[cardIndex].sub}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-purple-100 text-xs text-purple-600 font-medium">
                  <span>Tap card or swipe left/right</span>
                  <span className="flex items-center gap-1">
                    Next <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>

              {/* Quick Lyric Pills */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <p className="text-[11px] font-bold text-purple-700 uppercase">
                    Shikwa Hook
                  </p>
                  <p className="text-xs text-[#3C2B4F] mt-1 italic">
                    &ldquo;Tere bin mera guzaara nahi...&rdquo;
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-purple-100 shadow-sm">
                  <p className="text-[11px] font-bold text-pink-600 uppercase">
                    Unspoken Bond
                  </p>
                  <p className="text-xs text-[#3C2B4F] mt-1 italic">
                    &ldquo;Dilon mein, dimaag mein hun...&rdquo;
                  </p>
                </div>
              </div>
            </motion.section>
          )}

          {/* ━━━ PAGE 2: MEDICAL PULSE & DETAILS (FOR HER PRE-MED VIBE) ━━━ */}
          {activePage === "pulse" && (
            <motion.section
              key="pulse"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              {/* Interactive Heartbeat Sensor Widget */}
              <div className="bg-white/90 backdrop-blur-xl border border-pink-200/80 rounded-[28px] p-5 shadow-lg flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600">
                    Live Vitals Check • Tap Heart
                  </span>
                  <h2 className="text-lg font-bold text-[#1E162B]">
                    Dil Ki Raftar: {bpm} BPM
                  </h2>
                  <p className="text-xs text-[#6D5A82]">
                    {bpm > 95
                      ? "Jab tum samne aati ho toh aise hi barhti hai 😉"
                      : "Heart pe tap karo pulse check karne ke liye"}
                  </p>
                </div>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={handleHeartTap}
                  aria-label="Tap heart to measure BPM"
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30"
                >
                  <Heart className="w-8 h-8 fill-current animate-pulse" />
                </motion.button>
              </div>

              {/* 4 Tap-to-Reveal Personal Detail Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {PULSE_TILES.map((tile) => {
                  const selected = activeTile === tile.id;
                  return (
                    <motion.button
                      type="button"
                      key={tile.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setActiveTile(tile.id);
                        audioEngine.playNote(523.25, 0.5, "sine", 0.04);
                      }}
                      className={`p-4 rounded-3xl text-left border transition-all ${
                        selected
                          ? "bg-[#231733] text-white border-[#231733] shadow-lg"
                          : "bg-white/85 text-[#231733] border-purple-200/70"
                      }`}
                    >
                      <span className="text-2xl">{tile.emoji}</span>
                      <p className="text-sm font-bold mt-2">{tile.title}</p>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          selected ? "text-purple-200" : "text-[#7A6891]"
                        }`}
                      >
                        {tile.short}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Tile Message */}
              {PULSE_TILES.map(
                (t) =>
                  t.id === activeTile && (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/95 border border-purple-200 rounded-3xl p-5 shadow-md"
                    >
                      <p className="text-xs font-bold uppercase text-purple-600 mb-1">
                        {t.title}
                      </p>
                      <p className="text-sm text-[#2E2040] leading-relaxed font-medium">
                        {t.reveal}
                      </p>
                    </motion.div>
                  )
              )}
            </motion.section>
          )}

          {/* ━━━ PAGE 3: THE "KAMI" & 15 OCT VAULT ━━━ */}
          {activePage === "kami" && (
            <motion.section
              key="kami"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-purple-200/80 rounded-[32px] p-7 text-center space-y-5 shadow-xl">
                <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
                  {tapsRemaining > 0 ? (
                    <Lock className="w-8 h-8" />
                  ) : (
                    <Unlock className="w-8 h-8 text-pink-600" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-purple-600">
                    The Secret Hook • &ldquo;Knsi Kami??&rdquo;
                  </span>
                  <h2 className="text-2xl font-bold text-[#1E162B]">
                    {tapsRemaining > 0
                      ? `Tap ${tapsRemaining} Times to Peek Inside`
                      : "Raaz Phir Bhi Adhoora Hai 😉"}
                  </h2>
                </div>

                {tapsRemaining > 0 ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={handleUnlockTap}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25"
                  >
                    Tap to Unlock ({tapsRemaining} left) ✨
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#FAF5FF] border border-purple-200 rounded-2xl p-5 text-left space-y-3"
                  >
                    <p className="text-sm font-semibold text-[#2B1B3D]">
                      &ldquo;Ufffff / Achwww&rdquo; kehne se kaam nahi chalega! 😂
                    </p>
                    <p className="text-xs text-[#544169] leading-relaxed">
                      Bracelet wali snap mein jo ek cheez missing thi, aur jo 15 October ka
                      pending surprise hai—woh chat ya website pe leak nahi hoga.
                    </p>
                    <p className="text-xs font-bold text-purple-700">
                      Shart wohi hai: Samne aaogi toh khud dikh jayegi. 💜
                    </p>
                    <button
                      type="button"
                      onClick={() => setTapsRemaining(5)}
                      className="text-[11px] text-purple-600 underline pt-1"
                    >
                      Lock again
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}

          {/* ━━━ PAGE 4: INTERACTIVE STAR SKY ━━━ */}
          {activePage === "sky" && (
            <motion.section
              key="sky"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-b from-[#25173B] to-[#3B235A] text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-purple-300">
                      Tap the Stars to Light Up
                    </p>
                    <h2 className="text-lg font-bold">
                      Chaand Ban Ke Chhup Gayi Hai...
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLitStars([1, 2, 3, 4, 5, 6])}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/15 text-purple-100"
                  >
                    Light All ✨
                  </button>
                </div>

                <div className="relative h-64 w-full border border-white/10 rounded-2xl bg-black/20">
                  {skyPoints.map((pt) => {
                    const isLit = litStars.includes(pt.id);
                    return (
                      <button
                        type="button"
                        key={pt.id}
                        onClick={() => {
                          if (!litStars.includes(pt.id)) {
                            setLitStars([...litStars, pt.id]);
                          }
                          audioEngine.playNote(500 + pt.id * 60, 0.9, "sine", 0.05);
                        }}
                        style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      >
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            isLit
                              ? "bg-pink-400 text-[#1E1230] scale-110 shadow-lg shadow-pink-400/50"
                              : "bg-white/15 text-white/70"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isLit ? "fill-current" : ""}`} />
                        </span>
                        <span className="text-[10px] mt-1 text-purple-200 font-medium">
                          {pt.word}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-purple-200/90 text-center mt-4 italic">
                  &ldquo;Sabr ka phal meetha hota hai — no rush, no pressure. — Hassaan 💜&rdquo;
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ━━━ iPHONE BOTTOM GLASS DOCK (4 PAGES) ━━━ */}
      <nav className="fixed bottom-4 inset-x-0 z-50 px-4 flex justify-center">
        <div className="bg-white/85 backdrop-blur-2xl border border-purple-200/90 rounded-full p-1.5 shadow-2xl shadow-purple-950/15 flex items-center justify-between max-w-sm w-full">
          {[
            { id: "vibe", label: "Shikwa Deck", icon: Flame },
            { id: "pulse", label: "Pulse", icon: Heart },
            { id: "kami", label: "Woh Kami", icon: Gift },
            { id: "sky", label: "Night Sky", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activePage === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => {
                  setActivePage(tab.id as "vibe" | "pulse" | "kami" | "sky");
                  audioEngine.playNote(520, 0.3, "sine", 0.03);
                }}
                className={`flex-1 py-2 px-2 rounded-full flex flex-col items-center gap-0.5 transition-all ${
                  active
                    ? "bg-[#231733] text-white shadow-md"
                    : "text-[#6D5A82] hover:text-[#231733]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
