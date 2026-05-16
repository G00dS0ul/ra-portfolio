"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlitchReveal() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((prev) => {
        const next = Math.min(prev + e.deltaY / 500, 1);
        progressRef.current = next;
        if (next >= 1) {
          document.documentElement.style.overflow = "auto";
          document.body.style.overflow = "auto";
          window.removeEventListener("wheel", handleWheel);
          setTimeout(() => setDone(true), 600);
        }
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;

    const draw = () => {
      const p = progressRef.current;
      const noise = Math.max(0, 1 - p * 1.4);

      ctx.fillStyle = "#120016";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (noise > 0.02) {
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const rand = Math.random();
          const alpha = Math.floor(noise * 255);

          if (rand < noise * 0.25) {
            // Purple
            data[i] = 210;
            data[i + 1] = 0;
            data[i + 2] = 255;
            data[i + 3] = alpha;
          } else if (rand < noise * 0.45) {
            // Lime
            data[i] = 191;
            data[i + 1] = 255;
            data[i + 2] = 0;
            data[i + 3] = alpha;
          } else if (rand < noise * 0.55) {
            // White
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = Math.floor(noise * 180);
          } else {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imgData, 0, 0);

        // Glitch horizontal bars
        const bars = Math.floor(noise * 10);
        for (let g = 0; g < bars; g++) {
          const y = Math.random() * canvas.height;
          const h = Math.random() * 15 + 2;
          const shift = (Math.random() - 0.5) * 80 * noise;
          ctx.save();
          ctx.drawImage(
            canvas,
            0,
            y,
            canvas.width,
            h,
            shift,
            y,
            canvas.width,
            h,
          );
          ctx.globalAlpha = 0.5 * noise;
          ctx.fillStyle = Math.random() > 0.5 ? "#D200FF" : "#BFFF00";
          ctx.fillRect(0, y, canvas.width, h);
          ctx.restore();
        }

        // Scanlines
        ctx.globalAlpha = noise * 0.15;
        for (let y = 0; y < canvas.height; y += 4) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, y, canvas.width, 2);
        }
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (done) return null;

  const overlayOpacity = Math.max(0, 1 - progress * 1.3);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: overlayOpacity }}
      />

      <AnimatePresence>
        {progress < 0.05 && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white text-sm tracking-[0.4em] uppercase">
              Scroll to Enter
            </p>
            <motion.div
              className="w-px h-12 bg-highlight"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
