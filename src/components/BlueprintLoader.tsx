"use client";

import { motion, Variants } from "framer-motion";
import { useTransition } from "./TransitionContext";

export default function BlueprintLoader() {
  const { isTransitioning } = useTransition();

  if (!isTransitioning) return null;

  const drawVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    },
    exit: {
        pathLength: 0,
        opacity: 0,
        transition: { duration: 0.5 }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm pointer-events-none">
      <div className="w-48 h-32 relative">
        <svg viewBox="0 0 161 100" className="w-full h-full">
            {/* 1. Main Golden Rectangle Frame */}
            <motion.rect
                x="1" y="1" width="159" height="98"
                fill="none"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
            />

            {/* 2. First Square (Left) */}
            <motion.line
                x1="99" y1="1" x2="99" y2="99"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.2 }}
            />

            {/* 3. Second Square (Top Right) */}
            <motion.line
                x1="99" y1="61" x2="159" y2="61"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.4 }}
            />

            {/* 4. Third Square (Right Bottom Right) */}
            <motion.line
                x1="123" y1="61" x2="123" y2="99"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.5 }}
            />

            {/* 5. The Golden Spiral Curve */}
            <motion.path
                d="M 1 99 A 98 98 0 0 1 99 1 L 99 1 A 60 60 0 0 1 159 61 L 159 61 A 38 38 0 0 1 123 99"
                fill="none"
                stroke="#171717"
                strokeWidth="1.5"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.6, duration: 1.5 }}
            />
        </svg>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500"
        >
            Golden Ratio
        </motion.p>
      </div>
    </div>
  );
}
