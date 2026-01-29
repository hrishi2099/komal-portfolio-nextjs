"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  onImageClick: (src: string) => void;
};

export default function ParallaxGallery({ images, onImageClick }: Props) {
  const containerRef = useRef(null);
  
  // Track window width to disable parallax on mobile
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create smooth spring physics for the scroll
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
  });

  // Parallax offsets
  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]); // Column 1 moves up slightly
  const y2 = useTransform(smoothProgress, [0, 1], [0, 100]);  // Column 2 moves down slightly

  // Split images into 2 columns
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 !== 0);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        {/* Column 1 (Parallax Up) */}
        <motion.div style={{ y: isMobile ? 0 : y1 }} className="flex flex-col gap-8 md:gap-16">
          {col1.map((img, i) => (
            <GalleryItem key={`col1-${i}`} src={img} onClick={() => onImageClick(img)} index={i} />
          ))}
        </motion.div>

        {/* Column 2 (Parallax Down) */}
        <motion.div style={{ y: isMobile ? 0 : y2 }} className="flex flex-col gap-8 md:gap-16 md:mt-32">
          {col2.map((img, i) => (
            <GalleryItem key={`col2-${i}`} src={img} onClick={() => onImageClick(img)} index={i} />
          ))}
        </motion.div>

      </div>
    </div>
  );
}

function GalleryItem({ src, onClick, index }: { src: string, onClick: () => void, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group cursor-zoom-in overflow-hidden shadow-lg"
      onClick={onClick}
    >
        <div className="w-full h-full bg-sage/20">
            <img
                src={src}
                alt="Gallery"
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
            />
        </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </motion.div>
  );
}
