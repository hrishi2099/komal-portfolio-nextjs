type Props = {
    instagram?: string;
    linkedin?: string;
    behance?: string;
};

export default function Footer({ instagram, linkedin, behance }: Props) {
  return (
    <footer className="py-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Komal. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href={instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
          <a href={linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
          <a href={behance || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
}