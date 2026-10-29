"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, List, Grid } from "lucide-react";
import { SIX_OBJECTS, KEEPSAKE_NOTES, DetailObject } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function DetailsTab() {
  const [selectedObject, setSelectedObject] = useState<DetailObject | null>(null);
  const [showAllAsList, setShowAllAsList] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openObject = (obj: DetailObject) => {
    audioEngine.playPluck(620, 1.4);
    setSelectedObject(obj);
  };

  const closeObject = () => {
    audioEngine.playHaptic(440);
    setSelectedObject(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedObject) {
        closeObject();
      }
    };
    if (selectedObject) {
      window.addEventListener("keydown", handleKeyDown);
      closeBtnRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObject]);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8] bg-[#211a26] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Chapter 01 • Interactive Keepsakes
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0eaf0]">
          The Six Little Details
        </h2>
        <div className="flex items-center justify-center gap-3 pt-1">
          <p className="text-xs text-[#b7aabf]">
            {showAllAsList ? "Reading all reflections quietly." : "Tap each object to unfold a reflection."}
          </p>
          <button
            type="button"
            onClick={() => {
              audioEngine.playHaptic(500);
              setShowAllAsList(!showAllAsList);
            }}
            className="text-[11px] text-[#b995b8] hover:text-[#f0eaf0] flex items-center gap-1 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] rounded touch-target"
            aria-label={showAllAsList ? "Switch to grid icons" : "View all as continuous list"}
          >
            {showAllAsList ? (
              <>
                <Grid className="w-3.5 h-3.5" /> <span>Grid icons</span>
              </>
            ) : (
              <>
                <List className="w-3.5 h-3.5" /> <span>List all</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Mode A: 6 Interactive Object Buttons ─── */}
      {!showAllAsList ? (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" role="region" aria-label="Keepsake objects grid">
          {SIX_OBJECTS.map((obj) => (
            <button
              type="button"
              key={obj.id}
              onClick={() => openObject(obj)}
              aria-haspopup="dialog"
              aria-label={`Open keepsake: ${obj.title}`}
              className="ios-surface-interactive p-3 text-center flex flex-col items-center justify-center gap-1.5 min-h-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8]"
            >
              <span className="text-2xl text-[#b995b8]" aria-hidden="true">
                {obj.symbol}
              </span>
              <span className="text-[11px] font-medium text-[#f0eaf0] line-clamp-1">
                {obj.title}
              </span>
              <span className="text-[9px] text-[#82738a] uppercase tracking-wider">
                Tap
              </span>
            </button>
          ))}
        </div>
      ) : (
        /* ─── Mode B: Autonomy-first continuous list (No popups needed) ─── */
        <div className="space-y-3" role="region" aria-label="Continuous keepsake reflections list">
          {SIX_OBJECTS.map((obj) => (
            <div key={obj.id} className="ios-surface p-4 text-left space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="text-xl text-[#b995b8]">{obj.symbol}</span>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#b995b8]">{obj.kicker}</span>
                  <h3 className="font-serif text-sm font-semibold text-[#f0eaf0]">{obj.title}</h3>
                </div>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-[#b7aabf] leading-relaxed pl-1 border-l-2 border-[#b995b8]/30">
                &ldquo;{obj.thought}&rdquo;
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── Apple Modal Sheet for Revealed Object ─── */}
      <AnimatePresence>
        {selectedObject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={closeObject}
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="ios-surface-elevated p-6 max-w-sm w-full relative text-left space-y-3.5 shadow-2xl border border-[var(--border-prominent)]"
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeObject}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 text-[#f0eaf0] flex items-center justify-center hover:bg-white/10 active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] transition-colors touch-target"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <span className="text-2xl text-[#b995b8]">
                  {selectedObject.symbol}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#b995b8] font-mono">
                    {selectedObject.kicker}
                  </p>
                  <h3 id="dialog-title" className="text-base font-serif font-bold text-[#f0eaf0]">
                    {selectedObject.title}
                  </h3>
                </div>
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-3">
                <p className="font-serif italic text-sm text-[#f0eaf0] leading-relaxed">
                  &ldquo;{selectedObject.thought}&rdquo;
                </p>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={closeObject}
                  className="px-4 py-2 rounded-xl bg-[#211a26] border border-[var(--border-subtle)] text-xs font-medium text-[#f0eaf0] active:bg-[#362c3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b995b8] touch-target"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── The Keepsake Shelf ─── */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center gap-2 px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#b995b8]">
            The Keepsake Shelf
          </h3>
        </div>

        <div className="space-y-2.5">
          {KEEPSAKE_NOTES.map((note, idx) => (
            <div
              key={idx}
              className="ios-surface p-4 text-left space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-mono text-[#82738a]">
                <span>{note.eyebrow}</span>
                <span>Self Reflection</span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#f0eaf0]">
                {note.title}
              </h4>
              <p className="text-xs text-[#b7aabf] leading-relaxed font-light">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
