"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

type Props = {
  email?: string;
  phone?: string;
  address?: string;
  ctaText?: string;
  ctaSub?: string;
};

export default function Contact({ email, phone, address, ctaText, ctaSub }: Props) {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-rose mb-4">
            Get in Touch
          </h2>
          <h3 className="text-4xl font-serif mb-6">{ctaText || "Let's build something beautiful."}</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {ctaSub || "Available for new projects and collaborations."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h4 className="font-serif text-lg mb-1">Email</h4>
                <a href={`mailto:${email || "hello@komal.design"}`} className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                  {email || "hello@komal.design"}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h4 className="font-serif text-lg mb-1">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">{phone || "+1 (555) 123-4567"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <h4 className="font-serif text-lg mb-1">Studio</h4>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {address || "123 Design Avenue\nCreative District, NY 10012"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Email</label>
              <input 
                type="email" 
                id="email"
                className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Message</label>
              <textarea 
                id="message"
                rows={4}
                className="w-full border-b border-gray-300 dark:border-gray-700 bg-transparent py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
              ></textarea>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-rose text-white dark:bg-white dark:text-black uppercase text-xs tracking-widest hover:opacity-80 transition-opacity"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}