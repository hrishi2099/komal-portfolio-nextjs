"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Props = {
  images: string[];
  onImageClick: (src: string) => void;
};

export default function ParallaxGallery({ images, onImageClick }: Props) {
  const containerRef = useRef(null);
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

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
  });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 100]);

  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 !== 0);

  if (isMobile) {
    return <Mobile3DCarousel images={images} onImageClick={onImageClick} />;
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <motion.div style={{ y: y1 }} className="flex flex-col gap-8 md:gap-16">
          {col1.map((img, i) => (
            <GalleryItem key={`col1-${i}`} src={img} onClick={() => onImageClick(img)} index={i} />
          ))}
        </motion.div>
        <motion.div style={{ y: y2 }} className="flex flex-col gap-8 md:gap-16 md:mt-32">
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

function Mobile3DCarousel({ images, onImageClick }: { images: string[], onImageClick: (src: string) => void }) {
    // Simple Snap Carousel with 3D perspective effect via CSS/Motion
    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-8 -mx-6 px-12 no-scrollbar perspective-1000">
            {images.map((img, i) => (
                <motion.div 
                    key={i}
                    className="snap-center shrink-0 w-[80vw] h-[50vh] relative shadow-xl rounded-lg overflow-hidden bg-white"
                    onClick={() => onImageClick(img)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ 
                        scale: 1, 
                        opacity: 1,
                        rotateY: 0
                    }}
                    viewport={{ margin: "-10%" }} // Trigger when mostly in view
                    transition={{ type: "spring", damping: 20 }}
                >
                    <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        alt="Project" 
                        loading="lazy"
                    />
                </motion.div>
            ))}
        </div>
    )
}