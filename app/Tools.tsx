"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const TOOLS = [
  { name: "Tool 1", logo: "/tool1.png" },
  { name: "Tool 2", logo: "/tool2.png" },
  { name: "Tool 3", logo: "/tool3.png" },
  { name: "Tool 4", logo: "/tool4.png" },
  { name: "Tool 5", logo: "/tool5.png" },
];

export default function Tools() {
  return (
    <motion.section
      className="relative bg-bg-primary mt-6 sm:mt-12 md:mt-12 mb-2 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <style>{`
        @keyframes marquee-tools {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .tools-track {
          display: flex;
          width: max-content;
          animation: marquee-tools 18s linear infinite;
          will-change: transform;
        }
        .tools-track:hover {
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
        Tools &amp; Technologies
      </motion.p>

      {/* Strip */}
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
        {/* 4 copies — animate by -25% = exactly 1 set */}
        <div className="tools-track">
          {[...Array(4)].flatMap((_, copyIndex) =>
            TOOLS.map((tool, index) => (
              <div
                key={`${copyIndex}-${index}`}
                className="flex items-center justify-center px-3 sm:px-6 shrink-0 group cursor-default"
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={60}
                  height={60}
                  loading="lazy"
                  unoptimized
                  className="object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-150"
                />
              </div>
            )),
          )}
        </div>
      </div>
    </motion.section>
  );
}
