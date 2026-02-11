"use client";

import { useState, useEffect, useCallback } from "react";

interface ScreenSize {
  screenWidth: number;
  isSmallScreen: boolean; // ≤ 768px
  isMobile: boolean; // ≤ 480px
}

const SMALL_SCREEN_BREAKPOINT = 768;
const MOBILE_BREAKPOINT = 480;

export default function useScreenSize(): ScreenSize {
  // Initialize with default desktop values to matches SSR
  // Using 0 or a safe default like 1440 helps avoid initial flicker if logic handles it,
  // but strictly for hydration matching, we need a stable check.
  // However, returning 0 might break math. Let's use 1440 (desktop) as default.
  // If we use 0, isSmallScreen=true which causes mobile layout on server -> mismatch if server is varying?
  // No, server is always one thing. 
  // Standard practice: default to specific view (usually desktop or mobile) and stick to it until mount.
  
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    screenWidth: 1440,
    isSmallScreen: false,
    isMobile: false,
  });

  const handleResize = useCallback(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1440;
    setScreenSize({
      screenWidth: width,
      isSmallScreen: width <= SMALL_SCREEN_BREAKPOINT,
      isMobile: width <= MOBILE_BREAKPOINT,
    });
  }, []);

  useEffect(() => {
    // Trigger once on mount to get actual size
    handleResize();

    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [handleResize]);

  return screenSize;
}
