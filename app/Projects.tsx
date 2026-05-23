"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  LayoutGroup,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import Image from "next/image";
import GlitchText from "./GlitchText";
import { cloudImg } from "./lib/cloudinary";
import { createPortal } from "react-dom";

type AspectRatio = {
  height: string;
  objectFit: "cover" | "contain";
  bgColor?: string;
};

type Category = {
  id: string;
  name: string;
  filter: (project: Project) => boolean;
  gridCols: string;
  aspectRatio: AspectRatio;
};

type Project = {
  id: string;
  name: string;
  category: string;
  images: string[];
};

const PROJECTS: Project[] = [
  {
    id: "devub",
    name: "Devub",
    category: "Branding",
    images: [
      cloudImg("DEVUB_Brand_Guideline-01"),
      cloudImg("DEVUB_Brand_Guideline-03"),
      cloudImg("DEVUB_Brand_Guideline-04"),
      cloudImg("DEVUB_Brand_Guideline-06"),
      cloudImg("DEVUB_Brand_Guideline-08"),
      cloudImg("DEVUB_Brand_Guideline-10"),
      cloudImg("DEVUB_Brand_Guideline-11"),
      cloudImg("DEVUB_Brand_Guideline-15"),
    ],
  },
  {
    id: "roc-b",
    name: "ROC B",
    category: "Brand Identity",
    images: [
      cloudImg("Artboard_4"),
      cloudImg("Artboard_14"),
      cloudImg("Artboard_28"),
      cloudImg("Artboard_30"),
      cloudImg("Artboard_37"),
      cloudImg("Artboard_38"),
      cloudImg("Artboard_43"),
      cloudImg("Artboard_40"),
    ],
  },
  {
    id: "peak-photon",
    name: "Peak Photon",
    category: "Social Media",
    images: [
      cloudImg(
        "The-Difference-Between-a-Brand-That-Looks-Good-and-One-That-Feels-Right_01",
      ),
      cloudImg("Web3_Explained_Simply"),
      cloudImg("How_to_Know_If_Your_Website_is_Costing_or_Creating_Client"),
      cloudImg("When-is-the-right-time-to-build-an-app_01"),
      cloudImg("Peak_Photon_Jan_Advert_flyer_"),
      cloudImg("From_Draft_to_Deal"),
      cloudImg("March_Begins"),
    ],
  },
  {
    id: "SFA",
    name: "Senior Forex Academy",
    category: "Branding",
    images: [
      cloudImg("Logo_on_Sign_Meeting_Room"),
      cloudImg("Free_iPhone_Mockup"),
      cloudImg("App_on_Iphone"),
      cloudImg("SFA_7"),
      cloudImg("SFA_10"),
      cloudImg("bottle"),
      cloudImg("Free_Baseball_Cap_Mockup"),
      cloudImg("SFA_2"),
    ],
  },
  {
    id: "flyers",
    name: "Campaign Flyers",
    category: "Ad Design",
    images: [
      cloudImg("4-Days_Pickup_Class"),
      cloudImg("Funding_Challenge-Propstar"),
      cloudImg("Valentine-PackagesTuntun_02"),
      cloudImg("CYCRO_3_VENTURES_IS_HIRING_"),
      cloudImg("Accessories-That-Instantly-Elevate-Your-Suit-Game_01"),
      cloudImg("BluetickgengLet_s_Get_you_Verified"),
      cloudImg("Smoothkayfx_advert"),
      cloudImg("Vote_Tuntun-intent"),
    ],
  },
  {
    id: "ashbea",
    name: "Ashbea",
    category: "Social Media",
    images: [
      cloudImg("Ashbea-Happy-Int_l-Men_s-Day-25"),
      cloudImg("Convocation-and-Induction-Sales"),
      cloudImg("Celebrate-your-success-with-luxury"),
      cloudImg("Whats-your-biggest-Struggle-with-Tailors"),
      cloudImg("Oxford-or-Timberland"),
    ],
  },
];

// ── Category configuration ──
const CATEGORIES: Category[] = [
  {
    id: "branding",
    name: "Branding & Identity",
    filter: (p) => p.category === "Branding" || p.category === "Brand Identity",
    gridCols: "grid-cols-1 md:grid-cols-2",
    aspectRatio: { height: "340px", objectFit: "cover" },
  },
  {
    id: "social",
    name: "Social Media",
    filter: (p) => p.category === "Social Media",
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    aspectRatio: { height: "420px", objectFit: "cover" },
  },
  {
    id: "ads",
    name: "Ad Design",
    filter: (p) => p.category === "Ad Design",
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    aspectRatio: { height: "480px", objectFit: "contain", bgColor: "#1a0020" },
  },
  {
    id: "packaging",
    name: "Packaging",
    filter: (p) => p.category === "Packaging",
    gridCols: "grid-cols-1 md:grid-cols-2",
    aspectRatio: { height: "340px", objectFit: "cover" },
  },
];

// ── Style objects defined outside JSX to avoid rendering issues ──
const cardStyle = { transformStyle: "preserve-3d" as const };
const bigViewStyle = { height: "clamp(200px, 50vw, 340px)" };
const stripScrollStyle = {
  scrollbarWidth: "none" as const,
  msOverflowStyle: "none" as const,
};
const gradientOverlay = {
  background:
    "linear-gradient(to top, rgba(18,0,22,0.95) 0%, rgba(18,0,22,0.3) 50%, transparent 100%)",
};
const counterStyle = {
  background: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(8px)",
};
const thumbnailSize = {
  width: "110px",
  height: "80px",
  flexShrink: 0 as const,
};
const activeBorder = { boxShadow: "0 0 0 2px #D200FF" };
const lightboxImageStyle = {
  width: "85vw",
  height: "85vh",
  position: "relative" as const,
};
const backdropStyle = {
  background: "rgba(0,0,0,0.92)",
  backdropFilter: "blur(10px)",
};

function ProjectCard({
  project,
  index,
  aspectRatio,
}: {
  project: Project;
  index: number;
  aspectRatio: AspectRatio;
}) {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const controls = useAnimation();

  // Triple images for seamless infinite loop
  const loopImages = [...project.images, ...project.images, ...project.images];
  const THUMB_WIDTH = 110;
  const THUMB_GAP = 8;
  const singleSetWidth = project.images.length * (THUMB_WIDTH + THUMB_GAP);

  const startScroll = () => {
    controls.start({
      x: [0, -singleSetWidth],
      transition: {
        duration: project.images.length * 1.8,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });
  };

  const stopScroll = () => controls.stop();

  // Start scrolling on mount
  useEffect(() => {
    startScroll();
  }, []);

  const cardStyle = { transformStyle: "preserve-3d" as const };
  const bigViewStyle = { height: aspectRatio.height };
  const imageContainerStyle = {
    objectFit: aspectRatio.objectFit as "cover" | "contain",
    backgroundColor: aspectRatio.bgColor || "transparent",
  };
  const gradientOverlay = {
    background:
      "linear-gradient(to top, rgba(18,0,22,0.95) 0%, rgba(18,0,22,0.3) 50%, transparent 100%)",
  };
  const counterStyle = {
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
  };
  const activeBorder = { boxShadow: "0 0 0 2px #D200FF" };
  const lightboxImageStyle = {
    width: "85vw",
    height: "85vh",
    position: "relative" as const,
  };
  const backdropStyle = {
    background: "rgba(0,0,0,0.92)",
    backdropFilter: "blur(10px)",
  };
  const stripWrapStyle = {
    overflow: "hidden" as const,
    maskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = (y - 0.5) * 8;
    const rotY = (x - 0.5) * -8;
    e.currentTarget.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1200px) rotateX(0) rotateY(0) translateZ(0)";
    startScroll();
  };

  const cardInitial = { opacity: 0, y: 40, filter: "blur(10px)" };
  const cardAnimate = { opacity: 1, y: 0, filter: "blur(0px)" };
  const cardViewport = { once: true, amount: 0.2 };
  const cardTransition = { duration: 0.8, delay: index * 0.15 };
  const imgInitial = { opacity: 0, scale: 1.05 };
  const imgAnimate = { opacity: 1, scale: 1 };
  const imgTransition = { duration: 0.4 };
  const lightboxInitial = { opacity: 0 };
  const lightboxAnimate = { opacity: 1 };
  const lightboxContentInitial = { scale: 0.92, opacity: 0 };
  const lightboxContentAnimate = { scale: 1, opacity: 1 };
  const lightboxContentTransition = { duration: 0.3 };

  return (
    <LayoutGroup id={project.id}>
      <motion.div
        initial={cardInitial}
        whileInView={cardAnimate}
        viewport={cardViewport}
        transition={cardTransition}
        className="bg-[#1a0020] overflow-hidden rounded-xl cursor-pointer"
        style={cardStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── BIG VIEW ── */}
        <div
          className="relative overflow-hidden cursor-zoom-in"
          style={bigViewStyle}
          onClick={() => setLightboxOpen(true)}
        >
          <motion.div
            key={project.images[featuredIdx]}
            layoutId={`img-${project.id}-${featuredIdx}`}
            className="absolute inset-0"
            initial={imgInitial}
            animate={imgAnimate}
            transition={imgTransition}
          >
            <Image
              src={project.images[featuredIdx]}
              alt={project.name}
              fill
              className={aspectRatio.objectFit === "contain" ? "object-contain" : "object-cover"}
              style={aspectRatio.bgColor ? { backgroundColor: aspectRatio.bgColor } : undefined}
              unoptimized
            />
          </motion.div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={gradientOverlay}
          />

          <div className="absolute bottom-0 left-0 p-5 z-10">
            <span className="text-[#D200FF] text-xs tracking-[0.3em] uppercase font-medium">
              {project.category}
            </span>
            <h3 className="text-white font-black text-xl mt-1">
              {project.name}
            </h3>
          </div>

          <div
            className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs text-white/60"
            style={counterStyle}
          >
            {featuredIdx + 1} / {project.images.length}
          </div>

          <div className="absolute bottom-4 right-4 z-10 text-white/30 text-xs tracking-widest uppercase">
            Click to expand
          </div>
        </div>

        {/* ── INFINITE SCROLLING STRIP ── */}
        <div
          className="p-3 pb-4"
          style={stripWrapStyle}
          onMouseEnter={stopScroll}
          onMouseLeave={startScroll}
        >
          <motion.div
            className="flex gap-2"
            animate={controls}
            style={{ width: "max-content" }}
          >
            {loopImages.map((img, i) => {
              const realIdx = i % project.images.length;
              const isActive =
                realIdx === featuredIdx && i < project.images.length;
              const thumbStyle = {
                width: THUMB_WIDTH,
                height: 80,
                flexShrink: 0 as const,
                position: "relative" as const,
                borderRadius: "6px",
                overflow: "hidden" as const,
                cursor: "pointer",
                opacity: isActive ? 1 : 0.55,
                transition: "opacity 0.2s ease",
                ...(isActive ? activeBorder : {}),
              };
              return (
                <div
                  key={`${project.id}-loop-${i}`}
                  style={thumbStyle}
                  onMouseEnter={() => setFeaturedIdx(realIdx)}
                >
                  <Image
                    src={img}
                    alt={`${project.name} ${realIdx + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    loading="lazy"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* ── LIGHTBOX ── */}
      {typeof window !== "undefined" &&
        lightboxOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-999 flex items-center justify-center"
              initial={lightboxInitial}
              animate={lightboxAnimate}
              exit={lightboxInitial}
              onClick={() => setLightboxOpen(false)}
            >
              <div className="absolute inset-0" style={backdropStyle} />

              <button
                className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                ✕
              </button>

              <div className="absolute top-6 left-6 z-20 text-white/40 text-sm tracking-widest">
                {project.name} &mdash; {featuredIdx + 1} /{" "}
                {project.images.length}
              </div>

              <motion.div
                className="relative z-10"
                style={lightboxImageStyle}
                initial={lightboxContentInitial}
                animate={lightboxContentAnimate}
                exit={lightboxContentInitial}
                transition={lightboxContentTransition}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={project.images[featuredIdx]}
                  alt={project.name}
                  fill
                  className="object-contain"
                  unoptimized
                  loading="lazy"
                />
              </motion.div>

              <button
                className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeaturedIdx((prev) =>
                    prev === 0 ? project.images.length - 1 : prev - 1,
                  );
                }}
              >
                ‹
              </button>

              <button
                className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeaturedIdx((prev) =>
                    prev === project.images.length - 1 ? 0 : prev + 1,
                  );
                }}
              >
                ›
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 overflow-x-auto max-w-[80vw]">
                {project.images.map((img, i) => {
                  const isActive = i === featuredIdx;
                  const lbThumbStyle = {
                    width: "60px",
                    height: "44px",
                    flexShrink: 0 as const,
                    position: "relative" as const,
                    borderRadius: "4px",
                    overflow: "hidden" as const,
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.4,
                    boxShadow: isActive ? "0 0 0 2px #BFFF00" : "none",
                    transition: "opacity 0.2s, box-shadow 0.2s",
                  };
                  return (
                    <div
                      key={i}
                      style={lbThumbStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeaturedIdx(i);
                      }}
                    >
                      <Image
                        src={img}
                        alt={`${project.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </LayoutGroup>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("branding");
  const activeTabData = CATEGORIES.find((c) => c.id === activeCategory)!;
  const filteredProjects = PROJECTS.filter(activeTabData.filter);

  return (
    <section id="work" className="px-4 sm:px-6 md:px-10 mt-10 sm:mt-20">
      <motion.div
        className="text-center mb-12 sm:mb-16 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-bg-secondary text-xs sm:text-sm tracking-[0.3em] uppercase mb-2 h-6"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <GlitchText>Selected Work</GlitchText>
        </motion.p>
        <motion.h2
          className="text-white text-3xl sm:text-4xl md:text-5xl font-black h-auto sm:h-16"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <GlitchText>Projects</GlitchText>
        </motion.h2>
      </motion.div>

      {/* ── Category Tabs ── */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 mb-12 mt-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              layoutId={`tab-${category.id}`}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                isActive
                  ? "bg-[#BFFF00] text-bg-primary font-bold"
                  : "border border-white/15 text-white/50 hover:text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          );
        })}
      </motion.div>

      {/* ── Projects Grid with Category Animation ── */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid ${activeTabData.gridCols} gap-4 sm:gap-6`}
            style={{ perspective: "1200px" }}
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                aspectRatio={activeTabData.aspectRatio}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`${activeCategory}-empty`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid ${activeTabData.gridCols} gap-4 sm:gap-6`}
            style={{ perspective: "1200px" }}
          >
            <div className="col-span-full flex items-center justify-center rounded-xl bg-linear-to-br from-white/5 to-white/2 border border-white/10 p-12 text-center">
              <div>
                <p className="text-white/60 text-lg mb-2">Coming Soon</p>
                <p className="text-white/30 text-sm">
                  New {activeTabData.name.toLowerCase()} projects will be added here
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
