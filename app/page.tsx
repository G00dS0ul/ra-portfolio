"use client";

import { motion } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";
import Image from "next/image";
import GridReveal from "./GridReaveal";
import Hero from "./Hero";
import Navbar from "./Navbar";

// Lazy load components that are below the fold
const Projects = lazy(() => import("./Projects"));
const Services = lazy(() => import("./Services"));
const Clients = lazy(() => import("./Clients"));
const Tools = lazy(() => import("./Tools"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));

// Loading fallback component
function SectionLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-12 w-64 bg-brand-text/20 rounded mb-4"></div>
        <div className="h-4 w-96 bg-brand-text/10 rounded"></div>
      </div>
    </div>
  );
}

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
        transition={{ delay: 0.15, duration: 0.4 }}
        style={{ pointerEvents: introComplete ? "auto" : "none" }}
      >
        {/* Hero section */}
        <Hero />

        {/* About section */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        {/* Services section */}
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        {/* Clients section */}
        <Suspense fallback={<SectionLoader />}>
          <Clients />
        </Suspense>

        {/* Work section */}
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        {/* Tools section */}
        <Suspense fallback={<SectionLoader />}>
          <Tools />
        </Suspense>

        {/* Contact section */}
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        {/* Footer */}
        <footer className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-brand-text text-center sm:text-left">
          <Image
            src="/studiomark.png"
            alt="Charitoo Studio"
            width={100}
            height={30}
            className="object-contain w-20 sm:w-28"
            loading="lazy"
          />
          <span className="text-gray-600 text-xs sm:text-sm order-3 sm:order-2 w-full sm:w-auto">
            © 2026 Charitoo Studio. All rights reserved.
          </span>
          <div className="flex gap-3 sm:gap-6 text-gray-400 text-sm order-2 sm:order-3">
            <a
              href="https://www.instagram.com/charitoo_designs"
              className="hover:text-highlight transition-colors"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={50}
                height={50}
                className="object-contain w-6 sm:w-8"
                loading="lazy"
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
                className="object-contain w-6 sm:w-8"
                loading="lazy"
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
                className="object-contain w-6 sm:w-8"
              />
            </a>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
