"use client";

import React from "react";
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
      className="fixed bottom-2 sm:bottom-3.5 inset-x-0 z-50 px-2 sm:px-3 flex justify-center pointer-events-auto"
    >
      <div 
        role="tablist" 
        aria-label="Gift chapters"
        className="luxury-dock rounded-full p-1 flex items-center justify-between max-w-[400px] w-full"
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
              className={`flex-1 py-1.5 px-0.5 rounded-full flex flex-col items-center justify-center min-w-0 transition-all touch-target ${
                active
                  ? "bg-[#7050b8] text-[#f4eff8] shadow-[0_2px_12px_rgba(112,80,184,0.4)]"
                  : "text-[#857896] hover:text-[#b8adc6]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="text-[9px] font-medium tracking-tight truncate w-full text-center mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
