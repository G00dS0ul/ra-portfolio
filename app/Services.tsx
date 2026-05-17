"use client";

import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import { title } from "process";
import { desc } from "framer-motion/client";

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
            title: "Brand Identity",
            desc: "I build complete visual identities — logo, color, type, and tone — that tell your brand's story at a glance. Strategic, cohesive, and built to last.",
          },
          {
            number: "02",
            title: "Social Media Design",
            desc: "Visuals that stop the scroll and stay on-brand — every time. Your feed should look like a brand, not a mood board..",
          },
          {
            number: "03",
            title: "Web3 Design",
            desc: "Bold, credible visuals for NFT projects, DAOs, and crypto brands that want to look as serious as the technology they're building on. Trust starts with how you look.",
          },
          {
            number: "04",
            title: "Ad Design",
            desc: "Ad creatives designed to perform — sharp, on-brand, and built to make people act. Because a beautiful ad that doesn't convert is just expensive decoration.",
          },
          {
            number: "05",
            title: "Packaging Design",
            desc: "Packaging that sells before the customer even picks it up — premium, intentional, and impossible to ignore on a crowded shelf. Your product deserves to look the part.",
          },
          {
            number: "06",
            title: "Motion Design",
            desc: "Dynamic, engaging motion graphics that bring your brand to life and enhance user experience across digital platforms.",
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
