"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  index: number;
  staggerDelay?: number;
}

export function AnimatedCard({
  children,
  index,
  staggerDelay = 0.05,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

  const floatingVariants = {
    initial: { opacity: 0, y: 60, scale: 0.8 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        mass: 0.9,
        delay: index * staggerDelay,
      },
    },
    hover: {
      y: -25,
      rotateX: 5,
      rotateY: -5,
      boxShadow: "0 30px 60px rgba(217, 119, 6, 0.35)",
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={floatingVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="h-full relative group"
    >
      {/* Gradient shine effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
          backdropFilter: "blur(1px)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating animation */}
      <motion.div
        animate={isInView ? { y: [0, -8, 0] } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
