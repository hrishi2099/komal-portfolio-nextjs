"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string | null;
  onClose: () => void;
};

export default function ImageViewer({ src, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track pinch distance for touch devices
  const lastDist = useRef(0);

  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
        setScale(1); // Reset scale when closing
      };
    }
  }, [src, onClose]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );

      if (lastDist.current > 0) {
        const delta = dist - lastDist.current;
        // Sensitivity factor 0.01, capped between 1x and 4x
        const newScale = Math.min(Math.max(scale + delta * 0.01, 1), 4);
        setScale(newScale);
      }
      lastDist.current = dist;
    }
  };

  const handleTouchEnd = () => {
    lastDist.current = 0;
  };

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 touch-none"
          onClick={onClose}
        >
          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[101]" onClick={(e) => e.stopPropagation()}>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/20 text-white/70 text-xs">
               <button onClick={() => setScale(Math.max(scale - 0.5, 1))} className="hover:text-white transition-colors"><ZoomOut size={16} /></button>
               <span className="w-12 text-center font-mono">{Math.round(scale * 100)}%</span>
               <button onClick={() => setScale(Math.min(scale + 0.5, 4))} className="hover:text-white transition-colors"><ZoomIn size={16} /></button>
            </div>
            <button 
                onClick={onClose} 
                className="text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close viewer"
            >
              <X size={32} strokeWidth={1.5} />
            </button>
          </div>
          
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              drag={scale > 1}
              dragConstraints={containerRef}
              dragElastic={0.1}
              animate={{ scale }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full h-full flex items-center justify-center ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            >
              <Image
                src={src}
                alt="Full View"
                fill
                className="object-contain pointer-events-none select-none"
                priority
                quality={100}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>

          {/* Instructions Overlay (Auto-hides if zoomed) */}
          <motion.div 
            animate={{ opacity: scale > 1 ? 0 : 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
             <div className="text-white/30 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <Maximize size={12} /> Pinch to zoom & Drag to pan
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
