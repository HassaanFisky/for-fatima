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
        return <Ear className="w-5 h-5 text-purple-300" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-purple-300" />;
      default:
        return <Compass className="w-5 h-5 text-purple-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-400/20">
          Chapter 02 • Sincere Accountability
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-[#f5f3f9]">
          The Apology I Should Have Expressed Better
        </h2>
      </div>

      {/* ─── Exact Documented Apology Letter ─── */}
      <div className="apple-glass-card rounded-[32px] p-7 sm:p-9 text-left space-y-4 border border-purple-400/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500/40 via-purple-400 to-pink-500/40" />

        <div className="space-y-4 font-serif text-sm sm:text-base text-[#e0d8ec] leading-relaxed">
          <p>
            Fatima, I know there were moments when I didn&apos;t handle things the way I should have.
          </p>
          <p>
            I sometimes let my emotions take over instead of listening properly. I pushed conversations when I should have given you space, and there were times I didn&apos;t respect your boundaries the way I needed to.
          </p>
          <p className="font-semibold text-purple-200">
            I&apos;m sorry for that.
          </p>
          <p>
            You deserved to have your words heard without having to repeat yourself.
          </p>
          <p>
            I can&apos;t ask you to trust me just because I say the right things. Trust takes time, consistency, and actions.
          </p>
          <p className="text-purple-300 font-medium">
            I&apos;m working on understanding that better.
          </p>
          <p className="text-xs text-[#8e81a3] italic pt-2 border-t border-white/10">
            You don&apos;t owe me forgiveness, a reply, or another chance. I simply wanted to acknowledge my part honestly.
          </p>
        </div>
      </div>

      {/* ─── Chapter 03: The Things That Matter ─── */}
      <div className="space-y-3 pt-2">
        <div className="text-left px-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
            Core Principles
          </span>
          <h3 className="text-xl font-bold text-[#f5f3f9]">
            The Things That Matter
          </h3>
          <p className="text-xs text-[#ad9fc0]">
            Tap any card to see the reflection underneath.
          </p>
        </div>

        <div className="space-y-3">
          {MATTER_CARDS.map((card) => {
            const isOpen = expandedId === card.id;
            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => toggleExpand(card.id)}
                className={`apple-glass-card rounded-2xl p-5 cursor-pointer transition-all border ${
                  isOpen
                    ? "border-purple-400/40 shadow-lg shadow-purple-900/10"
                    : "hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                      {getIcon(card.iconName)}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#f5f3f9]">
                        {card.title}
                      </h4>
                      <p className="text-xs text-purple-300 font-medium">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8e81a3] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-purple-300" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-[#b8afc4] leading-relaxed pt-3 mt-3 border-t border-white/10 font-light">
                        {card.deep}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
