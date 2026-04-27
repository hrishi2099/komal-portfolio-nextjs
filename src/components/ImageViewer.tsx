"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize, MousePointer2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string | null;
  onClose: () => void;
};

export default function ImageViewer({ src, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1); 
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  
  // Track pinch distance for touch devices
  const lastDist = useRef(0);

  // Calculate drag constraints whenever scale changes
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      // Calculate margins based on the scaled size
      const xMargin = Math.max(0, (width * scale - width) / 2);
      const yMargin = Math.max(0, (height * scale - height) / 2);
      
      setDragConstraints({
        left: -xMargin,
        right: xMargin,
        top: -yMargin,
        bottom: yMargin
      });
    }
  }, [scale]);

  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };

      const handleWheel = (e: WheelEvent) => {
        if (e.ctrlKey) return; 
        e.preventDefault();
        const delta = e.deltaY * -0.01; // Increased sensitivity
        const newScale = Math.min(Math.max(scaleRef.current + delta, 1), 4);
        setScale(newScale);
        scaleRef.current = newScale;
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("wheel", handleWheel, { passive: false });
      
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("wheel", handleWheel);
        setScale(1); 
        scaleRef.current = 1;
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
        const newScale = Math.min(Math.max(scaleRef.current + delta * 0.01, 1), 4);
        setScale(newScale);
        scaleRef.current = newScale;
      }
      lastDist.current = dist;
    }
  };

  const handleTouchEnd = () => {
    lastDist.current = 0;
  };

  const updateScaleManual = (newVal: number) => {
    const clamped = Math.min(Math.max(newVal, 1), 4);
    setScale(clamped);
    scaleRef.current = clamped;
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
        updateScaleManual(1);
    } else {
        updateScaleManual(2);
    }
  };

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 touch-none cursor-zoom-out"
          onClick={onClose}
        >
          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-[101]" onClick={(e) => e.stopPropagation()}>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/20 text-white/70 text-xs">
               <button onClick={() => updateScaleManual(scale - 0.5)} className="hover:text-white transition-colors p-1"><ZoomOut size={16} /></button>
               <span className="w-12 text-center font-mono select-none">{Math.round(scale * 100)}%</span>
               <button onClick={() => updateScaleManual(scale + 0.5)} className="hover:text-white transition-colors p-1"><ZoomIn size={16} /></button>
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
            onDoubleClick={handleDoubleClick}
          >
            <motion.div
              drag // Always allow drag, constraints handle the actual movement
              dragConstraints={dragConstraints}
              dragElastic={0.1}
              dragMomentum={false}
              animate={{ scale }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`relative w-full h-full flex items-center justify-center ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            >
              <div className="relative w-full h-full p-4 md:p-10 flex items-center justify-center pointer-events-none">
                <Image
                    src={src}
                    alt="Full View"
                    fill
                    className="object-contain select-none p-4 md:p-10"
                    priority
                    quality={100}
                    sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Dynamic Instructions Overlay */}
          <motion.div 
            animate={{ opacity: scale > 1 ? 0.3 : 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
             <div className="text-white/30 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="hidden md:flex items-center gap-2">
                    <MousePointer2 size={12} /> Scroll to zoom • Drag to pan • Double-click to reset
                </span>
                <span className="md:hidden flex items-center gap-2">
                    <Maximize size={12} /> Pinch to zoom & Drag to pan
                </span>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
