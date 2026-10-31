"use client";

import { useEffect, useState } from "react";

export interface PageActivity {
  visible: boolean;
  reducedMotion: boolean;
  resyncToken: number;
}

export function usePageActivity(): PageActivity {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resyncToken, setResyncToken] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotion = () => {
      setReducedMotion(media.matches);
    };

    const updateVisibility = () => {
      const nextVisible = document.visibilityState === "visible";
      setVisible(nextVisible);
      if (nextVisible) {
        setResyncToken((value) => value + 1);
      }
    };

    const handlePageShow = () => {
      setVisible(true);
      setResyncToken((value) => value + 1);
    };

    updateMotion();
    updateVisibility();

    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return {
    visible,
    reducedMotion,
    resyncToken,
  };
}
