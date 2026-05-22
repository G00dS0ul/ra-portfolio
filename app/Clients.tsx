"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const BRANDS = [
  { name: "Devub", logo: "/Devub.png" },
  { name: "Roc B", logo: "/Roc b.png" },
  { name: "Senior Forex Academy", logo: "/Senior Forex Academy.png" },
  { name: "Teqforge", logo: "/teqforge.png" },
  { name: "Peak Photon", logo: "/peak photon.png" },
  { name: "Nexera Creatives", logo: "/nexera creatives.png" },
  { name: "Hyprops", logo: "/Hyprops-Logo.png" },
  { name: "Gold Exchange", logo: "/Gold Exchange.png" },
  { name: "Freshmate", logo: "/freshmate.png" },
  { name: "Smoothkay FX", logo: "/Smookayfx.png" },
];

export default function Clients() {
  return (
    <motion.section
      className="relative bg-bg-primary mt-6 sm:mt-12 md:mt-12 mb-4 sm:mb-5 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Keyframe animation */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
            display: flex;
            width: max-content;
          animation: marquee 18s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Label */}
      <motion.p
        className="text-white/30 text-xs sm:text-xs md:text-xs tracking-[0.4em] uppercase text-center mb-3 sm:mb-4 pt-3 sm:pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Brands I&apos;ve Worked With
      </motion.p>

      {/* Strip with pattern background */}
      <div
        className="overflow-hidden relative py-2 sm:py-3"
        style={{
          backgroundColor: "#120016",
          backgroundImage: "url('/pattern.png')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Marquee track — 2 copies for seamless loop */}
        <div className="marquee-track flex whitespace-nowrap">
          {/* Copy 1 */}
          {BRANDS.map((brand, index) => (
            <div
              key={`a-${index}`}
              className="flex items-center justify-center px-3 sm:px-6 shrink-0 group cursor-default"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.name === "Roc B" || brand.name === "Peak Photon" ? 60 : 120}
                height={brand.name === "Roc B" || brand.name === "Peak Photon" ? 60 : 40}
                className="object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-150"
                loading="lazy"
              />
            </div>
          ))}

          {/* Copy 2 — makes the loop seamless */}
          {BRANDS.map((brand, index) => (
            <div
              key={`b-${index}`}
              className="flex items-center justify-center px-3 sm:px-6 shrink-0 group cursor-default"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.name === "Roc B" || brand.name === "Peak Photon" ? 60 : 120}
                height={brand.name === "Roc B" || brand.name === "Peak Photon" ? 60 : 40}
                className="object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-150"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
