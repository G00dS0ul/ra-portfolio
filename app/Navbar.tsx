"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GlitchLink from "./GlitchLink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 sm:py-6 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "border-b border-brand-text/30"
          : "border-b border-transparent"
      }`}
    >
      <Image
        src="/logo.png"
        alt="RA Studio Logo"
        width={120}
        height={40}
        className="object-contain w-24 sm:w-32"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4 lg:gap-8 text-white text-xs sm:text-sm tracking-wide">
        <GlitchLink href="#work">Work</GlitchLink>
        <GlitchLink href="#services">Services</GlitchLink>
        <GlitchLink href="#about">About</GlitchLink>
        <GlitchLink href="#contact">Contact</GlitchLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
      >
        <motion.div
          className="w-6 h-0.5 bg-white"
          animate={
            isMobileMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }
          }
        />
        <motion.div
          className="w-6 h-0.5 bg-white"
          animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.div
          className="w-6 h-0.5 bg-white"
          animate={
            isMobileMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }
          }
        />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-bg-primary/95 backdrop-blur-lg border-b border-brand-text/30 md:hidden py-6"
          >
            <div className="flex flex-col gap-4 px-6">
              <GlitchLink href="#work" onClick={handleNavClick}>
                Work
              </GlitchLink>
              <GlitchLink href="#services" onClick={handleNavClick}>
                Services
              </GlitchLink>
              <GlitchLink href="#about" onClick={handleNavClick}>
                About
              </GlitchLink>
              <GlitchLink href="#contact" onClick={handleNavClick}>
                Contact
              </GlitchLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
