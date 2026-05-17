"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cloudImg } from "./lib/cloudinary";

// Pick your best/most impressive image for the intro
const INTRO_IMAGE = cloudImg("DEVUB_Brand_Guideline-01", 1920);

export default function GridReveal({
  onRevealing,
  onIntroComplete,
}: {
  onRevealing?: () => void;
  onIntroComplete?: () => void;
}) {
  const [triggered, setTriggered] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [done]);

  useEffect(() => {
    if (triggered) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
  }, [triggered]);

  useEffect(() => {
    if (triggered || done) return;

    const trigger = () => {
      setTriggered(true);
      onRevealing?.();
      setTimeout(() => {
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        localStorage.setItem("intro-seen", "true");
        setDone(true);
        onIntroComplete?.();
      }, 1300);
    };

    window.addEventListener("wheel", trigger, { once: true, passive: true });
    window.addEventListener("touchmove", trigger, {
      once: true,
      passive: true,
    });
    return () => {
      window.removeEventListener("wheel", trigger);
      window.removeEventListener("touchmove", trigger);
    };
  }, [triggered, done]);

  if (done) return null;

  const containerStyle = {
    position: "fixed" as const,
    inset: 0,
    zIndex: 50,
    overflow: "hidden",
    background: "#000",
  };

  const imageWrapStyle = {
    position: "absolute" as const,
    inset: 0,
    transition: triggered
      ? "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s ease 0.15s"
      : "none",
    transform: triggered ? "scale(4)" : "scale(1)",
    opacity: triggered ? 0 : 1,
    willChange: "transform, opacity",
  };

  const vignetteStyle = {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
    pointerEvents: "none" as const,
    zIndex: 2,
    transition: triggered ? "opacity 0.4s ease" : "none",
    opacity: triggered ? 0 : 1,
  };

  const overlayStyle = {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(18, 0, 22, 0.35)",
    zIndex: 1,
  };

  return (
    <div style={containerStyle}>
      {/* Main image */}
      <div style={imageWrapStyle}>
        <Image
          src={INTRO_IMAGE}
          alt="Portfolio intro"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Dark overlay */}
      <div style={overlayStyle} />

      {/* Vignette */}
      <div style={vignetteStyle} />

      {/* Name / brand stamp */}
      <AnimatePresence>
        {!triggered && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/40 text-xs tracking-[0.5em] uppercase mb-3">
              Portfolio
            </p>
            <h1 className="text-white font-black text-6xl md:text-8xl tracking-tight leading-none">
              RAYESOMO
            </h1>
            <p className="text-[#BFFF00] text-lg md:text-xl tracking-[0.4em] uppercase mt-3">
              Brand &amp; Visual Identity Designer
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint */}
      <AnimatePresence>
        {!triggered && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase">
              Scroll to Enter
            </p>
            <motion.div
              className="w-px h-10 bg-[#BFFF00]"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
