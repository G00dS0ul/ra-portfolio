"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SplashIntro from "./SplashIntro";
import GridReveal from "./GridReaveal";
import GlitchReveal from "./GlitchReveal";
import Hero from "./Hero";
import Navbar from "./Navbar";
import GlitchText from "./GlitchText";
import RotatingGlitchText from "./RotatingGlitchText";
import Projects from "./Projects";
import Services from "./Services";
import About from "./About";
export default function Home() {
  const [workButtonHovered, setWorkButtonHovered] = useState(false);
  const [emailButtonHovered, setEmailButtonHovered] = useState(false);

  // Ensure scroll is always enabled when page mounts
  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  }, []);
  return (
    <main className="min-h-screen bg-bg-primary">
      <GridReveal />
      <Navbar />

      {/* Hero — with pattern background */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Services Section */}
      <Services />

      {/* Work Section */}
      <Projects />

      {/* Contact Section */}
      <section
        id="contact"
        className="px-10 mt-40 mb-0 bg-bg-secondary/10 py-24 text-center"
      >
        <p className="text-bg-secondary text-sm tracking-[0.3em] uppercase mb-2">
          Get In Touch
        </p>
        <h2 className="text-white text-6xl font-black mb-6">
          Let's Build Something{" "}
          <span className="text-highlight">
            <RotatingGlitchText
              words={[
                "Great",
                "Unique",
                "Iconic",
                "Remarkable",
                "Together",
                "Impactful",
              ]}
              interval={2000}
            />
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Have a project in mind? Let's talk about how we can bring your brand
          vision to life.
        </p>
        <a
          href="mailto:hello@rastudio.com"
          className="bg-highlight text-bg-primary px-12 py-4 text-lg font-bold tracking-wide hover:opacity-90 transition-opacity inline-flex items-center justify-center h-16"
          onMouseEnter={() => setEmailButtonHovered(true)}
          onMouseLeave={() => setEmailButtonHovered(false)}
        >
          <motion.span
            initial={{ filter: "blur(10px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-block"
          >
            hello@rastudio.com
          </motion.span>
        </a>
      </section>

      {/* Footer */}
      <footer className="px-10 py-8 flex items-center justify-between border-t border-brand-text">
        <Image
          src="/studiomark.png"
          alt="Charitoo Studio"
          width={100}
          height={30}
          className="object-contain"
        />
        <span className="text-gray-600 text-sm">
          © 2025 Charitoo Studio. All rights reserved.
        </span>
        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#" className="hover:text-highlight transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-highlight transition-colors">
            Behance
          </a>
          <a href="#" className="hover:text-highlight transition-colors">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
