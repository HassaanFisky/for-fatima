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
    <div className="min-h-screen bg-[#09060f] text-[#f5f3f9] font-sans selection:bg-purple-900/60 selection:text-purple-200 relative overflow-x-hidden pb-32">
      {/* ─── Apple Deep Obsidian Ambient Orbs (Zero Glare, Pure Luxury) ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="ambient-glow-1 absolute -top-40 -left-20 w-[450px] h-[450px] rounded-full bg-purple-900/20 blur-[110px]" />
        <div className="ambient-glow-2 absolute top-1/3 -right-32 w-[420px] h-[420px] rounded-full bg-pink-900/15 blur-[120px]" />
        <div className="ambient-glow-1 absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-950/25 blur-[130px]" />
      </div>

      {/* ─── Top Apple Dynamic Island Pill ─── */}
      <DynamicIsland timeGreeting={timeGreeting} />

      {/* ─── Main Content Canvas ─── */}
      <main className="relative z-10 max-w-md mx-auto px-4 pt-4 sm:pt-6">
        <AnimatePresence mode="wait">
          {activeTab === "story" && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <StoryTab />
            </motion.div>
          )}

          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <DetailsTab />
            </motion.div>
          )}

          {activeTab === "truth" && (
            <motion.div
              key="truth"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <TruthTab />
            </motion.div>
          )}

          {activeTab === "smile" && (
            <motion.div
              key="smile"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <SmileTab />
            </motion.div>
          )}

          {activeTab === "stars" && (
            <motion.div
              key="stars"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <ConstellationTab />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discreet Micro-Footer */}
        <footer className="pt-10 pb-4 text-center space-y-1">
          <p className="font-serif italic text-xs text-[#746788]">
            Crafted specifically for Fatima Kamran • Pure care, zero pressure
          </p>
          <p className="text-[10px] text-[#554a66]">
            iOS 18 Native Experience • Web Audio Haptics
          </p>
        </footer>
      </main>

      {/* ─── Apple Glass Bottom Dock ─── */}
      <AppleDock activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
