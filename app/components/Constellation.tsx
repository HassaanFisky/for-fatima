"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { SectionHeading } from "./Reveal";
import { chord, note } from "../lib/sound";

const N = 14;

/** Heart curve points (x,y in 0..100) and deterministic scattered start positions. */
const STARS = Array.from({ length: N }, (_, i) => {
  const t = (i / N) * Math.PI * 2;
  const hx = 16 * Math.pow(Math.sin(t), 3);
  const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return {
    hx: 50 + hx * 2.7,
    hy: 44 - hy * 2.5,
    sx: 6 + ((i * 37 + 13) % 88),
    sy: 6 + ((i * 59 + 29) % 84),
  };
});

export default function Constellation() {
  const [active, setActive] = useState<boolean[]>(() => Array(N).fill(false));
  const boxRef = useRef<HTMLDivElement>(null);
  const count = active.filter(Boolean).length;
  const done = count === N;

  const light = useCallback(
    (i: number) => {
      setActive((prev) => {
        if (prev[i]) return prev;
        const next = [...prev];
        next[i] = true;
        const c = next.filter(Boolean).length;
        note(c);
        if (c === N) window.setTimeout(chord, 250);
        return next;
      });
    },
    []
  );

  /** Dragging a finger/cursor across the sky lights any star it touches. */
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.buttons === 0) return;
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    STARS.forEach((s, i) => {
      const px = active[i] ? s.hx : s.sx;
      const py = active[i] ? s.hy : s.sy;
      if (!active[i] && Math.hypot(px - x, py - y) < 9) light(i);
    });
  };

  const lines = useMemo(
    () =>
      STARS.map((s, i) => {
        const n = STARS[(i + 1) % N];
        return { i, j: (i + 1) % N, x1: s.hx, y1: s.hy, x2: n.hx, y2: n.hy };
      }),
    []
  );

  return (
    <section id="constellation" className="bg-midnight px-5 py-20 text-ivory">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="chapter six"
          title="A Tiny Constellation"
          sub={`Tap the stars, or drag across the sky, and see what they make. ${count} of ${N} found.`}
          dark
        />

        <div
          ref={boxRef}
          onPointerMove={onMove}
          onPointerDown={onMove}
          className="relative mx-auto aspect-square w-full max-w-[34rem] touch-none select-none overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-midnight-2 to-midnight"
        >
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
            {done && (
              <polygon
                points={STARS.map((s) => `${s.hx},${s.hy}`).join(" ")}
                fill="rgba(217,167,184,.16)"
                style={{ animation: "rise 1.2s ease both" }}
              />
            )}
            {lines.map((l) =>
              active[l.i] && active[l.j] ? (
                <line key={l.i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#e9d5ff" strokeWidth="0.45" className="line-draw" />
              ) : null
            )}
          </svg>

          {STARS.map((s, i) => {
            const on = active[i];
            return (
              <button
                key={i}
                type="button"
                onClick={() => light(i)}
                aria-label={on ? `Star ${i + 1}, connected` : `Star ${i + 1}, tap to connect`}
                className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{
                  left: `${on ? s.hx : s.sx}%`,
                  top: `${on ? s.hy : s.sy}%`,
                  transition: "left 1.1s cubic-bezier(.2,.8,.2,1), top 1.1s cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    on
                      ? "h-3 w-3 bg-[#f3e8ff] shadow-[0_0_14px_5px_rgba(216,180,254,.65)]"
                      : "animate-twinkle h-2 w-2 bg-white/70"
                  }`}
                  style={on ? undefined : { animationDelay: `${(i % 5) * 0.4}s` }}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-6 min-h-[6rem] text-center" aria-live="polite">
          {done ? (
            <div className="animate-rise">
              <p className="font-serif text-2xl leading-snug text-[#f3e8ff]">
                Made with care.
                <br />
                Nothing expected in return.
              </p>
            </div>
          ) : (
            <p className="text-xs text-lilac">The stars are shy. They only gather when you ask them to.</p>
          )}
          <div className="mt-4 flex justify-center gap-2">
            {!done && (
              <button
                type="button"
                onClick={() => {
                  const first = active.findIndex((a) => !a);
                  if (first >= 0) light(first);
                }}
                className="rounded-full bg-white/10 px-4 py-1.5 text-xs text-lilac transition hover:bg-white/20"
              >
                Light the next star
              </button>
            )}
            <button
              type="button"
              onClick={() => setActive(Array(N).fill(false))}
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
