"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cloudImg } from "./lib/cloudinary";

const COLS = 20;
const ROWS = 16;
const TOTAL = COLS * ROWS;

const ALL_IMAGES = [
  cloudImg("Artboard_4"),
  cloudImg("Artboard_14"),
  cloudImg("Artboard_28"),
  cloudImg("Artboard_30"),
  cloudImg("Artboard_37"),
  cloudImg("Artboard_38"),
  cloudImg("Artboard_39"),
  cloudImg("Artboard_40"),
  cloudImg("Artboard_42"),
  cloudImg("Artboard_43"),
  cloudImg("Silicone_Wristbands.Ig"),
  cloudImg("Funding_Challenge-Propstar"),
  cloudImg("Valentine-PackagesTuntun_02"),
  cloudImg("CYCRO_3_VENTURES_IS_HIRING_"),
  cloudImg("4-Days_Pickup_Class"),
  cloudImg("DEVUB_Brand_Guideline-22"),
  cloudImg("DEVUB_Brand_Guideline-20"),
  cloudImg("DEVUB_Brand_Guideline-16"),
  cloudImg("DEVUB_Brand_Guideline-19"),
  cloudImg("DEVUB_Brand_Guideline-11"),
  cloudImg("DEVUB_Brand_Guideline-15"),
  cloudImg("DEVUB_Brand_Guideline-18"),
  cloudImg("DEVUB_Brand_Guideline-04"),
  cloudImg("DEVUB_Brand_Guideline-17"),
  cloudImg("DEVUB_Brand_Guideline-03"),
  cloudImg("DEVUB_Brand_Guideline-10"),
  cloudImg("DEVUB_Brand_Guideline-01"),
  cloudImg("DEVUB_Brand_Guideline-06"),
  cloudImg("DEVUB_Brand_Guideline-08"),
  cloudImg("Strategy_that_actually_works_II"),
  cloudImg("Grow_Compete_Scale"),
  cloudImg("The_Engine_Behind_Your_Growth"),
  cloudImg("Ashbea-Happy-Int_l-Men_s-Day-25"),
  cloudImg("Convocation-and-Induction-Sales"),
  cloudImg("Chief_Tech_Our_services"),
  cloudImg("Broken_Screen_"),
  cloudImg("March_Begins"),
  cloudImg("Web3_Explained_Simply"),
  cloudImg("How_to_Know_If_Your_Website_is_Costing_or_Creating_Client"),
  cloudImg("Enroll_Now-LT_(1)"),
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GridReveal() {
  const [tiles, setTiles] = useState<Array<{ index: number; image: string }>>(
    [],
  );
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Generate tiles on client only
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const shuffled = shuffleArray(ALL_IMAGES);
    const newTiles = Array.from({ length: TOTAL }).map((_, i) => ({
      index: i,
      image: shuffled[i % shuffled.length],
    }));
    setTiles(newTiles);

    let simulatedProgress = 0;
    const progressInterval = setInterval(() => {
      simulatedProgress += Math.random() * 30;
      if (simulatedProgress >= 100) {
        simulatedProgress = 100;
        setLoadProgress(100);
        clearInterval(progressInterval);
        setTimeout(() => setLoaded(true), 300);
      } else {
        setLoadProgress(Math.min(simulatedProgress, 99));
      }
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  // Handle scroll after loading
  useEffect(() => {
    if (!loaded) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((prev) => {
        const next = Math.min(prev + e.deltaY / 500, 1);
        if (next >= 1) {
          window.removeEventListener("wheel", handleWheel);
          setTimeout(() => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
            setDone(true);
          }, 500);
        }
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [loaded]);

  if (done || !tiles.length) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Loading Screen - Fades out as grid reveals */}
      <div
        className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-8"
        style={{ opacity: Math.max(0, 1 - progress * 2) }}
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-white text-xs tracking-[0.4em] uppercase">
            Loading Portfolio
          </p>
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-highlight transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-white/30 text-xs">{loadProgress}%</p>
        </div>

        <AnimatePresence>
          {loadProgress >= 100 && progress === 0 && (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
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

      {/* Grid Reveal - Only shows when scrolling */}
      {loaded && (
        <div
          className="fixed inset-0 z-50 w-full h-full grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            opacity: progress > 0 ? 1 : 0,
          }}
        >
          {tiles.map((tile) => {
            const col = tile.index % COLS;
            const row = Math.floor(tile.index / COLS);
            const waveDelay = (col + row) / (COLS + ROWS);
            const tileProgress = Math.max(
              0,
              Math.min((progress - waveDelay * 0.6) / 0.4, 1),
            );

            const tileStyle = {
              opacity: 1 - tileProgress,
              transform: `scaleY(${1 - tileProgress})`,
              transformOrigin: "top" as const,
              position: "relative" as const,
              overflow: "hidden" as const,
            };

            return (
              <div key={tile.index} style={tileStyle}>
                <Image
                  src={tile.image}
                  alt={`project ${tile.index}`}
                  fill
                  className="object-cover"
                  sizes="10vw"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Scroll Hint - Shows during reveal */}
      <AnimatePresence>
        {loaded && progress < 0.05 && progress > 0 && (
          <motion.div
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
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
