"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  LivingWorldProvider,
  useLivingWorld,
} from "./components/world/LivingWorldProvider";
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
import { QuietSkySection } from "./components/sections/QuietSkySection";
import { ConstellationSection } from "./components/sections/ConstellationSection";
import { ClosingSection } from "./components/sections/ClosingSection";
import { STORY_SCENES } from "./config/personal";

const SCENE_STORAGE_KEY = "konpeito-active-scene-v2";

function StorybookDeck() {
  const { playNote, reducedMotion } = useLivingWorld();
  const [activeScene, setActiveScene] = useState<number>(0);
  const mainStageRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; noSwipe: boolean } | null>(
    null
  );

  // Restore saved scene index on mount (or allow ?scene=0..7 query param for quick inspection)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramScene = params.get("scene");
    if (paramScene !== null) {
      const parsed = Number.parseInt(paramScene, 10);
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed < STORY_SCENES.length) {
        const timer = window.setTimeout(() => setActiveScene(parsed), 0);
        return () => window.clearTimeout(timer);
      }
    }

    try {
      const saved = window.sessionStorage.getItem(SCENE_STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number.parseInt(saved, 10);
        if (
          !Number.isNaN(parsed) &&
          parsed >= 0 &&
          parsed < STORY_SCENES.length
        ) {
          const timer = window.setTimeout(() => setActiveScene(parsed), 0);
          return () => window.clearTimeout(timer);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const goToScene = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(
        0,
        Math.min(STORY_SCENES.length - 1, nextIndex)
      );
      setActiveScene((prev) => {
        if (prev !== clamped) {
          playNote(clamped);
          try {
            window.sessionStorage.setItem(SCENE_STORAGE_KEY, String(clamped));
          } catch {
            // Ignore storage errors
          }
        }
        return clamped;
      });
    },
    [playNote]
  );

  const handlePrev = useCallback(() => {
    goToScene(activeScene - 1);
  }, [activeScene, goToScene]);

  const handleNext = useCallback(() => {
    goToScene(activeScene + 1);
  }, [activeScene, goToScene]);

  // Manage focus & scroll top when activeScene changes
  useEffect(() => {
    mainStageRef.current?.focus({ preventScroll: true });
  }, [activeScene]);

  // Desktop keyboard navigation (ArrowLeft, ArrowRight, Home, End)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToScene(activeScene + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToScene(activeScene - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToScene(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToScene(STORY_SCENES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScene, goToScene]);

  // Optional horizontal touch swipe outside interactive canvas regions
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement | null;
    const noSwipe = Boolean(target?.closest?.('[data-no-swipe="true"]'));
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      noSwipe,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || start.noSwipe || e.changedTouches.length !== 1) return;

    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;

    // Require a deliberate horizontal swipe (> 64px) that is markedly more horizontal than vertical
    if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const currentSceneMeta = STORY_SCENES[activeScene] ?? STORY_SCENES[0];

  const renderSceneSlot = (index: number, child: React.ReactNode) => {
    const isActive = activeScene === index;
    const offset = index - activeScene;

    return (
      <div
        key={STORY_SCENES[index].id}
        role="tabpanel"
        aria-label={`Scene ${index + 1} of ${STORY_SCENES.length}: ${STORY_SCENES[index].title}`}
        aria-hidden={!isActive}
        inert={!isActive ? true : undefined}
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 64px)",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 74px)",
          transition: reducedMotion
            ? "none"
            : "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: isActive ? 1 : 0,
          visibility: isActive ? "visible" : "hidden",
          transform: reducedMotion
            ? "none"
            : isActive
              ? "translate3d(0, 0, 0) scale(1)"
              : offset > 0
                ? "translate3d(24px, 0, 0) scale(0.985)"
                : "translate3d(-24px, 0, 0) scale(0.985)",
          pointerEvents: isActive ? "auto" : "none",
        }}
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scene-scroll-container [&>section]:!h-auto [&>section]:min-h-full"
      >
        {child}
      </div>
    );
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden select-none">
      {/* Layer 0: Living Karachi Sky Backdrop (SunCalc sky, upper clouds, distant lavender hills, moon, sun, 36 seeded stars) */}
      <SkyBackdrop />

      {/* Layer 1: Restrained Storybook Bubbles & Sakura Petals */}
      <BubbleField />
      <SakuraField />

      {/* Layer 2: Top Identity Mark, Scene Counter & Persistent Audio Mute/Unmute Toggle */}
      <WorldControls activeScene={activeScene} />

      {/* Layer 3: Controlled 8-Scene Storybook Deck (All scenes stay mounted to preserve user interactions) */}
      <main
        ref={mainStageRef}
        tabIndex={-1}
        aria-live="polite"
        aria-label={`Storybook stage — ${currentSceneMeta.title}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 w-full h-full overflow-hidden focus:outline-none"
      >
        {renderSceneSlot(0, <OpeningSection onContinue={handleNext} />)}
        {renderSceneSlot(1, <StorySection />)}
        {renderSceneSlot(2, <NotesSection />)}
        {renderSceneSlot(3, <KeepsakesSection />)}
        {renderSceneSlot(4, <FlowersSection />)}
        {renderSceneSlot(5, <QuietSkySection isActive={activeScene === 5} />)}
        {renderSceneSlot(
          6,
          <ConstellationSection isActive={activeScene === 6} />
        )}
        {renderSceneSlot(
          7,
          <ClosingSection onReturnToStart={() => goToScene(0)} />
        )}
      </main>

      {/* Layer 4: Controlled Scene Deck Bar (Previous / 8-Scene Progress Dots / Next) */}
      <BottomNav
        activeScene={activeScene}
        onSelectScene={goToScene}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}

export default function Home() {
  return (
    <LivingWorldProvider>
      <StorybookDeck />
    </LivingWorldProvider>
  );
}
