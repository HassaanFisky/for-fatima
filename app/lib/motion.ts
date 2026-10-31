import type { Variants, Transition } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
