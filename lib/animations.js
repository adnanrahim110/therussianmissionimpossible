// Spring / transition presets
export const springPreset = { type: "spring", stiffness: 300, damping: 30 };
export const smoothPreset = { type: "spring", stiffness: 100, damping: 20 };
export const slowPreset = { duration: 1.2, ease: [0.22, 1, 0.36, 1] };

// Reduced-motion wrapper — returns static variants if user prefers reduced motion
export function safeVariants(variants, prefersReducedMotion) {
  if (prefersReducedMotion) {
    const safe = {};
    for (const key of Object.keys(variants)) {
      safe[key] = { opacity: 1 };
    }
    return safe;
  }
  return variants;
}

// Cascade parent / child — spring stagger with rotateX entrance
export const cascadeParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const cascadeChild = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};

// Clip-path reveal — bottom to top
export const clipReveal = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Clip-path reveal — left to right
export const clipRevealLeft = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Wipe-in — scaleX 0→1 for lines/dividers
export const wipeIn = {
  hidden: { scaleX: 0, originX: 0.5 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// 3D card entrance — rotateY + rotateX + scale
export const card3DEntrance = {
  hidden: {
    opacity: 0,
    rotateY: 15,
    rotateX: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

// Cinematic page wipe — clip-path page transitions
export const pageWipe = {
  initial: {
    clipPath: "inset(100% 0 0 0)",
  },
  animate: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Fade-up with spring physics (replacement for generic fade-up)
export const fadeUpSpring = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};

// Scale entrance
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

// Rotate entrance
export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: -5,
    y: 20,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
    },
  },
};
