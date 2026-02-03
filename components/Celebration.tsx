"use client";
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function Celebration() {
  useEffect(() => {
    const end = Date.now() + 1.5 * 1000; // بۆ ماوەی ٣ چرکە بەردەوام دەبێت
const colors = ["#FF6B6B", "#FFD93D", "#FF9F1C", "#F4A261"];
    const frame = () => {
      if (Date.now() > end) return;

      // لای چەپ
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });

      // لای ڕاست
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);

  return null; // پێویست ناکات هیچ شتێک نیشان بدات، تەنها وەک فەرمان کار دەکات
}