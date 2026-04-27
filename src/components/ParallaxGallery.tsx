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
      className="relative group cursor-zoom-in overflow-hidden shadow-lg mb-8"
      onClick={onClick}
    >
        <div className="w-full relative aspect-[4/3]">
            <Image
                src={src}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </motion.div>
  );
}

function Mobile3DCarousel({ images, onImageClick }: { images: string[], onImageClick: (src: string) => void }) {
    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-8 -mx-6 px-12 no-scrollbar perspective-1000">
            {images.map((img, i) => (
                <motion.div 
                    key={i}
                    className="snap-center shrink-0 w-[85vw] aspect-[4/5] relative shadow-xl rounded-lg overflow-hidden bg-gray-100"
                    onClick={() => onImageClick(img)}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ 
                        scale: 1, 
                        opacity: 1,
                        rotateY: 0
                    }}
                    viewport={{ margin: "-10%" }}
                    transition={{ type: "spring", damping: 20 }}
                >
                    {/* Blurred Background Layer (Fill) */}
                    <div className="absolute inset-0 blur-xl scale-110 opacity-60">
                        <Image
                            src={img}
                            alt="Project Background"
                            fill
                            className="object-cover"
                            sizes="10px"
                        />
                    </div>
                    
                    {/* Sharp Foreground Image (Contain) */}
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                        <div className="relative w-full h-full">
                            <Image 
                                src={img} 
                                alt="Project"
                                fill
                                className="object-contain shadow-sm"
                                sizes="85vw"
                            />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
