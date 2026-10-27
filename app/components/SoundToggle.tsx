"use client";

import { useEffect, useRef, useState } from "react";
import { setSound, subscribeSound, isSoundOn } from "../lib/sound";
import { personal } from "../config/personal";

export default function SoundToggle() {
  const [on, setOn] = useState(() => isSoundOn());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return subscribeSound((v) => {
      setOn(v);
      const a = audioRef.current;
      if (!a) return;
      if (v) void a.play().catch(() => {});
      else a.pause();
    });
  }, []);

  return (
    <>
      {personal.musicSrc && <audio ref={audioRef} src={personal.musicSrc} loop preload="none" />}
      <button
        type="button"
        onClick={() => setSound(!on)}
        aria-pressed={on}
        aria-label={on ? "Turn sound off" : "Turn sound on"}
        className="fixed right-3 top-3 z-50 flex items-center gap-2 rounded-full border border-lilac/70 bg-paper/85 px-3.5 py-2 text-xs font-medium text-plum-deep shadow-sm backdrop-blur transition hover:bg-lavender"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M11 5 6 9H2v6h4l5 4V5z" />
          {on ? (
            <>
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </>
          ) : (
            <path d="m22 9-6 6m0-6 6 6" />
          )}
        </svg>
        Sound {on ? "on" : "off"}
      </button>
    </>
  );
}
