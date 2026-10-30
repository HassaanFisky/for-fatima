"use client";

import React, { useState } from "react";
import { ChevronDown, ShieldCheck, HeartHandshake } from "lucide-react";
import { CORE_PILLARS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function TruthTab() {
  const [expandedId, setExpandedId] = useState<string | null>("listening");

  const toggleExpand = (id: string) => {
    audioEngine.playHaptic(expandedId === id ? 480 : 620);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ─── Chapter Header ─── */}
      <section aria-label="Accountability header" className="text-left space-y-1.5 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#191124] border border-[var(--border-subtle)]">
          <HeartHandshake className="w-3 h-3 text-[#9878d1]" />
          <span className="editorial-kicker text-[10px] text-[#c6b4e5]">
            Chapter 02 • Sincere Accountability
          </span>
        </div>
        <h2 className="editorial-title text-2xl sm:text-3xl text-[#f4eff8]">
          The Honest Truth
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#b8adc6]">
          Taking responsibility quietly, without excuses or defending myself.
        </p>
      </section>

      {/* ─── Direct Apology Letter (Dignified & Honest) ─── */}
      <section 
        aria-label="Apology letter"
        className="luxury-card-elevated p-6 sm:p-7 text-left space-y-4 relative overflow-hidden"
      >
        <div className="space-y-3 font-serif text-xs sm:text-sm text-[#f4eff8] leading-relaxed">
          <p>
            Fatima, I know there were moments when I didn&apos;t handle things the way I should have.
          </p>
          <p className="text-[#b8adc6] font-light">
            I sometimes let my emotions take over instead of listening properly. I pushed conversations when I should have given you space, and there were times I didn&apos;t respect your boundaries the way I needed to.
          </p>
          <p className="font-medium text-[#c6b4e5] text-sm sm:text-[15px]">
            I am genuinely sorry for that.
          </p>
          <p className="text-[#b8adc6] font-light">
            You deserved to have your words heard without having to repeat yourself or feel overwhelmed.
          </p>
          <p className="text-[#f4eff8]">
            I can&apos;t ask you to trust me just because I say the right things. Trust takes time, quiet consistency, and actions.
          </p>
          <p className="text-[#b8adc6] font-light">
            I am working on understanding that better every single day.
          </p>
          <p className="text-[11px] text-[#857896] italic pt-3 border-t border-[var(--border-subtle)] font-sans">
            You don&apos;t owe me forgiveness, a reply, or another chance. I simply wanted to acknowledge my part honestly.
          </p>
        </div>
      </section>

      {/* ─── The Three Core Pillars of Growth ─── */}
      <section aria-label="Core pillars of growth" className="space-y-3 pt-1">
        <div className="px-1 flex items-center justify-between">
          <h3 className="editorial-kicker text-[10px] text-[#c6b4e5]">
            The Three Principles
          </h3>
          <span className="text-[10px] text-[#857896] font-mono">
            Values that matter
          </span>
        </div>

        <div className="space-y-2.5">
          {CORE_PILLARS.map((pillar) => {
            const isOpen = expandedId === pillar.id;
            return (
              <div
                key={pillar.id}
                className={`luxury-card p-4 transition-all text-left ${
                  isOpen ? "border-[var(--border-prominent)] bg-[#191124]" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(pillar.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left touch-target"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#100b19] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 font-serif text-xs font-semibold text-[#c6b4e5]">
                      {pillar.number}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-normal text-[#f4eff8]">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-[#b8adc6] font-light">
                        &ldquo;{pillar.mantra}&rdquo;
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-[#857896] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#9878d1]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-subtle)]">
                    <p className="editorial-body text-xs text-[#b8adc6] font-light leading-relaxed pl-1">
                      {pillar.detail}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
