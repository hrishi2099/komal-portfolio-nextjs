"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Ruler, FileText, Image as ImageIcon } from "lucide-react";
import { content } from "@/data/content";
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import ParallaxGallery from "@/components/ParallaxGallery"; // Import new component
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const projectId = parseInt(id);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBlueprint, setShowBlueprint] = useState(false);
  
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
      
      {/* Hero Image Container */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-sage/50 overflow-hidden">
         <AnimatePresence mode="wait">
            {showBlueprint && project.blueprint ? (
                <motion.div 
                    key="blueprint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white p-8 md:p-16 flex items-center justify-center cursor-zoom-in"
                    onClick={() => setSelectedImage(project.blueprint!)}
                >
                    <div className="relative w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <img 
                            src={project.blueprint} 
                            alt="Blueprint" 
                            className="w-full h-full object-contain filter grayscale contrast-125"
                        />
                        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 text-xs font-mono border border-black">
                            TECHNICAL DRAWING
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="photo"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url('${project.image}')` }}
                    onClick={() => setSelectedImage(project.image)}
                />
            )}
         </AnimatePresence>

         <div className="absolute inset-0 bg-black/30 pointer-events-none" />
         
         {/* Blueprint Toggle Button */}
         {project.blueprint && (
             <div className="absolute top-24 right-6 md:top-32 md:right-12 z-20">
                 <button 
                    onClick={() => setShowBlueprint(!showBlueprint)}
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
                 >
                    {showBlueprint ? <ImageIcon size={14} /> : <FileText size={14} />}
                    {showBlueprint ? "View Photo" : "View Blueprint"}
                 </button>
             </div>
         )}

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

         {/* Parallax Gallery */}
         {project.gallery && project.gallery.length > 0 && (
             <div className="mt-32">
                 <h3 className="text-3xl font-serif mb-12 text-black">Project Gallery</h3>
                 <ParallaxGallery images={project.gallery} onImageClick={setSelectedImage} />
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
      />
    </main>
  );
}
