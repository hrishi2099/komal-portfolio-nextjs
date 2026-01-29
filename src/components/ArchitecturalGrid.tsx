"use client";

import { motion, Variants } from "framer-motion";

export default function ArchitecturalGrid() {
  const lineVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.2,
      transition: { 
        duration: 2, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal Line */}
            <motion.path 
              d="M 0 0 L 100 0" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-gray-900"
              variants={lineVariant}
              initial="hidden"
              animate="visible"
            />
            {/* Vertical Line */}
            <motion.path 
              d="M 0 0 L 0 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-gray-900"
              variants={lineVariant}
              initial="hidden"
              animate="visible"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Accent Crosshairs at intersections */}
      <motion.div 
        className="absolute top-1/3 left-1/3 w-4 h-4 border-l border-t border-gray-900 opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-4 h-4 border-r border-b border-gray-900 opacity-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      />
    </div>
  );
}