"use client";

import React from "react";
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
    { id: "stars" as TabId, label: "Stars", icon: Star },
  ];

  return (
    <nav className="fixed bottom-2.5 sm:bottom-4 inset-x-0 z-50 px-3 flex justify-center pointer-events-auto">
      <div className="ios-dock rounded-full p-1 shadow-xl flex items-center justify-between max-w-[420px] w-full">
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
              className={`flex-1 py-1.5 px-1 rounded-full flex flex-col items-center justify-center gap-0.5 transition-colors touch-target ${
                active
                  ? "bg-[#362c3d] text-[#f0eaf0]"
                  : "text-[#82738a] hover:text-[#b7aabf]"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-[#b995b8]" : ""}`} />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
