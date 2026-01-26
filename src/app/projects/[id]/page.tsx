import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Ruler, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  // Await the params object before accessing its properties
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
    include: { gallery: true },
  });

  if (!project) {
    return notFound();
  }

  // Get next/prev projects for navigation
  const nextProject = await prisma.project.findFirst({
      where: { id: { gt: project.id } },
      orderBy: { id: 'asc' }
  });
  
  const prevProject = await prisma.project.findFirst({
      where: { id: { lt: project.id } },
      orderBy: { id: 'desc' }
  });
  
  const contactData = await prisma.contact.findFirst();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-200">
         <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.image}')` }}
         />
         <div className="absolute inset-0 bg-black/30" />
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
            <div className="container mx-auto">
                <Link href="/#projects" className="inline-flex items-center text-sm uppercase tracking-widest mb-6 hover:text-gray-300 transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Projects
                </Link>
                <h1 className="text-4xl md:text-7xl font-serif font-bold mb-2">{project.title}</h1>
                <p className="text-lg md:text-xl font-light opacity-90">{project.category}</p>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 py-24">
         <div className="grid md:grid-cols-3 gap-16">
            {/* Sidebar / Metadata */}
            <div className="md:col-span-1 space-y-8 border-t border-black dark:border-white pt-8">
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
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
                <h2 className="text-2xl font-serif mb-6">About the Project</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.description || "No description available."}
                </p>
            </div>
         </div>

         {/* Gallery */}
         {project.gallery.length > 0 && (
             <div className="mt-32">
                 <h3 className="text-3xl font-serif mb-12">Project Gallery</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                     {project.gallery.map((img) => (
                         <div key={img.id} className="relative h-[400px] md:h-[600px] w-full bg-gray-100 overflow-hidden group">
                             <div 
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${img.url}')` }}
                             />
                         </div>
                     ))}
                 </div>
             </div>
         )}
         
         {/* Navigation Footer */}
         <div className="mt-32 border-t border-gray-200 dark:border-gray-800 pt-16 flex justify-between items-center">
             {prevProject ? (
                 <Link href={`/projects/${prevProject.id}`} className="group">
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">Previous Project</span>
                    <span className="text-2xl font-serif">{prevProject.title}</span>
                 </Link>
             ) : <div />}

             {nextProject ? (
                 <Link href={`/projects/${nextProject.id}`} className="group text-right">
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">Next Project</span>
                    <span className="text-2xl font-serif">{nextProject.title}</span>
                 </Link>
             ) : <div />}
         </div>

      </div>

      <Footer 
        instagram={contactData?.instagram}
        linkedin={contactData?.linkedin}
        behance={contactData?.behance}
      />
    </main>
  );
}