import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { content } from "@/data/content";

export default function ProjectsPage() {
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

        <div className="grid md:grid-cols-2 gap-8">
          {content.projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group cursor-pointer">
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
            </Link>
          ))}
        </div>
      </section>

      <Footer 
        instagram={content.contact.social.instagram}
        linkedin={content.contact.social.linkedin}
        behance={content.contact.social.behance}
      />
    </main>
  );
}
