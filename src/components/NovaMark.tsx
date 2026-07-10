import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { EASE } from "../lib/motion";

interface NovaMarkProps {
  progress?: MotionValue<number>;
  className?: string;
}

function planePoints(cx: number, cy: number, w: number, h: number) {
  return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
}

const STAR_PATH =
  "M180,86 L196,172 L256,190 L196,208 L180,250 L164,208 L104,190 L164,172 Z";

const planeSpring = { type: "spring", stiffness: 120, damping: 18 } as const;

export default function NovaMark({ progress, className }: NovaMarkProps) {
  const zero = useMotionValue(0);
  const p = progress ?? zero;
  const planeShift = useTransform(p, [0, 1], [0, 48]);
  const planeShiftMid = useTransform(p, [0, 1], [0, 30]);
  const planeShiftTop = useTransform(p, [0, 1], [0, 14]);
  const starShift = useTransform(p, [0, 1], [0, -64]);
  const haloScale = useTransform(p, [0, 1], [1, 1.25]);
  const haloOpacity = useTransform(p, [0, 1], [0.9, 0.2]);

  return (
    <svg
      viewBox="0 0 360 400"
      className={className}
      role="img"
      aria-label="NovaStack"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nm-star" x1="120" y1="90" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFE0FB" />
          <stop offset="0.45" stopColor="#68A1EB" />
          <stop offset="1" stopColor="#3A74CC" />
        </linearGradient>
        <linearGradient id="nm-star-r" x1="180" y1="86" x2="220" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9DC2F4" />
          <stop offset="1" stopColor="#2D5DA9" />
        </linearGradient>
        {/* Soft glint along the centre ridge — fades in from the tip, peaks
            just below it, then dissolves toward the base. */}
        <linearGradient id="nm-ridge" x1="180" y1="86" x2="180" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.24" stopColor="#F4F8FF" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#CFE0FB" stopOpacity="0.28" />
          <stop offset="1" stopColor="#9DC2F4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nm-p1" x1="60" y1="220" x2="300" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4D85D6" />
          <stop offset="1" stopColor="#2D5DA9" />
        </linearGradient>
        <linearGradient id="nm-p2" x1="60" y1="250" x2="300" y2="310" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#27488f" />
          <stop offset="1" stopColor="#16306f" />
        </linearGradient>
        <linearGradient id="nm-p3" x1="60" y1="290" x2="300" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#13265f" />
          <stop offset="1" stopColor="#09173f" />
        </linearGradient>
        <radialGradient id="nm-halo" cx="0.5" cy="0.42" r="0.5">
          <stop offset="0" stopColor="#88BBEF" stopOpacity="0.72" />
          <stop offset="0.3" stopColor="#68A1EB" stopOpacity="0.42" />
          <stop offset="0.6" stopColor="#3A74CC" stopOpacity="0.14" />
          <stop offset="1" stopColor="#3A74CC" stopOpacity="0" />
        </radialGradient>
        <filter id="nm-halo-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="32" />
        </filter>
        <filter id="nm-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Luminous halo */}
      <motion.ellipse
        cx="180" cy="196" rx="160" ry="160"
        fill="url(#nm-halo)"
        filter="url(#nm-halo-blur)"
        style={{ scale: haloScale, opacity: haloOpacity, transformOrigin: "180px 196px" }}
      />

      {/* Stacked planes — assemble bottom-up */}
      <motion.g style={{ y: planeShift }}>
        <motion.polygon
          points={planePoints(180, 312, 122, 40)}
          fill="url(#nm-p3)"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...planeSpring, delay: 0.05 }}
        />
      </motion.g>
      <motion.g style={{ y: planeShiftMid }}>
        <motion.polygon
          points={planePoints(180, 280, 118, 38)}
          fill="url(#nm-p2)"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...planeSpring, delay: 0.16 }}
          stroke="rgba(150,188,246,0.18)"
          strokeWidth="1"
        />
      </motion.g>
      <motion.g style={{ y: planeShiftTop }}>
        <motion.polygon
          points={planePoints(180, 250, 110, 34)}
          fill="url(#nm-p1)"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...planeSpring, delay: 0.27 }}
          stroke="rgba(168,200,250,0.3)"
          strokeWidth="1"
        />
      </motion.g>

      {/* The nova star */}
      <motion.g
        style={{ y: starShift, transformOrigin: "180px 168px" }}
        initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.42, duration: 1, ease: EASE }}
      >
        <path d={STAR_PATH} fill="#68A1EB" opacity="0.5" filter="url(#nm-soft)" />
        <path d="M180,86 L196,172 L256,190 L196,208 L180,250 Z" fill="url(#nm-star-r)" />
        <path d="M180,86 L164,172 L104,190 L164,208 L180,250 Z" fill="url(#nm-star)" />
        <path d="M180,86 L185,164 L180,250 L175,164 Z" fill="url(#nm-ridge)" />
        <path d={STAR_PATH} fill="none" stroke="rgba(234,240,251,0.35)" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
