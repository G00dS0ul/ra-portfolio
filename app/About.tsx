"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import RotatingGlitchText from "./RotatingGlitchText";

export default function About() {
  const [workButtonHovered, setWorkButtonHovered] = useState(false);

  return (
    <section id="about" className="px-10 mt-40">
      {/* Heading Section */}
      <motion.div
        className="text-center mb-16 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-bg-secondary text-sm tracking-[0.3em] uppercase mb-2 h-6"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
        >
          <GlitchText>Who Am I</GlitchText>
        </motion.p>
        <motion.h2
          className="text-white text-5xl font-black h-16"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <GlitchText>About</GlitchText>
        </motion.h2>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-white text-5xl font-black mb-6">
            Design is not just <span className="text-highlight">art</span>
            <br />- It's{" "}
            <RotatingGlitchText
              words={["Strategy", "Purpose", "Experience", "Communication"]}
              className="text-highlight"
              interval={2000}
            />
            .
          </h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            I'm a brand and visual identity designer with a passion for building
            brands that connect, communicate, and convert. Every project I take
            on starts with a deep understanding of the brand's story, audience,
            and goals.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            From logo design to full brand systems, packaging, 3D renders,
            animation, and web — I bring a holistic creative approach to every
            brief.
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
              transition={{ duration: 1.2 }}
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
          className="flex-1 bg-brand-text h-96 flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
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
            src="/logomark.png"
            alt="RA Logomark"
            width={180}
            height={180}
            className="object-contain relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
