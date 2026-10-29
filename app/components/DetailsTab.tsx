"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
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
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/20">
          Chapter 01 • Interactive Keepsakes
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#f5f3f9]">
          The Six Little Details
        </h2>
        <p className="text-xs text-[#ad9fc0]">
          Tap each object to unfold a quiet reflection kept inside.
        </p>
      </div>

      {/* ─── 6 Interactive Object Buttons ─── */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {SIX_OBJECTS.map((obj) => (
          <motion.button
            type="button"
            key={obj.id}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openObject(obj)}
            className="apple-glass-card rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center gap-2 group transition-all"
          >
            <span className="text-2xl sm:text-3xl text-purple-300 group-hover:scale-110 transition-transform">
              {obj.symbol}
            </span>
            <span className="text-[11px] font-semibold text-[#f5f3f9] line-clamp-1">
              {obj.title}
            </span>
            <span className="text-[9px] text-[#746788] uppercase tracking-wider">
              Tap
            </span>
          </motion.button>
        ))}
      </div>

      {/* ─── Apple Modal Sheet for Revealed Object ─── */}
      <AnimatePresence>
        {selectedObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="apple-glass-card rounded-[32px] p-7 max-w-sm w-full border border-purple-400/30 relative text-left space-y-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={closeObject}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-white/80 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-3xl text-purple-300">
                  {selectedObject.symbol}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-purple-400 font-mono">
                    {selectedObject.kicker}
                  </p>
                  <h3 className="text-lg font-serif font-bold text-[#f5f3f9]">
                    {selectedObject.title}
                  </h3>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="font-serif italic text-base text-[#e2dcee] leading-relaxed">
                  &ldquo;{selectedObject.thought}&rdquo;
                </p>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={closeObject}
                  className="px-5 py-2 rounded-full bg-white/10 text-xs font-semibold text-purple-200 hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── The Keepsake Shelf ─── */}
      <div className="space-y-3 pt-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
            The Keepsake Shelf
          </h3>
        </div>

        <div className="space-y-3">
          {KEEPSAKE_NOTES.map((note, idx) => (
            <div
              key={idx}
              className="apple-glass rounded-2xl p-5 text-left space-y-1.5 border border-white/10"
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-mono text-purple-400">
                <span>{note.eyebrow}</span>
                <span>Self Reflection</span>
              </div>
              <h4 className="font-serif text-base font-bold text-[#f5f3f9]">
                {note.title}
              </h4>
              <p className="text-xs text-[#b8afc4] leading-relaxed font-light">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
