"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, ShieldCheck, Heart, Star } from "lucide-react";
import { audioEngine } from "../lib/sound";

export type TabId = "story" | "details" | "truth" | "smile" | "stars";

interface AppleDockProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function AppleDock({ activeTab, onTabChange }: AppleDockProps) {
  const tabs = [
    { id: "story" as TabId, label: "Story", icon: Sparkles },
    { id: "details" as TabId, label: "Notes", icon: Layers },
    { id: "truth" as TabId, label: "Truth", icon: ShieldCheck },
    { id: "smile" as TabId, label: "Smile", icon: Heart },
    { id: "stars" as TabId, label: "Constellation", icon: Star },
  ];

  return (
    <nav className="fixed bottom-4 inset-x-0 z-50 px-4 flex justify-center pointer-events-auto">
      <div className="apple-glass-dock rounded-full p-1.5 shadow-2xl flex items-center justify-between max-w-md w-full border border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => {
                audioEngine.playHaptic(active ? 660 : 540);
                onTabChange(tab.id);
              }}
              className={`flex-1 py-2 px-1 rounded-full flex flex-col items-center gap-0.5 transition-all duration-200 relative ${
                active ? "text-white" : "text-[#8e81a3] hover:text-[#d3c7e4]"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="activeDockIndicator"
                  className="absolute inset-0 rounded-full bg-white/15 border border-white/10 -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 ${active ? "text-purple-300" : ""}`} />
              <span className="text-[10px] font-semibold tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
