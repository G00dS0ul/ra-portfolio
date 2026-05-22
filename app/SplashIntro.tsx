"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const tools = [
  { emoji: "✏️", x: 15, y: 20, size: 60, duration: 4, delay: 0 },
  { emoji: "🖌️", x: 75, y: 15, size: 50, duration: 5, delay: 0.5 },
  { emoji: "📐", x: 85, y: 65, size: 55, duration: 3.5, delay: 0.2 },
  { emoji: "🎨", x: 10, y: 70, size: 65, duration: 4.5, delay: 0.8 },
  { emoji: "✒️", x: 50, y: 80, size: 45, duration: 6, delay: 0.3 },
  { emoji: "📏", x: 60, y: 25, size: 50, duration: 4, delay: 1 },
  { emoji: "🖊️", x: 30, y: 50, size: 55, duration: 5, delay: 0.6 },
];

// Each splash: appears at startAt, peaks at peakAt, partially fades by dimAt, fully clears at endAt
const splashes = [
  {
    src: "/splash-purple.png",
    startAt: 0.0,
    peakAt: 0.1,
    dimAt: 0.2,
    endAt: 0.88,
    x: "15%",
    y: "20%",
    rotate: -10,
    size: 550,
  },
  {
    src: "/splash-lime.png",
    startAt: 0.1,
    peakAt: 0.22,
    dimAt: 0.34,
    endAt: 0.88,
    x: "60%",
    y: "10%",
    rotate: 15,
    size: 500,
  },
  {
    src: "/splash-purple.png",
    startAt: 0.25,
    peakAt: 0.37,
    dimAt: 0.5,
    endAt: 0.88,
    x: "40%",
    y: "50%",
    rotate: 5,
    size: 620,
  },
  {
    src: "/splash-lime.png",
    startAt: 0.4,
    peakAt: 0.52,
    dimAt: 0.65,
    endAt: 0.88,
    x: "75%",
    y: "55%",
    rotate: -8,
    size: 480,
  },
  {
    src: "/splash-purple.png",
    startAt: 0.55,
    peakAt: 0.67,
    dimAt: 0.78,
    endAt: 0.88,
    x: "25%",
    y: "65%",
    rotate: 12,
    size: 560,
  },
];

function getSplashOpacity(splash: (typeof splashes)[0], progress: number) {
  // Before splash starts
  if (progress < splash.startAt) return 0;

  // Final clear — all splashes fade out together
  if (progress >= splash.endAt) {
    const p = Math.min((progress - splash.endAt) / (1 - splash.endAt), 1);
    return Math.max(0, 0.35 - p * 0.35);
  }

  // Fade in: startAt → peakAt
  if (progress < splash.peakAt) {
    const p = (progress - splash.startAt) / (splash.peakAt - splash.startAt);
    return p;
  }

  // Partial fade: peakAt → dimAt (fades from 1.0 down to 0.35, stays there)
  if (progress < splash.dimAt) {
    const p = (progress - splash.peakAt) / (splash.dimAt - splash.peakAt);
    return 1 - p * 0.65;
  }

  // Stays at 0.35 until endAt
  return 0.35;
}

export default function SplashIntro() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((prev) => {
        const next = Math.min(prev + e.deltaY / 600, 1);
        if (next >= 1) {
          document.documentElement.style.overflow = "auto";
          document.body.style.overflow = "auto";
          window.removeEventListener("wheel", handleWheel);
          setTimeout(() => setDone(true), 700);
        }
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  if (done) return null;

  const toolsOpacity = Math.max(0, 1 - progress * 4);
  const wrapperOpacity =
    progress >= 0.9 ? Math.max(0, 1 - (progress - 0.9) * 10) : 1;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-bg-primary"
      style={{ opacity: wrapperOpacity }}
    >
      {/* Floating designer tools — fade out as scroll starts */}
      {tools.map((tool, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: tool.x + "%",
            top: tool.y + "%",
            fontSize: tool.size,
            opacity: toolsOpacity,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: tool.duration,
            repeat: Infinity,
            delay: tool.delay,
            ease: "easeInOut",
          }}
        >
          {tool.emoji}
        </motion.div>
      ))}

      {/* Paint splashes — fade in, linger, then clear */}
      {splashes.map((splash, i) => {
        const opacity = getSplashOpacity(splash, progress);
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: splash.x,
              top: splash.y,
              width: splash.size,
              height: splash.size,
              opacity,
              transform: `translate(-50%, -50%) rotate(${splash.rotate}deg)`,
              mixBlendMode: "screen", // removes checkerboard on dark background
              transition: "opacity 0.15s ease",
            }}
          >
            <Image
              src={splash.src}
              alt="paint splash"
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* Scroll hint */}
      <AnimatePresence>
        {progress < 0.05 && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white text-sm tracking-[0.4em] uppercase">
              Scroll to Enter
            </p>
            <motion.div
              className="w-px h-12 bg-highlight"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
