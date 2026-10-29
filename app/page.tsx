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
  if (typeof window === "undefined") return "Karachi • Calm Hours 💜";
  const hrs = new Date().getHours();
  if (hrs >= 1 && hrs < 6) {
    return "Karachi • 3 AM Quiet Hours 🌙";
  } else if (hrs >= 6 && hrs < 12) {
    return "Karachi • Morning Light ☀️";
  } else if (hrs >= 12 && hrs < 18) {
    return "Karachi • Afternoon Calm 🌸";
  } else {
    return "Karachi • Evening Peace 💜";
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
    <div className="min-h-screen bg-[#17131b] text-[#f0eaf0] font-sans selection:bg-[#362c3d] selection:text-[#f0eaf0] relative overflow-x-hidden pb-28 sm:pb-32">
      {/* ─── Top Dynamic Island Header ─── */}
      <DynamicIsland timeGreeting={timeGreeting} />

      {/* ─── Mobile-First Main Content Container ─── */}
      <main className="relative z-10 max-w-[420px] mx-auto px-3.5 sm:px-4 pt-3 sm:pt-5">
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="focus:outline-none"
        >
          {activeTab === "story" && <StoryTab />}
          {activeTab === "details" && <DetailsTab />}
          {activeTab === "truth" && <TruthTab />}
          {activeTab === "smile" && <SmileTab />}
          {activeTab === "stars" && <ConstellationTab />}
        </div>

        {/* Discreet Micro-Footer */}
        <footer className="pt-8 pb-3 text-center space-y-0.5">
          <p className="font-serif italic text-[11px] text-[#82738a]">
            Crafted specifically for Fatima Kamran • Pure care, zero pressure
          </p>
          <p className="text-[9px] text-[#594d61]">
            iOS Native Standards • Web Audio Haptics
          </p>
        </footer>
      </main>

      {/* ─── Apple Glass Bottom Dock ─── */}
      <AppleDock activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
