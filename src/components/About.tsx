"use client";

import { motion } from "framer-motion";

type Props = {
    heading?: string;
    subheading?: string;
    content?: string;
    image?: string;
    yearsExp?: string;
    projectsCount?: string;
    profileName?: string;
    profileTitle?: string;
};

export default function About({ heading, subheading, content, image, yearsExp, projectsCount, profileName, profileTitle }: Props) {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            {heading || "Philosophy"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            {subheading || "We believe that good design is obvious. Great design is transparent."}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            {content || "With a focus on minimalism and functionality, I strive to create spaces that are not only visually stunning but also deeply livable. My approach combines architectural precision with interior warmth, resulting in holistic environments."}
          </p>
          <div className="flex gap-8">
            <div>
              <span className="block text-3xl font-serif">{yearsExp || "5+"}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">Years Exp.</span>
            </div>
            <div>
              <span className="block text-3xl font-serif">{projectsCount || "20+"}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">Projects</span>
            </div>
          </div>
        </motion.div>

        {/* Image Side - Now acting as Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
           <div className="relative h-[500px] w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div 
                    className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url('${image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"}')` }} 
                />
           </div>
           
           {/* Profile Label */}
           <div className="absolute bottom-6 left-6 bg-white dark:bg-black p-4 shadow-lg max-w-[80%]">
               <h4 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                   {profileName || "Ar. Komal Amle"}
               </h4>
               <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                   {profileTitle || "Principal Architect"}
               </p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
