"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { acehGayoProduct } from "@/lib/product";

export default function ProductTextOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      {acehGayoProduct.story.map((section, index) => (
        <StoryOverlay
          key={section.id}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          scrollRange={section.scrollRange}
          scrollYProgress={scrollYProgress}
          index={index}
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
}

function StoryOverlay({
  title,
  subtitle,
  description,
  scrollRange,
  scrollYProgress,
  index,
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

  // Alternate layout: even on left, odd on right
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center ${
        isLeft ? "justify-start" : "justify-end"
      } px-8 md:px-16 lg:px-24`}
    >
      <div className={`max-w-lg ${isLeft ? "text-left" : "text-right"}`}>
        {/* Subtitle */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          style={{
            color: "#c9a84c",
            opacity,
          }}
        >
          {subtitle}
        </motion.p>

        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{
            color: "#f5efe8",
            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </h2>

        {/* Divider */}
        <div
          className={`h-px w-16 mb-6 ${isLeft ? "" : "ml-auto"}`}
          style={{
            background:
              "linear-gradient(90deg, #c9a84c, transparent)",
          }}
        />

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed"
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
