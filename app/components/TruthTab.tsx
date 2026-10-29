"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Ear, ShieldCheck, Compass } from "lucide-react";
import { MATTER_CARDS } from "../config/personal";
import { audioEngine } from "../lib/sound";

export default function TruthTab() {
  const [expandedId, setExpandedId] = useState<string | null>("respect");

  const toggleExpand = (id: string) => {
    audioEngine.playHaptic(expandedId === id ? 480 : 620);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Ear":
        return <Ear className="w-4 h-4 text-[#b995b8]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#b995b8]" />;
      default:
        return <Compass className="w-4 h-4 text-[#b995b8]" />;
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-[#b995b8] bg-[#211a26] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Chapter 02 • Sincere Accountability
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0eaf0]">
          The Apology I Should Have Expressed Better
        </h2>
      </div>

      {/* ─── Exact Documented Apology Letter ─── */}
      <div className="ios-surface-elevated p-6 text-left space-y-3.5 relative overflow-hidden">
        <div className="space-y-3 font-serif text-xs sm:text-sm text-[#f0eaf0] leading-relaxed">
          <p>
            Fatima, I know there were moments when I didn&apos;t handle things the way I should have.
          </p>
          <p>
            I sometimes let my emotions take over instead of listening properly. I pushed conversations when I should have given you space, and there were times I didn&apos;t respect your boundaries the way I needed to.
          </p>
          <p className="font-semibold text-[#b995b8]">
            I&apos;m sorry for that.
          </p>
          <p>
            You deserved to have your words heard without having to repeat yourself.
          </p>
          <p>
            I can&apos;t ask you to trust me just because I say the right things. Trust takes time, consistency, and actions.
          </p>
          <p className="text-[#b7aabf]">
            I&apos;m working on understanding that better.
          </p>
          <p className="text-xs text-[#82738a] italic pt-2 border-t border-[var(--border-subtle)]">
            You don&apos;t owe me forgiveness, a reply, or another chance. I simply wanted to acknowledge my part honestly.
          </p>
        </div>
      </div>

      {/* ─── Chapter 03: The Things That Matter ─── */}
      <div className="space-y-2.5 pt-1">
        <div className="text-left px-1">
          <h3 className="text-base sm:text-lg font-bold text-[#f0eaf0]">
            The Things That Matter
          </h3>
          <p className="text-xs text-[#b7aabf]">
            Tap any card to see the reflection underneath.
          </p>
        </div>

        <div className="space-y-2.5">
          {MATTER_CARDS.map((card) => {
            const isOpen = expandedId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => toggleExpand(card.id)}
                className={`ios-surface p-4 cursor-pointer transition-colors ${
                  isOpen ? "bg-[#2b2230] border-[var(--border-prominent)]" : "active:bg-[#211a26]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#17131b] flex items-center justify-center shrink-0">
                      {getIcon(card.iconName)}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#f0eaf0]">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-[#b7aabf]">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#82738a] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#b995b8]" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-[#b7aabf] leading-relaxed pt-2.5 mt-2.5 border-t border-[var(--border-subtle)] font-light">
                        {card.deep}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
