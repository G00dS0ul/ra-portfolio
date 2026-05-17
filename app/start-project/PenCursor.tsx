"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PenCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on this page
    document.body.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      // Restore cursor when leaving page
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  const cursorStyle = {
    position: "fixed" as const,
    left: pos.x,
    top: pos.y,
    pointerEvents: "none" as const,
    zIndex: 99999,
    opacity: visible ? 1 : 0,
    // Offset so the pen tip is at the actual cursor point
    transform: `translate(-4px, -28px) scale(${clicking ? 0.85 : 1}) rotate(-20deg)`,
    transition: "opacity 0.2s ease, transform 0.1s ease",
    fontSize: clicking ? "28px" : "32px",
    filter: "drop-shadow(0 2px 8px rgba(210,0,255,0.5))",
    userSelect: "none" as const,
  };

  const trailStyle = {
    position: "fixed" as const,
    left: pos.x,
    top: pos.y,
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#BFFF00",
    pointerEvents: "none" as const,
    zIndex: 99998,
    transform: "translate(-3px, -3px)",
    opacity: visible ? 0.6 : 0,
    transition: "left 0.08s ease, top 0.08s ease, opacity 0.2s ease",
    boxShadow: "0 0 8px #BFFF00",
  };

  const ringStyle = {
    position: "fixed" as const,
    left: pos.x,
    top: pos.y,
    width: clicking ? "20px" : "36px",
    height: clicking ? "20px" : "36px",
    borderRadius: "50%",
    border: "1px solid rgba(210,0,255,0.4)",
    pointerEvents: "none" as const,
    zIndex: 99997,
    transform: `translate(-50%, -50%)`,
    opacity: visible ? 1 : 0,
    transition: "left 0.12s ease, top 0.12s ease, width 0.15s ease, height 0.15s ease, opacity 0.2s ease",
  };

  return (
    <>
      {/* Outer ring */}
      <div style={ringStyle} />

      {/* Lime dot at tip */}
      <div style={trailStyle} />

      {/* Pen emoji cursor */}
      <div style={cursorStyle}>
        ✒️
      </div>
    </>
  );
}