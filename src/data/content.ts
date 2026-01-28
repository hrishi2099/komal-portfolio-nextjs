export type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  year?: string;
  location?: string;
  area?: string;
  gallery?: string[];
};

export const content: {
  hero: {
    heading: string;
    subheading: string;
    backgroundImage: string;
  };
  about: {
    heading: string;
    subheading: string;
    content: string;
    image: string;
    profileName: string;
    profileTitle: string;
    stats: {
      yearsExp: string;
      projectsCount: string;
    };
  };
  contact: {
    ctaText: string;
    ctaSub: string;
    email: string;
    phone: string;
    address: string;
    social: {
      instagram: string;
      linkedin: string;
      behance: string;
    };
  };
  projects: Project[];
} = {
  hero: {
    heading: "Designing <br /> <span class='italic font-light text-gray-600'>Timeless</span> Spaces",
    subheading: "Architecture & Interior Design Portfolio of Komal. Crafting environments that inspire and endure.",
    backgroundImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop", 
  },
  about: {
    heading: "Philosophy",
    subheading: "We believe that good design is obvious. Great design is transparent.",
    content: "With a focus on minimalism and functionality, I strive to create spaces that are not only visually stunning but also deeply livable. My approach combines architectural precision with interior warmth, resulting in holistic environments.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop", // Profile Photo
    profileName: "Ar. Komal Amle",
    profileTitle: "Principal Architect",
    stats: {
      yearsExp: "5+",
      projectsCount: "20+",
    }
  },
  contact: {
    ctaText: "Let's build something beautiful.",
    ctaSub: "Available for new projects and collaborations.",
    email: "hello@komal.design",
    phone: "+1 (555) 123-4567",
    address: "123 Design Avenue\nCreative District, NY 10012",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      behance: "https://behance.net",
    }
  },
  projects: [
    {
      id: 1,
      title: "Balaji Temple",
      category: "Religious Architecture",
      image: "/uploads/Balaji Temple.jpeg",
      description: "Proposed design for the Balaji Temple, focusing on traditional architectural elements blended with modern structural integrity. The design emphasizes spiritual serenity, grand entranceways, and intricate stone carvings reflecting the deity's heritage.",
      year: "2024",
      location: "India",
      area: "TBD",
      gallery: [
        "/uploads/Balaji Temple(1).jpeg",
        "/uploads/Balaji Temple(2).jpeg",
        "/uploads/Balaji Temple(3).jpeg"
      ]
    }
  ]
};
