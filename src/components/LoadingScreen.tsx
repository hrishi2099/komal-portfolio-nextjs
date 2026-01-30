"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after animation completes (approx 2s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex items-end gap-1 h-16">
              {/* Block 1 (Left Base) */}
              <motion.div
                className="w-8 h-8 bg-sage"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
              />
              
              {/* Block 2 (Right Base) */}
              <motion.div
                className="w-8 h-12 bg-rose"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.4 }}
              />
              
              {/* Block 3 (Top Lintel/Bridge) - Absolute positioned to land on top */}
              <motion.div
                className="absolute bottom-12 left-0 w-16 h-4 bg-gray-900"
                initial={{ y: -100, opacity: 0, rotate: -10 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay: 0.8 }}
              />
            </div>
            
            <motion.p
              className="mt-8 text-xs uppercase tracking-[0.3em] text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Constructing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}