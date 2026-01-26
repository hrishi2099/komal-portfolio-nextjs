import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const heroData = await prisma.hero.findFirst();
  const aboutData = await prisma.about.findFirst();
  const projectsData = await prisma.project.findMany({
    orderBy: { id: 'asc' } 
  });
  const contactData = await prisma.contact.findFirst();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero 
        heading={heroData?.heading} 
        subheading={heroData?.subheading} 
        backgroundImage={heroData?.backgroundImage}
      />
      <About 
        heading={aboutData?.heading}
        subheading={aboutData?.subheading}
        content={aboutData?.content}
        image={aboutData?.image}
        yearsExp={aboutData?.yearsExp}
        projectsCount={aboutData?.projectsCount}
        profileName={aboutData?.profileName}
        profileTitle={aboutData?.profileTitle}
      />
      <Projects projects={projectsData} />
      <Contact 
        email={contactData?.email}
        phone={contactData?.phone}
        address={contactData?.address}
        ctaText={contactData?.ctaText}
        ctaSub={contactData?.ctaSub}
      />
      <Footer 
        instagram={contactData?.instagram}
        linkedin={contactData?.linkedin}
        behance={contactData?.behance}
      />
    </main>
  );
}