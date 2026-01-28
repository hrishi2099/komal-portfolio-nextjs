"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  src: string | null;
  onClose: () => void;
};

export default function ImageViewer({ src, onClose }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (src) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [src]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[101]"
          >
            <X size={32} />
          </button>
          
          <motion.img
            src={src}
            alt="Full Screen"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-full max-h-full object-contain pointer-events-none select-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
