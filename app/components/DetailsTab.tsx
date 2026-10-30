"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { KEEPSAKE_ITEMS, EDITORIAL_NOTES } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function DetailsTab() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    audioEngine.playHaptic(expandedId === id ? 480 : 620);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ─── Chapter Header ─── */}
      <section aria-label="Keepsakes header" className="text-left space-y-1.5 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191124] border border-[var(--border-subtle)]">
          <Sparkles className="w-3 h-3 text-[#9878d1]" />
          <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
            Chapter 01 • Curated Keepsakes
          </span>
        </div>
        <h2 className="editorial-title text-2xl sm:text-3xl text-[#f4eff8]">
          Six Quiet Reflections
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#b8adc6]">
          Thoughts kept with care, written directly for you without noise or rush.
        </p>
      </section>

      {/* ─── The Keepsake Collection (Direct & Accessible) ─── */}
      <section aria-label="Keepsakes collection" className="space-y-3">
        {KEEPSAKE_ITEMS.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`luxury-card p-4 sm:p-5 transition-all text-left ${
                isExpanded ? "border-[var(--border-prominent)] bg-[#191124]" : "hover:border-[var(--border-prominent)]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                aria-expanded={isExpanded}
                className="w-full flex items-center justify-between gap-3 text-left touch-target"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#100b19] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-lg text-[#9878d1]">
                    {item.iconSymbol}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#857896]">
                        {item.num}
                      </span>
                      <h3 className="font-serif text-sm sm:text-base font-normal text-[#f4eff8] truncate">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#b8adc6] font-light truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-[#857896] uppercase font-mono hidden sm:inline">
                    {isExpanded ? "Close" : "Read"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#857896] transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#9878d1]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Reflection Content (Directly Accessible) */}
              {isExpanded && (
                <div className="mt-3.5 pt-3.5 border-t border-[var(--border-subtle)]">
                  <p className="font-serif italic text-xs sm:text-sm text-[#f4eff8] leading-relaxed pl-2 border-l-2 border-[#9878d1]/40 font-light">
                    &ldquo;{item.reflection}&rdquo;
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ─── Editorial Plaques (The Keepsake Shelf) ─── */}
      <section aria-label="Quiet reflections shelf" className="space-y-3 pt-2">
        <div className="px-1">
          <h3 className="editorial-kicker text-[10px] text-[#c6b4e5]">
            Quiet Reminders
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {EDITORIAL_NOTES.map((note) => (
            <div
              key={note.number}
              className="luxury-card p-4 text-left space-y-1.5"
            >
              <div className="flex items-center justify-between text-[9px] uppercase font-mono text-[#857896]">
                <span>Note {note.number}</span>
                <span className="text-[#9878d1]">For Fatima</span>
              </div>
              <h4 className="font-serif text-sm font-normal text-[#f4eff8]">
                {note.headline}
              </h4>
              <p className="editorial-body text-xs text-[#b8adc6] font-light">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
