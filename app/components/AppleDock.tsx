"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Layers, ShieldCheck, Heart, Moon } from "lucide-react";
import { audioEngine } from "../lib/sound";

export type TabId = "story" | "details" | "truth" | "smile" | "stars";

interface AppleDockProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function AppleDock({ activeTab, onTabChange }: AppleDockProps) {
  const tabs = [
    { id: "story" as TabId, label: "Letter", icon: BookOpen },
    { id: "details" as TabId, label: "Keepsakes", icon: Layers },
    { id: "truth" as TabId, label: "Truth", icon: ShieldCheck },
    { id: "smile" as TabId, label: "Comforts", icon: Heart },
    { id: "stars" as TabId, label: "Closing", icon: Moon },
  ];

  return (
    <nav 
      aria-label="Editorial chapters navigation" 
      className="fixed bottom-0 inset-x-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom,0px),10px)] pt-2 flex justify-center pointer-events-auto"
    >
      <div 
        role="tablist" 
        aria-label="Gift chapters"
        className="luxury-dock rounded-full p-1.5 flex items-center justify-between max-w-[400px] w-full relative"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              key={tab.id}
              onClick={() => {
                audioEngine.playHaptic(active ? 660 : 540);
                onTabChange(tab.id);
              }}
              className="relative flex-1 py-1.5 px-0.5 rounded-full flex flex-col items-center justify-center min-w-0 transition-transform active:scale-95 duration-150 touch-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9878d1]"
            >
              {/* Apple Sliding Liquid Spring Pill */}
              {active && (
                <motion.div
                  layoutId="appleDockActivePill"
                  className="absolute inset-0 bg-gradient-to-b from-[#7e58cf] to-[#603eb0] rounded-full shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.28),0_4px_16px_rgba(112,80,184,0.45)] border border-[rgba(214,198,245,0.3)]"
                  transition={{
                    type: "spring",
                    stiffness: 480,
                    damping: 32,
                    mass: 0.8,
                  }}
                />
              )}

              <Icon
                className={`w-3.5 h-3.5 shrink-0 z-10 transition-colors duration-200 ${
                  active ? "text-[#f5f0f8]" : "text-[#857896] hover:text-[#b8adc6]"
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-[9px] font-medium tracking-tight truncate w-full text-center mt-0.5 z-10 transition-colors duration-200 ${
                  active ? "text-[#f5f0f8] font-semibold" : "text-[#857896]"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
