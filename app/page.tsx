"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import GridReveal from "./GridReaveal";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Services from "./Services";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (introComplete) {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [introComplete]);

  return (
    <main className="min-h-screen bg-bg-primary">
      <GridReveal
        onRevealing={() => setIsRevealing(true)}
        onIntroComplete={() => setIntroComplete(true)}
      />
      <Navbar />

      {/* Page content with fade-in transition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isRevealing ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ pointerEvents: introComplete ? "auto" : "none" }}
      >
        {/* Hero section */}
        <Hero />

        {/* About section */}
        <About />

        {/* Services section */}
        <Services />

        {/* Work section */}
        <Projects />

        {/* Contact section */}
        <Contact />

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
            © 2026 Charitoo Studio. All rights reserved.
          </span>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="https://www.instagram.com/charitoo_designs" className="hover:text-highlight transition-colors">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={50}
                height={50}
                className="object-contain"
              />
            </a>
            <a
              href="https://www.behance.net/charitoo-designs/services"
              className="hover:text-highlight transition-colors"
            >
              <Image
                src="/behance.png"
                alt="Behance"
                width={50}
                height={50}
                className="object-contain"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rayesomo-ayodimeji"
              className="hover:text-highlight transition-colors"
            >
              <Image
                src="/photoroom.png"
                alt="LinkedIn"
                width={50}
                height={50}
                className="object-contain"
              />
            </a>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
