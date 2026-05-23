"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { cloudImg } from "./lib/cloudinary";

const BRANDS = [
  { name: "Devub", logo: cloudImg("Devub.png", 200) },
  { name: "Roc B", logo: cloudImg("Roc b.png", 200) },
  {
    name: "Senior Forex Academy",
    logo: cloudImg("Senior Forex Academy.png", 200),
  },
  { name: "Teqforge", logo: cloudImg("teqforge.png", 200) },
  { name: "Peak Photon", logo: cloudImg("peak photon.png", 200) },
  { name: "Nexera Creatives", logo: cloudImg("nexera creatives.png", 200) },
  { name: "Hyprops", logo: cloudImg("Hyprops-Logo.png", 200) },
  { name: "Gold Exchange", logo: cloudImg("Gold Exchange.png", 200) },
  { name: "Freshmate", logo: cloudImg("freshmate.png", 200) },
  { name: "Smoothkay FX", logo: cloudImg("Smookayfx.png", 200) },
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
                width={
                  brand.name === "Roc B" || brand.name === "Peak Photon"
                    ? 60
                    : 120
                }
                height={
                  brand.name === "Roc B" || brand.name === "Peak Photon"
                    ? 60
                    : 40
                }
                className="object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-150"
                sizes="80px"
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
                width={
                  brand.name === "Roc B" || brand.name === "Peak Photon"
                    ? 60
                    : 120
                }
                height={
                  brand.name === "Roc B" || brand.name === "Peak Photon"
                    ? 60
                    : 40
                }
                className="object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-150"
                sizes="80px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
