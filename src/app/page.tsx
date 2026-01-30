import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { content } from "@/data/content";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero 
        heading={content.hero.heading} 
        subheading={content.hero.subheading} 
        backgroundImage={content.hero.backgroundImage}
      />
      <About 
        heading={content.about.heading}
        subheading={content.about.subheading}
        content={content.about.content}
        image={content.about.image}
        yearsExp={content.about.stats.yearsExp}
        projectsCount={content.about.stats.projectsCount}
        profileName={content.about.profileName}
        profileTitle={content.about.profileTitle}
      />
      <Projects projects={content.projects} />
      <Contact 
        email={content.contact.email}
        phone={content.contact.phone}
        address={content.contact.address}
        ctaText={content.contact.ctaText}
        ctaSub={content.contact.ctaSub}
      />
      <Footer 
        instagram={content.contact.social.instagram}
        linkedin={content.contact.social.linkedin}
      />
    </main>
  );
}
