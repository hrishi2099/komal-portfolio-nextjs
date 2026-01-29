"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Ruler } from "lucide-react";
import { content } from "@/data/content";
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const projectId = parseInt(id);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const project = content.projects.find(p => p.id === projectId);

  if (!project) {
    return notFound();
  }

  const currentIndex = content.projects.findIndex(p => p.id === projectId);
  const nextProject = content.projects[currentIndex + 1] || null;
  const prevProject = content.projects[currentIndex - 1] || null;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-sage/50">
         <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url('${project.image}')` }}
            onClick={() => setSelectedImage(project.image)}
         />
         <div className="absolute inset-0 bg-black/30 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white pointer-events-none">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="container mx-auto"
            >
                <Link href="/#projects" className="inline-flex items-center text-sm uppercase tracking-widest mb-6 hover:text-gray-300 transition-colors pointer-events-auto">
                    <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </Link>
                <h1 className="text-4xl md:text-7xl font-serif font-bold mb-2">{project.title}</h1>
                <p className="text-lg md:text-xl font-light opacity-90">{project.category}</p>
            </motion.div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24">
         <div className="grid md:grid-cols-3 gap-16">
            {/* Sidebar / Metadata */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:col-span-1 space-y-8 border-t border-black pt-8"
            >
               {project.year && (
                   <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                          <Calendar size={14} /> Year
                       </h3>
                       <p className="text-xl font-serif">{project.year}</p>
                   </div>
               )}
               {project.location && (
                   <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                          <MapPin size={14} /> Location
                       </h3>
                       <p className="text-xl font-serif">{project.location}</p>
                   </div>
               )}
               {project.area && (
                   <div>
                       <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2">
                          <Ruler size={14} /> Area
                       </h3>
                       <p className="text-xl font-serif">{project.area}</p>
                   </div>
               )}
            </motion.div>

            {/* Main Content */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-2"
            >
                <h2 className="text-2xl font-serif mb-6 text-black">About the Project</h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {project.description || "No description available."}
                </p>
            </motion.div>
         </div>

         {/* Gallery */}
         {project.gallery && project.gallery.length > 0 && (
             <div className="mt-32">
                 <h3 className="text-3xl font-serif mb-12 text-black">Project Gallery</h3>
                 <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="columns-1 md:columns-2 gap-8 space-y-8"
                 >
                     {project.gallery.map((img, index) => (
                         <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="break-inside-avoid relative w-full bg-sage/20 overflow-hidden group cursor-zoom-in"
                            onClick={() => setSelectedImage(img)}
                         >
                             <div className="w-full h-auto">
                                <img 
                                    src={img} 
                                    alt={`Gallery image ${index + 1}`} 
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                             </div>
                         </motion.div>
                     ))}
                 </motion.div>
             </div>
         )}
         
         {/* Navigation Footer */}
         <div className="mt-32 border-t border-gray-200 pt-16 flex justify-between items-center">
             {prevProject ? (
                 <Link href={`/projects/${prevProject.id}`} className="group">
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-hover:text-black transition-colors">Previous Project</span>
                    <span className="text-2xl font-serif text-black">{prevProject.title}</span>
                 </Link>
             ) : <div />}

             {nextProject ? (
                 <Link href={`/projects/${nextProject.id}`} className="group text-right">
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-hover:text-black transition-colors">Next Project</span>
                    <span className="text-2xl font-serif text-black">{nextProject.title}</span>
                 </Link>
             ) : <div />}
         </div>

      </div>

      <Footer 
        instagram={content.contact.social.instagram}
        linkedin={content.contact.social.linkedin}
        behance={content.contact.social.behance}
      />
    </main>
  );
}
