"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-coffee-900/80 backdrop-blur-xl border-b border-gold-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* SVG coffee bean / flame hybrid icon */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-500 group-hover:rotate-12"
            >
              <defs>
                <linearGradient
                  id="iconGrad"
                  x1="18"
                  y1="0"
                  x2="18"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#e0ca7a" />
                  <stop offset="50%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#d4a054" />
                </linearGradient>
              </defs>
              <path
                d="M18 2C13 2 9 7 9 13c0 4 2 7 4 9.5S18 28 18 34c0-6 3-9.5 5-11.5S27 17 27 13c0-6-4-11-9-11z"
                fill="url(#iconGrad)"
                opacity="0.9"
              />
              <path
                d="M18 8c-2 0-4 2.5-4 6 0 2 1 3.5 2 5s2 3.5 2 6c0-2.5 1-4.5 2-6s2-3 2-5c0-3.5-2-6-4-6z"
                fill="#1a0e0a"
                opacity="0.5"
              />
            </svg>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #e0ca7a 0%, #c9a84c 40%, #d4a054 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Artcofie
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#origin"
              className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300 tracking-wide uppercase"
            >
              Origin
            </a>
            <a
              href="#details"
              className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300 tracking-wide uppercase"
            >
              Details
            </a>
            <a
              href="#buy"
              className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300 tracking-wide uppercase"
            >
              Shop
            </a>
          </div>

          {/* CTA */}
          <motion.a
            href="#buy"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-6 py-2.5 text-sm font-semibold tracking-wide uppercase rounded-full overflow-hidden transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, #c9a84c 0%, #d4a054 100%)",
              color: "#1a0e0a",
              boxShadow: "0 0 0px rgba(201,168,76,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 25px rgba(201,168,76,0.4), 0 0 50px rgba(201,168,76,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0px rgba(201,168,76,0)";
            }}
          >
            Buy Now
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
