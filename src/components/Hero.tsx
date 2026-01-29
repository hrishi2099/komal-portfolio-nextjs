"use client";

import { motion, Variants } from "framer-motion";
import ArchitecturalGrid from "./ArchitecturalGrid";

type Props = {
  heading?: string;
  subheading?: string;
  backgroundImage?: string;
};

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: "0%", 
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1]
    } 
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Hero({ heading, subheading, backgroundImage }: Props) {
  // Safe default
  const rawHeading = heading || "Designing <br /> <span class='italic font-light text-gray-600 dark:text-gray-400'>Timeless</span> Spaces";
  
  // Split heading by <br /> to animate lines separately
  const headingLines = rawHeading.split(/<br\s*\/?>/i);

  // Split subheading into words for fine-grained stagger
  const rawSubheading = subheading || "Architecture & Interior Design Portfolio of Komal. Crafting environments that inspire and endure.";
  const subheadingWords = rawSubheading.split(" ");

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-sage/50"
    >
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }} // Subtle zoom effect
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop"}')` }} 
        />
        <ArchitecturalGrid />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Staggered Heading Lines */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
        >
            {headingLines.map((line, index) => (
                <div key={index} className="overflow-hidden inline-block align-bottom mx-2 md:mx-0 md:block">
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-8xl font-serif font-bold tracking-tight text-gray-900 leading-tight"
                        dangerouslySetInnerHTML={{ __html: line }}
                    />
                </div>
            ))}
        </motion.div>
        
        {/* Staggered Subheading Words */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.03, delayChildren: 1 } }
          }}
          className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-gray-800 flex flex-wrap justify-center gap-x-1.5"
        >
          {subheadingWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}