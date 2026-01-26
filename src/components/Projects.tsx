"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
    id: number;
    title: string;
    category: string;
    image: string;
};

type Props = {
    projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <section id="projects" className="py-24 bg-stone-50 dark:bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            Selected Works
          </h2>
          <h3 className="text-4xl font-serif">Featured Projects</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] overflow-hidden mb-4">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <h4 className="text-2xl font-serif mb-1 group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  {project.category}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
            <button className="px-8 py-3 border border-black dark:border-white uppercase text-xs tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                View All Projects
            </button>
        </div>
      </div>
    </section>
  );
}
