"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectPanelProps {
  title: string;
  tag: string;
  images: string[];
}

export default function ProjectPanel({
  title,
  tag,
  images,
}: ProjectPanelProps) {
  // 1. Sort images by extracting the number from the filename (smallest to biggest)
  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      return numA - numB;
    });
  }, [images]);

  // 2. Track the currently featured image
  const [mainImage, setMainImage] = useState(sortedImages[0]);

  // 3. Thumbnails are everything EXCEPT the main image, keeping their sorted order
  const thumbnails = sortedImages.filter((img) => img !== mainImage);

  return (
    <div className="flex flex-col gap-4 w-full bg-brand-text p-6 border border-white/5 hover:border-highlight/30 transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-bg-secondary text-xs tracking-widest uppercase mb-1 block">
            {tag}
          </span>
          <h3 className="text-white text-3xl font-black">{title}</h3>
        </div>
      </div>

      {/* Big View */}
      <div className="relative w-full aspect-[16/9] bg-[#120016] overflow-hidden group">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={mainImage} // Key forces Framer Motion to animate when the image changes
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={mainImage}
              alt={`${title} Main View`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Smaller View (Horizontally Scrollable) */}
      <div className="relative w-full">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          <AnimatePresence mode="popLayout">
            {thumbnails.map((img) => (
              <motion.div
                key={img}
                layout // Smoothly animates position changes when an item is removed/added
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setMainImage(img)}
                className="relative h-24 w-36 flex-shrink-0 snap-start cursor-pointer overflow-hidden border-2 border-transparent hover:border-highlight transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={img}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
