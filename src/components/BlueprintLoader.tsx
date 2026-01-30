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
        pathLength: { duration: 0.8, ease: "easeInOut" },
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm pointer-events-none">
      <div className="w-32 h-32 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Architectural "K" or Structure Outline */}
            <motion.path
                d="M 20 20 L 20 80 L 80 80 L 80 20 Z" // Outer Box
                fill="none"
                stroke="#171717"
                strokeWidth="2"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
            />
            <motion.path
                d="M 20 20 L 80 80" // Cross 1
                fill="none"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.2 }}
            />
             <motion.path
                d="M 80 20 L 20 80" // Cross 2
                fill="none"
                stroke="#171717"
                strokeWidth="1"
                variants={drawVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.4 }}
            />
        </svg>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-4 text-xs font-mono uppercase tracking-widest text-black"
        >
            Rendering
        </motion.p>
      </div>
    </div>
  );
}