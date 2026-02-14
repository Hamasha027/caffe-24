"use client";

import { motion, Variants } from "framer-motion";
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
        } else {
          setIsInView(false);
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.6, rotateX: 90 }}
      animate={
        isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 80, scale: 0.6, rotateX: 90 }
      }
      whileHover={{ y: -15, scale: 1.05, boxShadow: "0 40px 80px rgba(217, 119, 6, 0.3)", transition: { duration: 0.25 } }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 11,
        mass: 0.75,
        delay: index * staggerDelay,
      }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
