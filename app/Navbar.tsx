"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import GlitchLink from "./GlitchLink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-10 py-6 backdrop-blur-md transition-all duration-300 ${
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
        className="object-contain"
      />
      <div className="flex gap-8 text-white text-sm tracking-wide">
        <GlitchLink href="#work">Work</GlitchLink>
        <GlitchLink href="#services">Services</GlitchLink>
        <GlitchLink href="#about">About</GlitchLink>
        <GlitchLink href="#contact">Contact</GlitchLink>
      </div>
    </nav>
  );
}
