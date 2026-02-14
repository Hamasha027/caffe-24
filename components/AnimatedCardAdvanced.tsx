"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  staggerDelay?: number;
  variant?: "bounce" | "flip" | "zoom" | "fade" | "slide";
}

/**
 * Animated Card Component with Multiple Animation Styles
 * 
 * Usage:
 * <AnimatedCardAdvanced variant="bounce" index={index}>
 *   {cardContent}
 * </AnimatedCardAdvanced>
 * 
 * Available variants:
 * - bounce: Spring bounce effect with scale-up on scroll
 * - flip: 3D flip effect on scroll and hover
 * - zoom: Subtle zoom and fade effect
 * - fade: Simple fade in effect
 * - slide: Slide in from side with rotation
 */

export function AnimatedCardAdvanced({
  children,
  index,
  staggerDelay = 0.05,
  variant = "bounce",
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationVariants = {
    bounce: {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      hover: { y: -12, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" },
    },
    flip: {
      initial: { opacity: 0, rotateY: -90 },
      animate: { opacity: 1, rotateY: 0 },
      hover: { rotateY: 5, y: -8 },
    },
    zoom: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      hover: { scale: 1.05, y: -8 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      hover: { y: -8 },
    },
    slide: {
      initial: { opacity: 0, x: -50, rotate: -5 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      hover: { x: 8, rotate: 2, y: -8 },
    },
  };

  const current = animationVariants[variant];

  return (
    <motion.div
      ref={ref}
      initial={current.initial}
      animate={isInView ? current.animate : current.initial}
      whileHover={current.hover}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8,
        delay: index * staggerDelay,
      }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
