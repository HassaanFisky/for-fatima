"use client";

import React from "react";
import { LivingWorldProvider } from "./components/world/LivingWorldProvider";
import { SkyBackdrop } from "./components/world/SkyBackdrop";
import { BubbleField } from "./components/world/BubbleField";
import { SakuraField } from "./components/world/SakuraField";
import { WorldControls } from "./components/world/WorldControls";
import { BottomNav } from "./components/world/BottomNav";
import { OpeningSection } from "./components/sections/OpeningSection";
import { StorySection } from "./components/sections/StorySection";
import { NotesSection } from "./components/sections/NotesSection";
import { KeepsakesSection } from "./components/sections/KeepsakesSection";
import { FlowersSection } from "./components/sections/FlowersSection";
import { ConstellationSection } from "./components/sections/ConstellationSection";
import { GiftSection } from "./components/sections/GiftSection";
import { ClosingSection } from "./components/sections/ClosingSection";

export default function Home() {
  return (
    <LivingWorldProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Layer 0: Living Sky Backdrop (SunCalc sky, clouds, moon, sun, 36 seeded stars) */}
        <SkyBackdrop />

        {/* Layer 1: Edge-positioned Storybook Bubbles & Sakura Petals */}
        <BubbleField />
        <SakuraField />

        {/* Layer 2: Top Sky Status / Location Invitation & Paper Audio Toggle */}
        <WorldControls />

        {/* Layer 3: Scrollable Storybook Paper Narrative */}
        <main className="relative z-10">
          <OpeningSection />
          <StorySection />
          <NotesSection />
          <KeepsakesSection />
          <FlowersSection />
          <ConstellationSection />
          <GiftSection />
          <ClosingSection />
        </main>

        {/* Layer 4: Floating Paper Bookmark Bar */}
        <BottomNav />
      </div>
    </LivingWorldProvider>
  );
}
