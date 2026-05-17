"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import GlitchText from "./GlitchText";

const BEAMS = [
  {
    left: "5%",
    color: "#D200FF",
    width: 160,
    height: "90%",
    blur: 40,
    delay: 0,
  },
  {
    left: "18%",
    color: "#BFFF00",
    width: 120,
    height: "75%",
    blur: 35,
    delay: 0.4,
  },
  {
    left: "30%",
    color: "#D200FF",
    width: 180,
    height: "95%",
    blur: 45,
    delay: 0.8,
  },
  {
    left: "43%",
    color: "#BFFF00",
    width: 140,
    height: "80%",
    blur: 38,
    delay: 0.2,
  },
  {
    left: "55%",
    color: "#D200FF",
    width: 200,
    height: "100%",
    blur: 50,
    delay: 1.0,
  },
  {
    left: "67%",
    color: "#BFFF00",
    width: 130,
    height: "78%",
    blur: 36,
    delay: 0.6,
  },
  {
    left: "78%",
    color: "#D200FF",
    width: 170,
    height: "88%",
    blur: 42,
    delay: 0.3,
  },
  {
    left: "88%",
    color: "#BFFF00",
    width: 150,
    height: "82%",
    blur: 40,
    delay: 0.9,
  },
  {
    left: "96%",
    color: "#D200FF",
    width: 160,
    height: "85%",
    blur: 42,
    delay: 0.5,
  },
];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const layer1X = useTransform(smoothX, [-1, 1], [-8, 8]);
  const layer1Y = useTransform(smoothY, [-1, 1], [-8, 8]);
  const layer2X = useTransform(smoothX, [-1, 1], [-20, 20]);
  const layer2Y = useTransform(smoothY, [-1, 1], [-20, 20]);
  const layer3X = useTransform(smoothX, [-1, 1], [-35, 35]);
  const layer3Y = useTransform(smoothY, [-1, 1], [-35, 35]);
  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#120016] pt-20">
      {/* Background with glow beams */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base purple wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #D200FF55 0%, transparent 70%)",
          }}
        />

        {/* Animated beams */}
        {BEAMS.map((beam, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: beam.left,
              top: "-5%",
              width: beam.width,
              height: beam.height,
              transform: "translateX(-50%)",
              background: `linear-gradient(to bottom, ${beam.color} 0%, ${beam.color}CC 30%, ${beam.color}44 70%, transparent 100%)`,
              filter: `blur(${beam.blur}px)`,
              borderRadius: "0 0 50% 50%",
              zIndex: 0,
            }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scaleY: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3 + beam.delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: beam.delay,
            }}
          />
        ))}

        {/* Center hotspot */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at 50% 0%, #BFFF0066 0%, #D200FF33 50%, transparent 80%)",
            filter: "blur(20px)",
          }}
        />

        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, #120016 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to bottom, transparent, #120016)",
          }}
        />
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <motion.p
          className="text-[#BFFF00]"
          style={{ x: layer3X, y: layer3Y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlitchText>Brand &amp; Visual Identity Designer</GlitchText>
        </motion.p>

        <motion.h1
          className="text-white font-black leading-[1.1] mb-6"
          style={{
            x: layer2X,
            y: layer2Y,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span
            className="block font-normal text-lg mb-3"
            style={{ fontSize: "clamp(50px, 8vw, 40px)" }}
          >
            I Don&apos;t Just Design Logos
          </span>

          <span className="block text-5xl md:text-7xl">I Build The Reason</span>

          <span className="block text-5xl md:text-7xl text-bg-secondary mt-2">
            They Choose You
          </span>
        </motion.h1>

        <motion.p
          className="text-white/50 text-lg mb-10 tracking-wide"
          style={{ x: layer1X, y: layer1Y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Branding · Social Media Design · Web3 Design · Ad Design · Packaging
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{ x: layer1X, y: layer1Y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#work"
            className="px-8 py-4 bg-[#BFFF00] text-[#120016] font-black text-sm tracking-widest uppercase"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px #BFFF0088" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GlitchText className="text-[#120016]">View Work</GlitchText>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase"
            whileHover={{
              scale: 1.05,
              borderColor: "#BFFF00",
              color: "#BFFF00",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GlitchText>Let&apos;s Talk</GlitchText>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
