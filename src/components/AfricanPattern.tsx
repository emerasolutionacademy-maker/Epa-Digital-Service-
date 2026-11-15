import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface AfricanPatternProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * Discreet geometric watermark inspired by Cameroonian/African textile motifs
 * (diamonds, chevrons, woven cross-grids) with subtle scroll parallax.
 */
export function AfricanPattern({ variant = 'light', className = '' }: AfricanPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 18]);

  const strokeColor = variant === 'dark' ? '#FFB703' : '#0B2A4A';
  const accentColor = variant === 'dark' ? '#F7F4EC' : '#FFB703';
  const patternId = `epa-textile-${variant}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <motion.div
        style={{ y }}
        className="absolute -inset-y-12 inset-x-0 opacity-[0.045]"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={patternId}
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer geometric diamond inspired by Ndop / Toghu weaving */}
              <path
                d="M36 4 L68 36 L36 68 L4 36 Z"
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.2"
              />
              {/* Inner nested diamond */}
              <path
                d="M36 16 L56 36 L36 56 L16 36 Z"
                fill="none"
                stroke={accentColor}
                strokeWidth="1"
              />
              {/* Corner chevron accents */}
              <path
                d="M0 12 L12 0 M60 0 L72 12 M72 60 L60 72 M12 72 L0 60"
                fill="none"
                stroke={strokeColor}
                strokeWidth="1"
              />
              {/* Center subtle cross */}
              <path
                d="M36 28 V44 M28 36 H44"
                fill="none"
                stroke={strokeColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </motion.div>
    </div>
  );
}
