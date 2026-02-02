'use client';

import { motion } from 'framer-motion';
import { useState } from "react";
import ContactModal from "@/components/ui/ContactModal";

export default function FinalCTA() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6" style={{ paddingTop: '128px', paddingBottom: '32px' }}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono text-center">
              Ready to elevate your code
            </p>
            <h2 className="text-[clamp(2.5rem,10vw,6rem)] font-bold leading-[1.1] tracking-tighter mb-8 text-center">
              Let's build
              <br />
              <span className="text-accent">something flawless</span>
            </h2>
            <p className="text-xl text-gray-400 font-light" style={{ textAlign: 'center', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
              Talk to our engineering team about your quality assurance needs
            </p>
          </div>

          <motion.button
            onClick={() => setIsContactOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center bg-accent text-black font-bold rounded-full overflow-hidden transition-all duration-300"
            style={{
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              paddingBottom: '10px',
              gap: '12px',
              fontSize: '16px',
              marginTop: '20px',
              marginBottom: '32px'
            }}
          >
            <span className="relative z-10">Talk to Engineers</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-accent-dim scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.button>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div>
              <span className="font-mono">martin.backhaus@code-assurance.com</span>
            </div>
            <div className="w-px h-4 bg-gray-800" />
            <div>
              <span className="font-mono">+54 9 351 268 2001</span>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Corner accents */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-accent/20" />
      <div className="absolute top-12 right-12 w-24 h-24 border-r border-t border-accent/20" />
      <div className="absolute bottom-12 left-12 w-24 h-24 border-l border-b border-accent/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-accent/20" />
    </section>
  );
}
