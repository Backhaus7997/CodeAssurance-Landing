"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 md:px-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-full max-w-5xl min-h-[520px] bg-black border border-white/10 
            rounded-3xl py-20 px-32 text-white relative flex flex-col">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-4xl font-extrabold !mb-6 text-center text-accent" style={{ lineHeight: '1.2' }}>¡Talk to Engineers!</h2>

              <p className="text-white/60 mb-10 text-center">
                Leave your details and we'll get back to you.
              </p>

              <form className="flex flex-col flex-1 gap-6" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Your surname"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  pattern="[0-9]*"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <textarea
                required
                minLength={10}
                  placeholder="Tell us briefly what you need"
                  rows={4}
                  className="flex-1 w-full px-5 py-4 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent resize-none"
                />

                <div className="mt-auto pt-12">
                    <button
                        type="submit"
                        className="w-full py-5 bg-accent text-black font-bold rounded-full text-lg hover:bg-accent-dim transition"
                    >
                        Get expert advice
                    </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}