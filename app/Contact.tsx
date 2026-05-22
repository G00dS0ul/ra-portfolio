"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import RotatingGlitchText from "./RotatingGlitchText";
import { cloudImg } from "./lib/cloudinary";

const WHATSAPP_LINK =
  "https://wa.me/2347058821627?text=Hi%20Rayesomo%2C%20I%27d%20like%20to%20discuss%20a%20project";
const EMAIL = "rayesomoayodimejialex@gmail.com";

export default function Contact() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);
  const [qrHovered, setQrHovered] = useState(false);

  const cardBase = {
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
  };
  const emailCardBorder = { border: "1px solid rgba(255,255,255,0.08)" };
  const waCardBorder = { border: "1px solid rgba(37,211,102,0.2)" };
  const qrCardBorder = { border: "1px solid rgba(191,255,0,0.2)" };
  const emailIconBg = { background: "rgba(191,255,0,0.1)" };
  const waIconBg = { background: "rgba(37,211,102,0.1)" };
  const qrIconBg = { background: "rgba(191,255,0,0.1)" };

  const qrCardStle = {
    ...cardBase,
    ...qrCardBorder,
    width: "fit-content",
    flexShrink: 0,
  };

  const qrImageConatainerStyle = {
    position: "relative" as const,
    width: "170px",
    height: "170px",
    borderRadius: "6px",
    overflow: "hidden" as const,
  };

  return (
    <section
      id="contact"
      className="px-4 sm:px-6 md:px-10 mt-10 sm:mt-20 mb-0 bg-bg-secondary/10 py-12 sm:py-24 text-center"
    >
      {/* Section header */}
      <p className="text-bg-secondary text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
        Get In Touch
      </p>
      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
        Let&apos;s Build Something{" "}
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
      <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-xl mx-auto px-2">
        Have a project in mind? Let&apos;s talk about how we can bring your
        brand vision to life.
      </p>

      {/* Contact cards */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 max-w-5xl mx-auto text-left">
        {/* Email card */}
        <motion.a
          href={`mailto:${EMAIL}`}
          className="flex-1 group rounded-xl p-6 flex flex-col gap-4"
          style={{ ...cardBase, ...emailCardBorder }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(191,255,0,0.1)" }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={emailIconBg}
          >
            <Image
              src="/email.png"
              alt="Email"
              width={30}
              height={30}
              className="object-contain"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-1">
              Send an Email
            </p>
            <motion.p
              className="text-white font-bold text-base"
              initial={{ opacity: 0.7 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ letterSpacing: "0.05em" }}
            ></motion.p>
          </div>

          <p className="text-white/30 text-sm mt-auto">
            Best for detailed project briefs
          </p>

          <div className="flex items-center gap-2 text-[#BFFF00] text-sm font-medium">
            <span>Send Email</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </div>
        </motion.a>

        {/* WhatsApp card */}
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 group rounded-xl p-6 flex flex-col gap-4"
          style={{ ...cardBase, ...waCardBorder }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(37,211,102,0.1)" }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setWaHovered(true)}
          onMouseLeave={() => setWaHovered(false)}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={waIconBg}
          >
            <Image
              src="/whasap.png"
              alt="WhatsApp"
              width={50}
              height={50}
              className="object-contain"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-1">
              Chat on WhatsApp
            </p>
            <p className="text-white font-bold text-base group-hover:text-[#25D366] transition-colors"></p>
          </div>

          <p className="text-white/30 text-sm mt-auto">
            Best for quick conversations
          </p>

          <div className="flex items-center gap-2 text-[#25D366] text-sm font-medium">
            <span>Open WhatsApp</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </div>
        </motion.a>

        {/* QR Code card */}
        <motion.div
          className="flex-1 group rounded-xl p-2 flex flex-col gap-2 items-center"
          style={{ ...qrCardStle }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(191,255,0,0.1)" }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setQrHovered(true)}
          onMouseLeave={() => setQrHovered(false)}
        >
          {/* QR Code image */}
          <motion.div
            className="relative  rounded-lg overflow-hidden mx-auto"
            style={qrImageConatainerStyle}
          >
            <Image
              src={cloudImg("QR_Code")}
              alt="WhatsApp QR Code"
              fill
              className="object-cover"
              unoptimized
              loading="lazy"
              style={{
                objectPosition: "center 35%",
                transformOrigin: "center 90%",
              }}
            />
          </motion.div>

          <div className="flex items-center gap-2 text-[#BFFF00] text-sm font-medium justify-center">
            <span>Quick Connect</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
