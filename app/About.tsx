"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import RotatingGlitchText from "./RotatingGlitchText";

export default function About() {
  const [workButtonHovered, setWorkButtonHovered] = useState(false);

  return (
    <section id="about" className="px-4 sm:px-6 md:px-10 mt-8 sm:mt-40">
      {/* Heading Section */}
      <motion.div
        className="text-center mb-12 sm:mb-16 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-bg-secondary text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 h-6"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <GlitchText>Who Am I</GlitchText>
        </motion.p>
        <motion.h2
          className="text-white text-3xl sm:text-4xl md:text-5xl font-black h-auto sm:h-16"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <GlitchText>Meet Me</GlitchText>
        </motion.h2>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-6 sm:gap-12 items-stretch">
        <motion.div
          className="w-full md:w-[60%]"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-white text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6">
            I'm Rayesomo Ayodimeji,
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            I build the visual systems behind brands that walk into a room and
            own it before anyone says a word. My work goes beyond aesthetics.
            It's about designing intent making sure everything your brand shows
            the world is working as hard as you are.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-8">
            With 5+ years of experience across brand strategy and visual
            identity, I've worked with startups, agencies, and growing
            businesses who had the product, the ambition, and the drive but a
            brand that wasn't keeping up. I fix that. I design complete visual
            identities that align your message, your personality, and your
            long-term goals into one cohesive, unmistakable presence.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Every decision I make is intentional. Every color, typeface, and
            layout exists for a reason. Because in a world drowning in average,
            strategic design isn't a luxury it's the difference between being
            chosen and being overlooked.
          </p>
          <a
            href="/start-project"
            className="bg-highlight text-bg-primary px-8 py-3 font-bold tracking-wide hover:opacity-90 transition-opacity inline-flex items-center justify-center"
            onMouseEnter={() => setWorkButtonHovered(true)}
            onMouseLeave={() => setWorkButtonHovered(false)}
            style={{ minWidth: "150px", height: "48px" }}
          >
            <motion.span
              initial={{ filter: "blur(10px)" }}
              whileInView={{ filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center"
              style={{ width: "120px" }}
            >
              <GlitchText
                className="text-bg-primary"
                isHovered={workButtonHovered}
              >
                Work With Me
              </GlitchText>
            </motion.span>
          </a>
        </motion.div>

        {/* Logomark displayed in About */}
        <motion.div
          className="relative w-full bg-[bg-primary] overflow-hidden flex items-center justify-center md:w-[40%]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Outer wrapper for glowing border effect */}
          <div
            className="relative w-full h-[500px] rounded-3xl p-[2px]"
            style={{
              background: "transparent",
            }}
          >
            {/* Sharp border - full opacity */}
            <div className="glowing-border-wrap absolute inset-0 rounded-3xl" />

            {/* Soft glow halo - blurred */}
            <div
              className="glowing-border-wrap absolute inset-0 rounded-3xl"
              style={{
                opacity: 0.6,
                filter: "blur(8px)",
              }}
            />

            {/* Image panel content - actual display area */}
            <div
              className="relative w-full h-full bg-[#1a0020] rounded-[28px] overflow-hidden flex items-center justify-center"
              style={{
                background: "#1a0020",
              }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "url('/pattern.png')",
                  backgroundSize: "200px",
                  backgroundRepeat: "repeat",
                }}
              />
              <Image
                src="/Full Image.png"
                alt="RA Portfolio"
                width={300}
                height={300}
                className="object-contain relative z-10 rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
