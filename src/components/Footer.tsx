"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 border-t border-coffee-800/30">
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #c9a84c 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #e0ca7a 0%, #c9a84c 40%, #d4a054 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Artcofie
            </h3>
            <p className="text-sm text-coffee-300/60 leading-relaxed max-w-xs">
              From the highlands of Aceh Gayo to your cup. Single-origin
              specialty coffee, crafted with intention.
            </p>
          </motion.div>

          {/* Shop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-coffee-200/50 mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {["Beans", "Brew Gear", "Subscriptions", "Gift Sets"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-coffee-200/50 mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              {["FAQ", "Shipping", "Returns", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-coffee-200/70 hover:text-crema transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-coffee-200/50 mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-coffee-200/60 mb-4">
              Get brewing tips and new arrivals.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-coffee-900/50 border border-coffee-700/30 rounded-lg px-4 py-2.5 text-sm text-coffee-100 placeholder:text-coffee-500/50 focus:outline-none focus:border-gold-500/50 transition-colors duration-300"
              />
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a84c 0%, #d4a054 100%)",
                  color: "#1a0e0a",
                }}
              >
                Join
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-coffee-800/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-coffee-500/50">
            © {new Date().getFullYear()} Artcofie. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-coffee-500/50 hover:text-coffee-300/60 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
