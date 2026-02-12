"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { acehGayoProduct } from "@/lib/product";
import useScreenSize from "@/hooks/useScreenSize";

export default function ProductTextOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { isSmallScreen } = useScreenSize();
  const {isMobile} = useScreenSize();

  const storySections = useMemo(() => {
    if (isMobile || isSmallScreen) {
      return acehGayoProduct.story.slice(0, -1).map((section) => ({
      // return acehGayoProduct.story.map((section) => ({
        ...section,
        scrollRange: section.scrollRangeOverride,
      }));
    }
    return acehGayoProduct.story;
  }, [isMobile, isSmallScreen]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {storySections.map((section, index) => (
        <StoryOverlay
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          scrollRange={section.scrollRange}
          scrollYProgress={scrollYProgress}
          index={index}
          isSmallScreen={isSmallScreen}
        />
      ))}
    </div>
  );
}

interface StoryOverlayProps {
  title: string;
  subtitle: string;
  description: string;
  scrollRange: [number, number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  isSmallScreen: boolean;
}

function StoryOverlay({
  title,
  subtitle,
  description,
  scrollRange,
  scrollYProgress,
  index,
  isSmallScreen,
}: StoryOverlayProps) {
  const [start, end] = scrollRange;
  const fadeInStart = start;
  const fullStart = start + 0.03;
  const fullEnd = end - 0.03;
  const fadeOutEnd = end;

  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fullStart, fullEnd, fadeOutEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeInStart, fullStart, fullEnd, fadeOutEnd],
    [60, 0, 0, -40]
  );

  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fullStart, fullEnd, fadeOutEnd],
    [0.95, 1, 1, 0.98]
  );

  // On small screens: always center. On desktop: alternate left/right
  const isLeft = isSmallScreen ? false : index % 2 === 0;
  const isCentered = isSmallScreen;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center ${
        isCentered
          ? "justify-center"
          : isLeft
          ? "justify-start"
          : "justify-end"
      } px-5 sm:px-8 md:px-16 lg:px-24`}
    >
      <div
        className={`${
          isSmallScreen ? "max-w-sm text-center" : "max-w-lg"
        } ${!isCentered ? (isLeft ? "text-left" : "text-right") : ""}`}
        style={
          isSmallScreen
            ? {
                background: "rgba(26, 14, 10, 0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(201, 168, 76, 0.1)",
              }
            : {}
        }
      >
        {/* Subtitle */}
        <motion.p
          className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4"
          style={{
            color: "#c9a84c",
            opacity,
          }}
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <h2
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
          style={{
            color: "#f5efe8",
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </h2>

        {/* Divider */}
        <div
          className={`h-px w-12 sm:w-16 mb-4 sm:mb-6 ${
            isCentered ? "mx-auto" : isLeft ? "" : "ml-auto"
          }`}
          style={{
            background:
              "linear-gradient(90deg, #c9a84c, transparent)",
          }}
        />

        {/* Description */}
        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed"
          style={{
            color: "rgba(212, 184, 150, 0.85)",
            textShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
