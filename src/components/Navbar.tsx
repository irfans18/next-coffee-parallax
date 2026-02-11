"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize above md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "#origin", label: "Origin" },
    { href: "#details", label: "Details" },
    { href: "#buy", label: "Shop" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled || menuOpen
            ? "bg-coffee-900/80 backdrop-blur-xl border-b border-gold-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
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
                  background:
                    "linear-gradient(135deg, #e0ca7a 0%, #c9a84c 40%, #d4a054 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Artcofie
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300 tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA + Mobile Hamburger */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#buy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-block relative px-6 py-2.5 text-sm font-semibold tracking-wide uppercase rounded-full overflow-hidden transition-all duration-300"
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

              {/* Hamburger button — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300 origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, #e0ca7a, #c9a84c)",
                      transform: menuOpen
                        ? "translateY(9px) rotate(45deg)"
                        : "none",
                    }}
                  />
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300"
                    style={{
                      background: "#c9a84c",
                      opacity: menuOpen ? 0 : 1,
                      transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                    }}
                  />
                  <span
                    className="block h-0.5 w-full rounded-full transition-all duration-300 origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, #c9a84c, #d4a054)",
                      transform: menuOpen
                        ? "translateY(-9px) rotate(-45deg)"
                        : "none",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, #1a0e0a 0%, #2d1810 100%)",
                borderLeft: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {/* Close area / padding for the navbar height */}
              <div className="h-20" />

              {/* Links */}
              <nav className="flex flex-col px-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className="py-4 text-lg tracking-wide uppercase text-coffee-200/80 hover:text-crema transition-colors duration-300 border-b border-coffee-700/20"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="px-8 mt-8">
                <motion.a
                  href="#buy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-4 text-center text-sm font-semibold tracking-wide uppercase rounded-full transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #c9a84c 0%, #d4a054 100%)",
                    color: "#1a0e0a",
                    boxShadow:
                      "0 0 30px rgba(201,168,76,0.2)",
                  }}
                >
                  Buy Now
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
