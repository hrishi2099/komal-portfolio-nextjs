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
    email: "architect.amle@gmail.com",
    phone: "+91 9158726789",
    address: "Stature, Sinhgad Road\nPune - 411041",
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
      image: "/projects/balaji-temple.jpeg",
      description: "Proposed design for the Balaji Temple, focusing on traditional architectural elements blended with modern structural integrity. The design emphasizes spiritual serenity, grand entranceways, and intricate stone carvings reflecting the deity's heritage. (Please update this text from the docx file).",
      year: "2024",
      location: "India",
      area: "TBD",
      gallery: [
        "/projects/balaji-temple.jpeg",
        "/projects/balaji-temple-1.jpeg",
        "/projects/balaji-temple-2.jpeg",
        "/projects/balaji-temple-3.jpeg"
      ]
    },
    {
      id: 2,
      title: "Lata Mangeshkar Music Academy",
      category: "Institutional Architecture",
      image: "/projects/lata-academy-6.jpg",
      description: "A tribute to the legendary Nightingale of India. This Music Academy is designed to be a harmonious blend of acoustic excellence and architectural beauty. The structure features dedicated practice halls, a grand auditorium, and open-air performance spaces, all inspired by the rhythm and flow of music. (Please update this text from the docx file).",
      year: "2023",
      location: "India",
      area: "TBD",
      gallery: [
        "/projects/lata-academy.jpg",
        "/projects/lata-academy-1.jpg",
        "/projects/lata-academy-2.jpg",
        "/projects/lata-academy-3.jpg",
        "/projects/lata-academy-4.jpg",
        "/projects/lata-academy-5.jpg",
        "/projects/lata-academy-6.jpg"
      ]
    },
    {
      id: 3,
      title: "Shambhu Srushti",
      category: "Memorial & Landscape",
      image: "/projects/shambhu-srushti.jpg",
      description: "A monumental project dedicated to Chatrapati Sambhaji Maharaj. This design integrates historical significance with landscape architecture, creating a space for reflection and reverence. The statue stands as a focal point, surrounded by landscaped gardens that narrate the history of the Maratha Empire. (Please update this text from the docx file).",
      year: "2023",
      location: "India",
      area: "TBD",
      gallery: [
        "/projects/shambhu-srushti.jpg",
        "/projects/shambhu-srushti-1.jpg",
        "/projects/shambhu-srushti-2.jpg",
        "/projects/shambhu-srushti-3.jpg",
        "/projects/shambhu-srushti-c.jpg"
      ]
    }
  ]
};
