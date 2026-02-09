"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { content } from "@/data/content";
import TransitionLink from "@/components/TransitionLink";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const professionalProjects = content.projects.filter(p => !p.type || p.type === "professional");
  const academicProjects = content.projects.filter(p => p.type === "academic");

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 container mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">All Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A complete archive of our architectural and interior design work.
          </p>
        </div>

        {/* Professional Work */}
        <div className="mb-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-rose mb-8 border-b border-gray-200 pb-4">
                Selected Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
            {professionalProjects.map((project, index) => (
                <TransitionLink key={project.id} href={`/projects/${project.id}`} className="group cursor-pointer">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="relative h-[400px] overflow-hidden mb-4">
                        <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${project.image}')` }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <h4 className="text-2xl font-serif mb-1 text-black group-hover:underline decoration-1 underline-offset-4">
                        {project.title}
                    </h4>
                    <p className="text-sm text-gray-700 uppercase tracking-wider">
                        {project.category}
                    </p>
                </motion.div>
                </TransitionLink>
            ))}
            </div>
        </div>

        {/* Academic Work */}
        {academicProjects.length > 0 && (
            <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-rose mb-8 border-b border-gray-200 pb-4">
                    Academic & Research
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                {academicProjects.map((project, index) => (
                    <TransitionLink key={project.id} href={`/projects/${project.id}`} className="group cursor-pointer">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="relative h-[300px] overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url('${project.image}')` }}
                            />
                        </div>
                        <h4 className="text-xl font-serif mb-1 text-black group-hover:underline decoration-1 underline-offset-4">
                            {project.title}
                        </h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {project.category}
                        </p>
                    </motion.div>
                    </TransitionLink>
                ))}
                </div>
            </div>
        )}
      </section>

      <Footer 
        instagram={content.contact.social.instagram}
        linkedin={content.contact.social.linkedin}
      />
    </main>
  );
}