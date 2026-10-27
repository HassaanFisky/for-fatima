"use client";

import { useCallback, useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { chord, chime, note } from "../lib/sound";

const MESSAGES = [
  "Official notice: you have successfully discovered a tiny corner of the internet made with extra care.",
  "Achievement unlocked: professional-level curiosity.",
  "Plot twist: someone spent time making this little universe instead of sending another paragraph.",
  "Fun fact: this entire page runs without a single cookie. Only good intentions.",
  "Weather report: a small chance of smiling, increasing slowly.",
  "Fine print: no response required. Terms and conditions: be kind to yourself.",
  "Bug report: none found. Feature report: you can close this tab any time.",
  "Hydration reminder from a very small website: a glass of water, perhaps?",
];

/* ---------- flower ---------- */
function Flower() {
  const [stage, setStage] = useState(0); // 0..4
  const petals = [0, 60, 120, 180, 240, 300];
  const bloom = stage / 4;
  return (
    <Card title="A flower that blooms" caption={stage === 4 ? "Fully bloomed. Nothing rushed it." : "Tap to help it open."}>
      <button
        type="button"
        onClick={() => {
          setStage((s) => (s + 1) % 5);
          note(stage);
        }}
        aria-label="Help the flower bloom"
        className="rounded-full"
      >
        <svg viewBox="0 0 120 130" width="150" aria-hidden>
          <path d="M60 128V70" stroke="#7a9a6e" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 108c-14 0-22-8-22-16 14 0 22 6 22 16zM60 96c12 0 20-8 20-16-12 0-20 6-20 16z" fill="#a5bf97" />
          <g transform="translate(60 52)">
            {petals.map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy={-6 - bloom * 16}
                rx={3 + bloom * 9}
                ry={4 + bloom * 14}
                transform={`rotate(${a})`}
                fill={a % 120 === 0 ? "#d9a7b8" : "#e8c3d0"}
                stroke="#b97f96"
                strokeWidth="1"
                style={{ transition: "all .6s cubic-bezier(.2,.8,.2,1)" }}
              />
            ))}
            <circle r={5 + bloom * 3} fill="#f3d27a" style={{ transition: "all .6s" }} />
          </g>
        </svg>
      </button>
    </Card>
  );
}

/* ---------- star with expressions ---------- */
const FACES = [
  { label: "Calm", mouth: "M40 62q10 8 20 0", eyes: "dot" },
  { label: "Happy", mouth: "M38 58q12 16 24 0", eyes: "arc" },
  { label: "Sleepy", mouth: "M44 64h12", eyes: "line" },
  { label: "Surprised", mouth: "M50 60a4 5 0 1 0 .1 0", eyes: "dot" },
  { label: "Winking", mouth: "M40 60q10 10 20 0", eyes: "wink" },
] as const;

function MoodStar() {
  const [i, setI] = useState(0);
  const f = FACES[i];
  const eye = (cx: number, side: "l" | "r") => {
    if (f.eyes === "dot") return <circle cx={cx} cy="48" r="2.8" fill="#3b2350" />;
    if (f.eyes === "line") return <path d={`M${cx - 4} 48h8`} stroke="#3b2350" strokeWidth="2.4" strokeLinecap="round" />;
    if (f.eyes === "arc") return <path d={`M${cx - 4} 50q4-7 8 0`} stroke="#3b2350" strokeWidth="2.4" fill="none" strokeLinecap="round" />;
    return side === "l" ? <circle cx={cx} cy="48" r="2.8" fill="#3b2350" /> : <path d={`M${cx - 4} 48h8`} stroke="#3b2350" strokeWidth="2.4" strokeLinecap="round" />;
  };
  return (
    <Card title="A star with moods" caption={`Feeling: ${f.label.toLowerCase()}.`}>
      <button
        type="button"
        onClick={() => {
          setI((v) => (v + 1) % FACES.length);
          note(i + 3);
        }}
        aria-label="Change the star's expression"
        className="transition hover:rotate-6"
      >
        <svg viewBox="0 0 100 100" width="140" aria-hidden>
          <path d="m50 6 12.5 27 29 3.5-21.5 20 5.8 29L50 71 24.2 85.5 30 56.5 8.5 36.5l29-3.5z" fill="#f3d27a" stroke="#d4a93f" strokeWidth="2" strokeLinejoin="round" />
          {eye(40, "l")}
          {eye(60, "r")}
          <path d={f.mouth} stroke="#3b2350" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle cx="33" cy="56" r="3.5" fill="#e8a3b5" opacity=".7" />
          <circle cx="67" cy="56" r="3.5" fill="#e8a3b5" opacity=".7" />
        </svg>
      </button>
    </Card>
  );
}

/* ---------- floating paper note ---------- */
const PAPER_NOTES = [
  "Take a breath. Unclench your shoulders. There you go.",
  "You are allowed to take all the time you need.",
  "Be kind to yourself today.",
  "Small things count, and so do you.",
];
function PaperNote() {
  const [n, setN] = useState(-1);
  return (
    <Card title="A floating paper note" caption={n < 0 ? "It keeps drifting. Catch it." : "Tap again for another."}>
      <button
        type="button"
        onClick={() => {
          setN((v) => (v + 1) % PAPER_NOTES.length);
          chime(740, 1.2);
        }}
        aria-label="Catch the floating note"
        className="animate-floaty block w-full"
      >
        <div className="mx-auto flex min-h-[7.5rem] w-44 items-center justify-center rounded-sm bg-[#fff8e6] p-4 font-hand text-xl leading-6 text-plum-deep shadow-lg" style={{ transform: "rotate(-2deg)" }}>
          {n < 0 ? "psst… tap me" : PAPER_NOTES[n]}
        </div>
      </button>
    </Card>
  );
}

/* ---------- lantern puzzle (3x3 lights-out, always solvable) ---------- */
function press(grid: boolean[], i: number) {
  const g = [...grid];
  const r = Math.floor(i / 3);
  const c = i % 3;
  [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
    const rr = r + dr;
    const cc = c + dc;
    if (rr >= 0 && rr < 3 && cc >= 0 && cc < 3) g[rr * 3 + cc] = !g[rr * 3 + cc];
  });
  return g;
}
function scramble() {
  let g = Array<boolean>(9).fill(true);
  const seq = [0, 4, 2, 7, 5, 1];
  const start = Math.floor(Math.random() * 3);
  for (let k = 0; k < 4; k++) g = press(g, seq[(start + k) % seq.length]);
  return g;
}
const SOLVED = Array<boolean>(9).fill(true);

function Lanterns() {
  const [grid, setGrid] = useState<boolean[]>(() => press(press(press(SOLVED, 0), 4), 8));
  const [moves, setMoves] = useState(0);
  const solved = grid.every(Boolean);

  const tap = (i: number) => {
    if (solved) return;
    const next = press(grid, i);
    setGrid(next);
    setMoves((m) => m + 1);
    note(i);
    if (next.every(Boolean)) chord();
  };
  const reset = () => {
    let g = scramble();
    if (g.every(Boolean)) g = press(g, 4);
    setGrid(g);
    setMoves(0);
  };

  return (
    <Card
      title="Light all the lanterns"
      caption={solved ? `All lit in ${moves} moves. Patience, again.` : "Each tap also flips its neighbours."}
    >
      <div className="mx-auto grid w-48 grid-cols-3 gap-2" role="group" aria-label="Lantern puzzle">
        {grid.map((on, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Lantern ${i + 1}, ${on ? "lit" : "dark"}`}
            aria-pressed={on}
            onClick={() => tap(i)}
            className={`h-14 rounded-xl border transition duration-300 ${
              on
                ? "border-[#e0b94f] bg-[#f6d77f] shadow-[0_0_18px_rgba(246,215,127,.8)]"
                : "border-midnight-2 bg-midnight-2"
            }`}
          />
        ))}
      </div>
      <button type="button" onClick={reset} className="mt-3 text-xs text-plum underline underline-offset-4">
        {solved ? "play again" : "new puzzle"}
      </button>
    </Card>
  );
}

/* ---------- hidden messages ---------- */
function HiddenJar() {
  const [found, setFound] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const pick = useCallback(() => {
    const remaining = MESSAGES.map((_, i) => i).filter((i) => !found.includes(i));
    const pool = remaining.length ? remaining : MESSAGES.map((_, i) => i);
    const idx = pool[Math.floor(Math.random() * pool.length)];
    setLast(idx);
    setFound((f) => (f.includes(idx) ? f : [...f, idx]));
    chime(880, 1);
  }, [found]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-midnight-2 to-midnight p-7 text-ivory shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-lilac">
        <span className="uppercase tracking-widest">Hidden messages</span>
        <span>
          {found.length} of {MESSAGES.length} found
        </span>
      </div>
      <p
        key={last ?? "none"}
        aria-live="polite"
        className="animate-rise mt-5 min-h-[5.5rem] font-serif text-lg italic leading-relaxed sm:text-xl"
      >
        {last === null ? "Open the jar to find a tiny message." : `“${MESSAGES[last]}”`}
      </p>
      <button
        type="button"
        onClick={pick}
        className="mt-3 rounded-full bg-lavender px-5 py-2.5 text-xs font-semibold text-plum-deep transition hover:bg-white"
      >
        {last === null ? "Open the jar" : "Another one"}
      </button>
    </div>
  );
}

function Card({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-lilac/60 bg-paper p-6 text-center shadow-sm">
      <h3 className="mb-3 font-serif text-lg text-plum-deep">{title}</h3>
      <div className="flex min-h-[10rem] flex-col items-center justify-center">{children}</div>
      <p className="mt-3 text-xs text-ink-soft" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}

export default function Smile() {
  return (
    <section id="smile" className="mx-auto max-w-5xl px-5 py-20">
      <SectionHeading
        eyebrow="chapter four"
        title="A Small Reason to Smile"
        sub="A few little things to play with. None of them matter, which is exactly the point."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal><Flower /></Reveal>
        <Reveal delay={120}><MoodStar /></Reveal>
        <Reveal><PaperNote /></Reveal>
        <Reveal delay={120}><Lanterns /></Reveal>
      </div>
      <Reveal className="mt-4">
        <HiddenJar />
      </Reveal>
    </section>
  );
}
