"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { TOTAL_FRAMES, getFramePath } from "@/lib/product";
import useScreenSize from "@/hooks/useScreenSize";

interface ProductBottleScrollProps {
  onProgressChange?: (progress: number) => void;
}

export default function ProductBottleScroll({
  onProgressChange,
}: ProductBottleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const prevSmallScreenRef = useRef<boolean | null>(null);

  const { isSmallScreen } = useScreenSize();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth: number;
      let drawHeight: number;

      if (isSmallScreen) {
        // Cover mode for small screens — fill viewport, crop edges
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
        } else {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
        }
      } else {
        // Contain mode for desktop
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
        }
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    },
    [isSmallScreen]
  );

  // Preload images — re-run when screen size category changes
  useEffect(() => {
    // Only reload if the screen size category actually changed
    if (prevSmallScreenRef.current === isSmallScreen) return;
    prevSmallScreenRef.current = isSmallScreen;

    loadedCountRef.current = 0;
    setIsLoading(true);
    setLoadProgress(0);

    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i, isSmallScreen);
      img.onload = () => {
        loadedCountRef.current++;
        setLoadProgress(
          Math.floor((loadedCountRef.current / TOTAL_FRAMES) * 100)
        );
        if (loadedCountRef.current === TOTAL_FRAMES) {
          setIsLoading(false);
          renderFrame(0);
        }
      };
      img.onerror = () => {
        loadedCountRef.current++;
        setLoadProgress(
          Math.floor((loadedCountRef.current / TOTAL_FRAMES) * 100)
        );
        if (loadedCountRef.current === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isSmallScreen, renderFrame]);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Listen to scroll-linked frame changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(idx));
    }
  });

  // Report scroll progress upstream
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    onProgressChange?.(latest);
  });

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark vignette overlays for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isSmallScreen
              ? "linear-gradient(to bottom, rgba(26,14,10,0.6) 0%, rgba(26,14,10,0.1) 30%, rgba(26,14,10,0.1) 60%, rgba(26,14,10,0.7) 100%)"
              : "linear-gradient(to right, rgba(26,14,10,0.7) 0%, rgba(26,14,10,0) 40%, rgba(26,14,10,0) 60%, rgba(26,14,10,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,14,10,0.4) 0%, rgba(26,14,10,0) 20%, rgba(26,14,10,0) 80%, rgba(26,14,10,0.5) 100%)",
          }}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-coffee-900">
            <div className="relative w-48 mb-6">
              <div className="h-0.5 bg-coffee-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${loadProgress}%`,
                    background:
                      "linear-gradient(90deg, #c9a84c, #d4a054)",
                  }}
                />
              </div>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-coffee-400/60">
              Loading experience {loadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
