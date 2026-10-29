"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SIX_OBJECTS, KEEPSAKE_NOTES, DetailObject } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function DetailsTab() {
  const [selectedObject, setSelectedObject] = useState<DetailObject | null>(null);

  const openObject = (obj: DetailObject) => {
    audioEngine.playPluck(620, 1.4);
    setSelectedObject(obj);
  };

  const closeObject = () => {
    audioEngine.playHaptic(440);
    setSelectedObject(null);
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8] bg-[#211a26] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Chapter 01 • Interactive Keepsakes
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0eaf0]">
          The Six Little Details
        </h2>
        <p className="text-xs text-[#b7aabf]">
          Tap each object to unfold a quiet reflection kept inside.
        </p>
      </div>

      {/* ─── 6 Interactive Object Buttons (Touch target optimized) ─── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SIX_OBJECTS.map((obj) => (
          <button
            type="button"
            key={obj.id}
            onClick={() => openObject(obj)}
            className="ios-surface-interactive p-3 text-center flex flex-col items-center justify-center gap-1.5 min-h-[72px]"
          >
            <span className="text-2xl text-[#b995b8]">
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

      {/* ─── Apple Modal Sheet for Revealed Object ─── */}
      <AnimatePresence>
        {selectedObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="ios-surface-elevated p-6 max-w-sm w-full relative text-left space-y-3.5 shadow-2xl border border-[var(--border-prominent)]"
            >
              <button
                type="button"
                onClick={closeObject}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 text-[#f0eaf0] flex items-center justify-center active:bg-white/10 transition-colors touch-target"
                aria-label="Close"
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
                  <h3 className="text-base font-serif font-bold text-[#f0eaf0]">
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
                  className="px-4 py-2 rounded-xl bg-[#211a26] border border-[var(--border-subtle)] text-xs font-medium text-[#f0eaf0] active:bg-[#362c3d] touch-target"
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
