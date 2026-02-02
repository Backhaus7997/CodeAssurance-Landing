"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Reset status when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (status === "loading") return;
    
    const form = e.currentTarget;
    
    // Validate form before submission
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    setStatus("loading");
    setErrorMessage("");
    
    const formData = new FormData(form);
    
    // Add metadata
    formData.append("_subject", "New Website Lead - Code Assurance");
    formData.append("source", "website-modal");
    formData.append("timestamp", new Date().toISOString());
    
    try {
      const res = await fetch("https://formspree.io/f/mlglpzgn", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });
      
      // Always try to parse JSON response
      const data = await res.json().catch(() => null);
      
      if (res.ok) {
        setStatus("success");
        setErrorMessage("");
        form.reset();
      } else {
        // Handle Formspree-specific errors
        let message = "Something went wrong. Please try again.";
        
        if (data?.errors && Array.isArray(data.errors)) {
          // Check for email validation error
          const emailError = data.errors.find((err: any) => err.field === "email");
          if (emailError) {
            message = "Please enter a valid email address.";
          } else if (data.errors[0]?.message) {
            // Use first error message if available
            message = data.errors[0].message;
          }
        }
        
        setErrorMessage(message);
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

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
            onClick={handleClose}
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
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-4xl font-extrabold !mb-6 text-center text-accent" style={{ lineHeight: '1.2' }}>¡Talk to Engineers!</h2>

              <p className="text-white/60 mb-10 text-center">
                Leave your details and we'll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                
                <input
                  type="text"
                  name="firstName"
                  required
                  minLength={3}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="text"
                  name="lastName"
                  required
                  minLength={3}
                  placeholder="Your surname"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email@Email.com"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  pattern="[0-9]*"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                  }}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent"
                />

                <textarea
                  name="message"
                  required
                  minLength={10}
                  placeholder="Tell us briefly what you need"
                  rows={4}
                  className="flex-1 w-full px-5 py-4 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-accent resize-none"
                />

                <div className="mt-auto pt-12">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-5 bg-accent text-black font-bold rounded-full text-lg hover:bg-accent-dim transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? "Sending..." : "Get expert advice"}
                    </button>
                    
                    {status === "success" && (
                      <p className="mt-6 text-center font-medium text-green-400">
                        Message sent ✅ We'll be in touch shortly.
                      </p>
                    )}
                    
                    {status === "error" && (
                      <p className="mt-6 text-center font-medium text-red-400">
                        {errorMessage || "Something went wrong. Please try again."}
                      </p>
                    )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}