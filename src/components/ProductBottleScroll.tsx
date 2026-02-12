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
  // Progressive loading state
  const BATCH_SIZE = 30; // Initial batch size for quick start
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const prevSmallScreenRef = useRef<boolean | null>(null);
  
  // Track which frames are actually usable
  const framesLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

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

      // Find the nearest loaded frame if current isn't loaded
      // Prefer current, then look backwards.
      let drawIndex = index;
      
      // If exact frame not loaded, find nearest preceding loaded frame
      if (!framesLoadedRef.current[index]) {
        let found = false;
        // Look backwards first
        for (let i = index - 1; i >= 0; i--) {
          if (framesLoadedRef.current[i]) {
            drawIndex = i;
            found = true;
            break;
          }
        }
        // If no backward frame, look forward (only at start)
        if (!found) {
           for (let i = index + 1; i < TOTAL_FRAMES; i++) {
            if (framesLoadedRef.current[i]) {
              drawIndex = i;
              found = true;
              break;
            }
           }
        }
        // If still nothing, we can't draw (or just keep canvas as is)
        if (!found) return; 
      }

      const img = imagesRef.current[drawIndex];
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

  // Validation & cleanup on screen size change
  // When screen size changes, we need to restart loading from scratch because URL changes
  useEffect(() => {
    // Only reload if the screen size category actually changed
    if (prevSmallScreenRef.current === isSmallScreen && imagesRef.current.length > 0) return;
    prevSmallScreenRef.current = isSmallScreen;

    // Reset everything
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
    framesLoadedRef.current = new Array(TOTAL_FRAMES).fill(false);
    loadedCountRef.current = 0;
    
    setIsLoading(true);
    setLoadedCount(0);

    // Progressive Loading Strategy
    // 1. Load critical batch (0-BATCH_SIZE)
    // 2. Once done, hide loader
    // 3. Continue loading rest in background

    let isCancelled = false;
    
    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (isCancelled) return resolve();
        
        const img = new Image();
        img.src = getFramePath(index, isSmallScreen);
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[index] = img;
          framesLoadedRef.current[index] = true;
          loadedCountRef.current++;
          
          // Optimization: Only triggers re-renders for:
          // 1. Unlocking the UI (first BATCH_SIZE frames)
          // 2. Periodic updates for the rest (every 5 frames) to avoid 142+ re-renders
          if (loadedCountRef.current <= BATCH_SIZE || loadedCountRef.current % 5 === 0 || loadedCountRef.current === TOTAL_FRAMES) {
             setLoadedCount(loadedCountRef.current);
          }

          resolve();
        };
        img.onerror = () => {
          // even on error we mark as "processed" to continue queue
          if (isCancelled) return;
          loadedCountRef.current++;
          // Force update on error to keep progress moving visually
          setLoadedCount(loadedCountRef.current); 
          resolve(); 
        };
      });
    };

    const loadBatch = async (start: number, end: number) => {
      // Create array of promises for this batch
      const promises: Promise<void>[] = [];
      for (let i = start; i < end && i < TOTAL_FRAMES; i++) {
        promises.push(loadImage(i));
      }
      await Promise.all(promises);
    };

    const runSequence = async () => {
      // 1. Critical Batch
      await loadBatch(0, BATCH_SIZE);
      
      if (isCancelled) return;

      // Unlock UI immediately after critical batch
      setIsLoading(false);
      
      // Render first frame immediately
      renderFrame(0);

      // 2. Background Load Rest
      // Process in smaller chunks to yield to main thread if needed
      const CHUNK = 20;
      for (let i = BATCH_SIZE; i < TOTAL_FRAMES; i += CHUNK) {
        if (isCancelled) break;
        // Small delay to let UI breathe if needed? maybe not needed for promises but good practice
        // await new Promise(r => setTimeout(r, 0)); 
        await loadBatch(i, i + CHUNK);
      }
    };

    runSequence();

    return () => {
      isCancelled = true;
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
                    width: `${Math.min(100, Math.floor((loadedCount / BATCH_SIZE) * 100))}%`,
                    background:
                      "linear-gradient(90deg, #c9a84c, #d4a054)",
                  }}
                />
              </div>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-coffee-400/60">
              Loading experience {Math.min(100, Math.floor((loadedCount / BATCH_SIZE) * 100))}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
