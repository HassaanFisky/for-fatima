"use client";

import React, { useState, useEffect } from "react";
import DynamicIsland from "./components/DynamicIsland";
import AppleDock, { TabId } from "./components/AppleDock";
import StoryTab from "./components/StoryTab";
import DetailsTab from "./components/DetailsTab";
import TruthTab from "./components/TruthTab";
import SmileTab from "./components/SmileTab";
import ConstellationTab from "./components/ConstellationTab";

function getKarachiTime() {
  if (typeof window === "undefined") return "Karachi • Calm Hours";
  const hrs = new Date().getHours();
  if (hrs >= 1 && hrs < 6) {
    return "Karachi • 3 AM Stillness";
  } else if (hrs >= 6 && hrs < 12) {
    return "Karachi • Morning Light";
  } else if (hrs >= 12 && hrs < 18) {
    return "Karachi • Afternoon Peace";
  } else {
    return "Karachi • Evening Stillness";
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("story");
  const [timeGreeting, setTimeGreeting] = useState(getKarachiTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeGreeting(getKarachiTime());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans relative overflow-x-hidden pb-24 sm:pb-28">
      {/* ─── Top Luxury Header ─── */}
      <DynamicIsland timeGreeting={timeGreeting} />

      {/* ─── Mobile-First Editorial Container ─── */}
      <main className="relative z-10 w-full max-w-[420px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4 box-border">
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="focus:outline-none w-full"
        >
          {activeTab === "story" && <StoryTab />}
          {activeTab === "details" && <DetailsTab />}
          {activeTab === "truth" && <TruthTab />}
          {activeTab === "smile" && <SmileTab />}
          {activeTab === "stars" && <ConstellationTab />}
        </div>

        {/* Discreet Micro-Footer */}
        <footer className="pt-8 pb-3 text-center space-y-1">
          <p className="font-serif italic text-xs text-[#857896]">
            Crafted for Fatima Kamran • With quiet patience & care
          </p>
          <p className="text-[9px] uppercase font-mono tracking-widest text-[#564966]">
            Quiet Luxury • Private Gift
          </p>
        </footer>
      </main>

      {/* ─── Editorial Bottom Navigation ─── */}
      <AppleDock activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
