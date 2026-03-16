import type { Variants } from 'framer-motion';

// ─── Easing ───────────────────────────────────────────────────────────────────
export const ease = [0.22, 1, 0.36, 1] as const;

// ─── Fade Up — standard section entrance ─────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

// ─── Fade In — pure opacity ───────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

// ─── Stagger Container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

// ─── Scale Fade — for decorative blobs ───────────────────────────────────────
export const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease },
  },
};

// ─── Slide from Start (right in RTL) ─────────────────────────────────────────
export const slideFromStart: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease },
  },
};

// ─── Slide from End (left in RTL) ────────────────────────────────────────────
export const slideFromEnd: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease },
  },
};

// ─── Card Hover (for motion.div whileHover) ───────────────────────────────────
export const cardHoverVariant: Variants = {
  rest: { y: 0 },
  hover: { y: -5, transition: { duration: 0.35, ease } },
};

// ─── Viewport options ─────────────────────────────────────────────────────────
export const viewportOnce = { once: true, margin: '-80px' } as const;
