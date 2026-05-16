"use client";
import { useState, useEffect } from "react";

interface RotatingGlitchTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function RotatingGlitchText({
  words,
  className = "",
  interval = 1500,
}: RotatingGlitchTextProps) {
  const [displayText, setDisplayText] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

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
    const rotationInterval = setInterval(() => {
      setIsGlitching(true);

      let iteration = 0;
      const maxLen = Math.max(
        words[currentIndex].length,
        words[(currentIndex + 1) % words.length].length,
      );
      const nextIndex = (currentIndex + 1) % words.length;
      const nextWord = words[nextIndex];

      const glitchInterval = setInterval(() => {
        if (iteration < maxLen) {
          setDisplayText(
            generateGlitchText(nextWord.substring(0, maxLen - iteration)) +
              nextWord.substring(maxLen - iteration),
          );
          iteration++;
        } else {
          setDisplayText(nextWord);
          setIsGlitching(false);
          setCurrentIndex(nextIndex);
          clearInterval(glitchInterval);
        }
      }, 120);
    }, interval);

    return () => clearInterval(rotationInterval);
  }, [currentIndex, words, interval]);

  return <span className={`inline-block ${className}`}>{displayText}</span>;
}
