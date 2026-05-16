"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="px-10 mt-40">
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
          <GlitchText>What I Do</GlitchText>
        </motion.p>
        <motion.h2
          className="text-white text-5xl font-black h-16"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <GlitchText>Services</GlitchText>
        </motion.h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-text"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {[
          {
            number: "01",
            title: "Branding",
            desc: "Complete brand identity systems — logos, color, typography, and brand guidelines that make you unforgettable.",
          },
          {
            number: "02",
            title: "Ad & Banner Design",
            desc: "High-converting ads and banners for digital and print — designed to stop the scroll and drive action.",
          },
          {
            number: "03",
            title: "Packaging Design",
            desc: "Packaging that sells before the product does. Structured, strategic, and shelf-ready.",
          },
          {
            number: "04",
            title: "3D Modelling",
            desc: "Realistic 3D product renders and models for presentations, mockups, and immersive visuals.",
          },
          {
            number: "05",
            title: "Animation",
            desc: "Motion design and animated brand assets that bring your identity to life across digital platforms.",
          },
          {
            number: "06",
            title: "Web Design",
            desc: "Clean, conversion-focused web designs that reflect your brand and guide your visitors to take action.",
          },
        ].map((service) => (
          <motion.div
            key={service.number}
            variants={itemVariants}
            className="bg-bg-primary p-8 hover:bg-brand-text transition-colors group"
          >
            <span className="text-highlight text-sm font-bold tracking-widest">
              {service.number}
            </span>
            <h3 className="text-white text-xl font-bold mt-3 mb-3 group-hover:text-highlight transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
