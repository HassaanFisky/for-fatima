"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans relative overflow-x-hidden selection:bg-[#7050b8]/40 selection:text-[#f5f0f8]">
      {/* ─── Apple Liquid Ambient Refraction Blobs ─── */}
      <div className="liquid-orb-1" aria-hidden="true" />
      <div className="liquid-orb-2" aria-hidden="true" />

      {/* ─── Top Apple Glass Dynamic Island ─── */}
      <DynamicIsland timeGreeting={timeGreeting} />

      {/* ─── Mobile-First Glassmorphic Container ─── */}
      <main className="relative z-10 w-full max-w-[420px] mx-auto px-3 sm:px-4 pt-3 sm:pt-4 box-border">
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="focus:outline-none w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
                mass: 0.7,
              }}
              className="w-full"
            >
              {activeTab === "story" && <StoryTab />}
              {activeTab === "details" && <DetailsTab />}
              {activeTab === "truth" && <TruthTab />}
              {activeTab === "smile" && <SmileTab />}
              {activeTab === "stars" && <ConstellationTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Discreet Micro-Footer */}
        <footer className="pt-8 pb-3 text-center space-y-1">
          <p className="font-serif italic text-xs text-[#857896]">
            Crafted for Fatima Kamran • With quiet patience & care
          </p>
        </footer>
      </main>

      {/* ─── Apple Frosted Liquid Dock ─── */}
      <AppleDock activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
