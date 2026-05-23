"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";

const TESTIMONIALS = [
  {
    name: "Adebayo Okafor",
    role: "CEO, Devub",
    avatar: "/Devub.png",
    rating: 5,
    text: "Rayesomo completely transformed our brand identity. What we got wasn't just a logo — it was a full visual system that made us look like a serious company from day one. Our clients started noticing the difference immediately.",
  },
  {
    name: "Chioma Eze",
    role: "Founder, Peak Photon",
    avatar: "/Peak Photon.png",
    rating: 5,
    text: "Working with Rayesomo was one of the best decisions I made for my business. He understood exactly what I needed before I even fully explained it. The brand guide he delivered was beyond professional.",
  },
  {
    name: "Tunde Fashola",
    role: "Marketing Lead, Hyprops",
    avatar: "/Hyprops-Logo.png",
    rating: 5,
    text: "Fast, sharp, and incredibly creative. Rayesomo doesn't just design — he thinks. Every element had a purpose and the final result spoke for itself. I've already referred three people to him.",
  },
  {
    name: "Amaka Nwosu",
    role: "Director, Roc B Group",
    avatar: "/Roc b.png",
    rating: 5,
    text: "The attention to detail is unmatched. From typography to color psychology, everything was intentional. Our rebrand drove a 40% increase in inquiries within the first month.",
  },
  {
    name: "Seun Adeyemi",
    role: "Founder, Teqforge",
    avatar: "/Teqforge.png",
    rating: 5,
    text: "I came with a rough idea and left with a brand that I'm genuinely proud of. Rayesomo has a rare ability to translate vision into visuals. Absolute professional.",
  },
];

// Testimonial card component
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
}) {
  return (
    <div
      className="rounded-2xl p-8 sm:p-10 relative h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Quote mark */}
      <span
        className="absolute top-6 right-8 text-8xl font-black leading-none select-none"
        style={{ color: "rgba(210,0,255,0.15)" }}
      >
        "
      </span>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-[#BFFF00] text-lg">
            ★
          </span>
        ))}
      </div>

      {/* Review text */}
      <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 relative z-10">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
          style={{ borderColor: "rgba(210,0,255,0.4)" }}
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="object-cover"
            sizes="48px"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-white font-black text-sm tracking-wide">
            {testimonial.name}
          </p>
          <p className="text-[#D200FF] text-xs tracking-[0.2em] uppercase">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  };

  // Visible cards: active and (active + 1) % length
  const firstCard = TESTIMONIALS[active];
  const secondCard = TESTIMONIALS[(active + 1) % TESTIMONIALS.length];

  return (
    <section id="testimonials" className="px-4 sm:px-6 md:px-10 mt-32 mb-20">
      {/* Heading */}
      <motion.div
        className="text-center mb-16 flex flex-col items-center"
        initial={{ opacity: 0, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[#D200FF] text-xs sm:text-sm tracking-[0.3em] uppercase mb-2">
          Kind Words
        </p>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black">
          <GlitchText>Client Reviews</GlitchText>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              x: direction > 0 ? 60 : -60,
              filter: "blur(8px)",
            }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -60 : 60,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First card */}
            <TestimonialCard testimonial={firstCard} />

            {/* Second card (hidden on mobile) */}
            <div className="hidden md:block">
              <TestimonialCard testimonial={secondCard} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots — active dot is the first visible card */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
                className="transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    i === active ? "#BFFF00" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>
            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors"
              style={{ background: "#BFFF00", color: "#120016" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </div>
        </div>
      </div>

      {/* All reviewer avatars strip */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > active ? 1 : -1);
              setActive(i);
            }}
            className="rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: i === active ? "48px" : "36px",
              height: i === active ? "48px" : "36px",
              border:
                i === active
                  ? "2px solid #BFFF00"
                  : "2px solid rgba(255,255,255,0.1)",
              opacity: i === active ? 1 : 0.5,
            }}
            whileHover={{ opacity: 1 }}
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
              sizes="48px"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
