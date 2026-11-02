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
      className="fixed bottom-0 inset-x-0 z-30 flex justify-center px-3 sm:px-6 pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-[36rem] flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-full nav-frosted-bookmark">
        {/* Previous Scene Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous scene"
          className={`inline-flex items-center gap-1 rounded-full px-3 min-h-[42px] text-xs font-semibold transition-all active:scale-95 ${
            isFirst
              ? "opacity-35 cursor-not-allowed"
              : "hover:bg-[var(--color-paper-lavender)]"
          }`}
          style={{ color: "var(--color-ink-plum)" }}
        >
          <IconChevronLeft size={17} />
          <span className="hidden xs:inline sm:inline">Previous</span>
        </button>

        {/* Interactive 8-Scene Progress Dots */}
        <div
          role="tablist"
          aria-label="Storybook scenes"
          className="flex items-center justify-center gap-1 sm:gap-1.5 px-1"
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
                className="group relative flex items-center justify-center py-2.5 px-1 focus:outline-none"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "w-6 h-2"
                      : "w-2 h-2 group-hover:scale-125"
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? "var(--color-royal-violet)"
                      : isVisited
                        ? "var(--color-amethyst-dream)"
                        : "var(--color-paper-border)",
                  }}
                />
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
            className="inline-flex items-center gap-1 rounded-full px-3.5 min-h-[42px] text-xs font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: "var(--color-royal-violet)",
              color: "var(--color-paper-cream)",
            }}
          >
            <span>Next</span>
            <IconChevronRight size={17} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onSelectScene(0)}
            aria-label="Return to the beginning"
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 min-h-[42px] text-xs font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: "var(--color-paper-lavender)",
              color: "var(--color-royal-violet)",
            }}
          >
            <IconRestart size={15} />
            <span>Beginning</span>
          </button>
        )}
      </div>
    </nav>
  );
}
