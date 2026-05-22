/**
 * Lazy Loading Configuration
 *
 * Strategies implemented for better performance:
 * 1. Component-level code splitting via React.lazy() and Suspense
 * 2. Image lazy loading with loading="lazy" props
 * 3. Viewport-based animation triggers
 * 4. Progressive image loading from Cloudinary
 */

// Image loading priority levels
export const IMAGE_LOADING_PRIORITY = {
  HERO: "eager", // Hero images should load immediately
  FOLD: "lazy", // Images above the fold
  BELOW_FOLD: "lazy", // Images below the fold
  BACKGROUND: "lazy", // Background images
} as const;

// Cloudinary image optimization params
export const CLOUDINARY_TRANSFORM = {
  quality: "auto", // Auto quality based on device
  fetch_format: "auto", // Auto format (webp, jpg, etc)
  width: "auto", // Auto width based on device
  crop: "scale",
} as const;

// Framer Motion viewport settings for lazy animations
export const ANIMATION_VIEWPORT = {
  once: true, // Animation runs only once
  amount: 0.2, // Trigger when 20% of element is in view
  margin: "100px", // Start animation 100px before element enters viewport
} as const;

// Suspense fallback timing
export const SUSPENSE_CONFIG = {
  timeout: 3000, // Max wait time for component to load
} as const;
