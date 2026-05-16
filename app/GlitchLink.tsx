"use client";
import { useState, useEffect } from "react";

interface GlitchLinkProps {
  href: string;
  children: string;
  className?: string;
}

export default function GlitchLink({
  href,
  children,
  className = "",
}: GlitchLinkProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);

  const randomChar = () => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
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
    <a
      href={href}
      className={`hover:text-highlight transition-colors inline-block ${className}`}
      style={{ minWidth: `${children.length * 0.6}em` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </a>
  );
}
