import type { Variants, Transition } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0.94, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export interface SceneTitleCadence {
  container: Variants;
  kicker: Variants;
  heading: Variants;
  subtitle: Variants;
}

interface TitleCadenceSpec {
  y: number;
  duration: number;
  stagger: number;
  delay: number;
  ease: [number, number, number, number];
}

const TITLE_CADENCES: readonly TitleCadenceSpec[] = [
  { y: 10, duration: 0.62, stagger: 0.08, delay: 0.04, ease: [0.16, 1, 0.3, 1] },
  { y: 7, duration: 0.48, stagger: 0.06, delay: 0.05, ease: [0.25, 0.95, 0.35, 1] },
  { y: 12, duration: 0.56, stagger: 0.09, delay: 0.03, ease: [0.2, 0.9, 0.3, 1] },
  { y: 8, duration: 0.52, stagger: 0.07, delay: 0.06, ease: [0.22, 1, 0.36, 1] },
  { y: 11, duration: 0.64, stagger: 0.1, delay: 0.04, ease: [0.18, 0.96, 0.32, 1] },
  { y: 6, duration: 0.58, stagger: 0.08, delay: 0.07, ease: [0.24, 0.92, 0.38, 1] },
  { y: 9, duration: 0.5, stagger: 0.06, delay: 0.04, ease: [0.19, 1, 0.28, 1] },
  { y: 10, duration: 0.66, stagger: 0.09, delay: 0.05, ease: [0.16, 0.98, 0.3, 1] },
];

/**
 * Returns scene-specific title entrance variants so each scene's heading,
 * kicker, and subtitle enter with their own distinct cadence, timing, and easing rhythm.
 */
export function getTitleCadenceVariants(sceneIndex: number): SceneTitleCadence {
  const spec = TITLE_CADENCES[Math.abs(sceneIndex) % TITLE_CADENCES.length];
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: spec.delay,
          staggerChildren: spec.stagger,
        },
      },
    },
    kicker: {
      hidden: { opacity: 0, y: Math.max(4, spec.y - 3) },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: Math.max(0.36, spec.duration - 0.1),
          ease: spec.ease,
        },
      },
    },
    heading: {
      hidden: { opacity: 0, y: spec.y },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: spec.duration,
          ease: spec.ease,
        },
      },
    },
    subtitle: {
      hidden: { opacity: 0, y: Math.max(5, spec.y - 2) },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: spec.duration,
          ease: spec.ease,
        },
      },
    },
  };
}

export const breatheTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

export const floatSoftTransition: Transition = {
  duration: 5,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

export const tapPress = {
  scale: 0.97,
  transition: { duration: 0.12 },
};

export const bloomSpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 14,
};
