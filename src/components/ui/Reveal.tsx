import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}

/** A single block that rises and fades in once, when scrolled into view. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}
