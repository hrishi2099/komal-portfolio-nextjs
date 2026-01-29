"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/content";

type Props = {
    projects: Project[];
};

export default function Projects({ projects }: Props) {
  // Show only the first 4 projects on the homepage
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-sage/20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-rose mb-4">
            Selected Works
          </h2>
          <h3 className="text-4xl font-serif text-black">Featured Projects</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
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
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
            <Link href="/projects">
                <button className="px-8 py-3 border border-rose text-black uppercase text-xs tracking-widest hover:bg-rose hover:text-white transition-colors">
                    View All Projects
                </button>
            </Link>
        </div>
      </div>
    </section>
  );
}