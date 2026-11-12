"use client";

import React from "react";
import { STORY_SCENES } from "../../config/personal";
import {
  IconChevronLeft,
  IconChevronRight,
  IconRestart,
} from "../icons/StoryIcons";

interface BottomNavProps {
  activeScene: number;
  onSelectScene: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function BottomNav({
  activeScene,
  onSelectScene,
  onPrev,
  onNext,
}: BottomNavProps) {
  const total = STORY_SCENES.length;
  const isFirst = activeScene <= 0;
  const isLast = activeScene >= total - 1;
  const nextSceneMeta = !isLast ? STORY_SCENES[activeScene + 1] : null;

  return (
    <nav
      aria-label="Storybook scene navigation"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
      }}
      className="fixed bottom-0 inset-x-0 z-30 flex justify-center px-2.5 sm:px-6 pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-[36rem] flex items-center justify-between gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-full nav-frosted-bookmark">
        {/* Previous Scene Button (High Contrast Enabled/Disabled States) */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous scene"
          className={`inline-flex items-center gap-1 rounded-full px-2.5 sm:px-3.5 min-h-[40px] sm:min-h-[42px] text-xs font-bold transition-all active:scale-95 shrink-0 ${
            isFirst
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer hover:brightness-95 shadow-xs"
          }`}
          style={{
            backgroundColor: isFirst ? "transparent" : "#EFE6FF",
            border: isFirst
              ? "1px solid rgba(107, 98, 138, 0.28)"
              : "1px solid #B79CED",
            color: "var(--color-ink-plum)",
          }}
        >
          <IconChevronLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Interactive 8-Scene Progress Indicators (Unmistakable Active, Visited, and Unvisited Contrast) */}
        <div
          role="tablist"
          aria-label="Storybook scenes"
          className="flex items-center justify-center gap-1 sm:gap-2 px-0.5"
        >
          {STORY_SCENES.map((scene) => {
            const isCurrent = scene.index === activeScene;
            const isVisited = scene.index < activeScene;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Scene ${scene.index + 1}: ${scene.title}`}
                title={`${scene.index + 1}. ${scene.title}`}
                onClick={() => onSelectScene(scene.index)}
                className="group relative flex items-center justify-center py-2 px-0.5 sm:px-1 cursor-pointer focus:outline-none"
              >
                <span
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "w-5 h-2.5 sm:w-7 sm:h-3 shadow-xs"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:scale-125"
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? "#5E3FB8"
                      : isVisited
                        ? "#8A6BE0"
                        : "#DDD0F7",
                    border: isCurrent
                      ? "1.5px solid #2E2452"
                      : isVisited
                        ? "1px solid #5E3FB8"
                        : "1.5px solid #7C69B4",
                  }}
                >
                  {isCurrent && (
                    <span
                      className="block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
                      style={{ backgroundColor: "var(--color-paper-cream)" }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Scene / Return to Beginning Button */}
        {!isLast ? (
          <button
            type="button"
            onClick={onNext}
            aria-label={
              nextSceneMeta
                ? `Next scene: ${nextSceneMeta.title}`
                : "Next scene"
            }
            className="inline-flex items-center gap-1 rounded-full px-3 sm:px-4 min-h-[40px] sm:min-h-[42px] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs shrink-0"
            style={{
              backgroundColor: "var(--color-royal-violet)",
              border: "1px solid #2E2452",
              color: "var(--color-paper-cream)",
            }}
          >
            <span>Next</span>
            <IconChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSelectScene(0)}
            aria-label="Return to the beginning"
            className="inline-flex items-center gap-1 rounded-full px-3 sm:px-3.5 min-h-[40px] sm:min-h-[42px] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs shrink-0"
            style={{
              backgroundColor: "#EFE6FF",
              border: "1px solid #5E3FB8",
              color: "var(--color-royal-violet)",
            }}
          >
            <IconRestart size={15} />
            <span>Start</span>
          </button>
        )}
      </div>
    </nav>
  );
}
