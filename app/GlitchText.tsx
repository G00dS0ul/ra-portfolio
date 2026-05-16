"use client";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
  isHovered?: boolean;
}

export default function GlitchText({
  children,
  className = "",
  isHovered: externalHovered,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(children);
  const [internalHovered, setInternalHovered] = useState(false);

  const isHovered =
    externalHovered !== undefined ? externalHovered : internalHovered;

  const randomChar = () => {
    const chars = "1234567890!@#$%^&*()_+-=[]{}|<>?/~";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateGlitchText = (text: string) => {
    return text
      .split("")
      .map(() => randomChar())
      .join("");
  };

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(children);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration < children.length) {
        setDisplayText(
          generateGlitchText(
            children.substring(0, children.length - iteration),
          ) + children.substring(children.length - iteration),
        );
        iteration++;
      } else {
        setDisplayText(children);
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isHovered, children]);

  return (
    <span
      className={`inline-block cursor-pointer whitespace-nowrap ${className}`}
      style={{ width: `${children.length * 0.65}em` }}
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
    >
      {displayText}
    </span>
  );
}
