"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import Footer from "@/components/Footer";
import { acehGayoProduct } from "@/lib/product";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Navbar />

        {/* ——— SCROLLYTELLING SECTION ——— */}
        <section id="origin" className="relative">
          <ProductBottleScroll />
          <ProductTextOverlays />
        </section>

        {/* ——— PRODUCT DETAILS SECTION ——— */}
        <section
          id="details"
          className="relative py-32 md:py-40"
          style={{
            background:
              "linear-gradient(180deg, #1a0e0a 0%, #2d1810 50%, #1a0e0a 100%)",
          }}
        >
            {/* Decorative top fade */}
            <div
              className="absolute top-0 left-0 right-0 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, #1a0e0a, transparent)",
              }}
            />
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center mb-20"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">
                  The Details
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-coffee-50 mb-6">
                  Know Your Bean
                </h2>
                <div
                  className="h-px w-24 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #c9a84c, transparent)",
                  }}
                />
              </motion.div>
              {/* Details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    label: "Origin",
                    value: acehGayoProduct.region,
                    icon: "🏔",
                  },
                  {
                    label: "Altitude",
                    value: acehGayoProduct.altitude,
                    icon: "📍",
                  },
                  {
                    label: "Process",
                    value: acehGayoProduct.process,
                    icon: "🫧",
                  },
                  {
                    label: "Roast Level",
                    value: acehGayoProduct.roastLevel,
                    icon: "🔥",
                  },
                  {
                    label: "Flavor Notes",
                    value: acehGayoProduct.flavor.join(" · "),
                    icon: "☕",
                  },
                  {
                    label: "Weight",
                    value: acehGayoProduct.weight,
                    icon: "⚖️",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group p-8 rounded-2xl border border-coffee-700/20 bg-coffee-900/30 backdrop-blur-sm hover:border-gold-500/20 transition-all duration-500"
                  >
                    <span className="text-2xl mb-4 block">{item.icon}</span>
                    <p className="text-xs tracking-[0.2em] uppercase text-coffee-400/60 mb-2">
                      {item.label}
                    </p>
                    <p className="text-lg font-medium text-coffee-100">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-20 text-center text-lg md:text-xl leading-relaxed text-coffee-200/70 max-w-3xl mx-auto"
              >
                {acehGayoProduct.description}
              </motion.p>
            </div>
          </section>
          {/* ——— BUY NOW SECTION ——— */}
          <section
            id="buy"
            className="relative py-32 md:py-40"
            style={{
              background:
                "linear-gradient(180deg, #1a0e0a 0%, #2d1810 100%)",
            }}
          >
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">
                  Own the Origin
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-coffee-50 mb-3">
                  {acehGayoProduct.name}
                </h2>
                <p className="text-sm sm:text-base text-coffee-300/60 mb-8 sm:mb-12">
                  {acehGayoProduct.weight} · Single Origin · {acehGayoProduct.process}
                </p>
                {/* Price */}
                <div className="mb-8 sm:mb-12">
                  <span
                    className="text-4xl sm:text-5xl md:text-7xl font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #e0ca7a 0%, #c9a84c 40%, #d4a054 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ${acehGayoProduct.price}
                  </span>
                </div>
                {/* Quantity selector */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <QuantitySelector />
                </div>
                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 sm:px-16 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold tracking-wide uppercase transition-all duration-500 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a84c 0%, #d4a054 50%, #c9a84c 100%)",
                    color: "#1a0e0a",
                    boxShadow:
                      "0 0 40px rgba(201,168,76,0.2), 0 8px 30px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 60px rgba(201,168,76,0.4), 0 8px 40px rgba(0,0,0,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 40px rgba(201,168,76,0.2), 0 8px 30px rgba(0,0,0,0.3)";
                  }}
                >
                  Add to Cart
                </motion.button>
                <p className="mt-6 text-xs text-coffee-500/40 tracking-wide">
                  Free shipping on orders over $50
                </p>
              </motion.div>
            </div>
          </section>
          {/* ——— CONTINUE THE CRAFT ——— */}
          <section className="relative py-24 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #2d1810 0%, #1a0e0a 100%)",
              }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.04, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 text-xl font-bold tracking-wide cursor-pointer overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(212,160,84,0.05) 100%)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#e0ca7a",
                    clipPath:
                      "polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)",
                  }}
                >
                  <span>Continue the Craft</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
        </section>

        {/* ——— FIXED NAV ELEMENTS ——— */}
        <NavigationPills currentIndex={currentIndex} />

        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}

/* ——— Sub-components ——— */

function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4 bg-coffee-900/50 border border-coffee-700/30 rounded-full px-2 py-1">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="w-10 h-10 flex items-center justify-center rounded-full text-coffee-300 hover:text-crema hover:bg-coffee-700/30 transition-all duration-300 cursor-pointer"
      >
        −
      </button>
      <span className="w-8 text-center text-lg font-medium text-coffee-100">
        {qty}
      </span>
      <button
        onClick={() => setQty(qty + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full text-coffee-300 hover:text-crema hover:bg-coffee-700/30 transition-all duration-300 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

function NavigationPills({ currentIndex }: { currentIndex: number }) {
  const labels = ["Gayo"];

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-1.5 sm:gap-2 bg-coffee-900/60 backdrop-blur-xl border border-coffee-700/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
      >
        {labels.map((label, i) => (
          <button
            key={label}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs tracking-wide uppercase transition-all duration-500 cursor-pointer ${
              i === currentIndex
                ? "text-coffee-900 font-semibold"
                : "text-coffee-300/50 hover:text-coffee-200"
            }`}
            style={
              i === currentIndex
                ? {
                    background:
                      "linear-gradient(135deg, #c9a84c, #d4a054)",
                  }
                : {}
            }
          >
            {label}
          </button>
        ))}
        <div className="w-px h-3 sm:h-4 bg-coffee-700/30 mx-0.5 sm:mx-1" />
        <span className="hidden sm:inline text-[10px] tracking-[0.15em] uppercase text-coffee-500/40 px-2">
          Scroll to explore
        </span>
      </motion.div>
    </div>
  );
}
