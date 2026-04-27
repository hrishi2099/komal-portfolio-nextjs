"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

type Props = {
  src: string | null;
  onClose: () => void;
};

export default function ImageViewer({ src, onClose }: Props) {
  // Lock body scroll and Handle Escape key
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
      };
    }
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-[101] transition-colors"
            aria-label="Close viewer"
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full h-full flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <Image
              src={src}
              alt="Full Screen View"
              fill
              className="object-contain select-none"
              priority
              quality={95}
              sizes="100vw"
            />
          </motion.div>
          
          {/* Mobile Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-[0.2em] md:hidden pointer-events-none">
            Tap background to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
