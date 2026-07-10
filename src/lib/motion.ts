import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard rise-in reveal for blocks of content. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Stagger container for lists of revealed children. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

/** Child used inside a stagger container. */
export const revealChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
