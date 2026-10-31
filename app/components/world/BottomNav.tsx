"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Sparkles, Flower2, Star, Gift } from "lucide-react";
import { useLivingWorld } from "./LivingWorldProvider";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "story", label: "Story", icon: BookOpen },
  { id: "keepsakes", label: "Keepsakes", icon: Sparkles },
  { id: "flowers", label: "Flowers", icon: Flower2 },
  { id: "stars", label: "Stars", icon: Star },
  { id: "gift", label: "Gift", icon: Gift },
];

export function BottomNav() {
  const { constellationFocused, playNote } = useLivingWorld();
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("story");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const threshold = Math.max(240, window.innerHeight * 0.45);
      setVisible(y > threshold);

      // Determine active section by scroll position
      let current = "story";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.48) {
            current = item.id;
          }
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, index: number) => {
    playNote(index);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  const isShown = visible && !constellationFocused;

  return (
    <nav
      aria-label="Chapter bookmark navigation"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
      }}
      className={`fixed inset-x-0 z-30 flex justify-center px-4 pointer-events-none transition-all duration-500 ${
        isShown
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      <div className="pointer-events-auto inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full nav-frosted-bookmark">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id, idx)}
              aria-current={isActive ? "location" : undefined}
              className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[44px] px-2.5 py-1 rounded-full transition-transform active:scale-95"
              style={{
                color: isActive
                  ? "var(--color-royal-violet)"
                  : "var(--color-ink-muted)",
              }}
            >
              <Icon className="w-4 h-4 mb-0.5" aria-hidden="true" />
              <span className="text-[11px] font-semibold leading-none tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="mt-0.5 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-butter-star)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
