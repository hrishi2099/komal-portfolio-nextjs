import { Instagram, Linkedin } from "lucide-react";

type Props = {
    instagram?: string;
    linkedin?: string;
};

export default function Footer({ instagram, linkedin }: Props) {
  return (
    <footer className="py-8 border-t border-gray-100 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ar. Komal Amle. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {instagram && (
            <a 
              href={instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
