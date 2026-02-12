'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AbstractMesh from '@/components/three/AbstractMesh';

gsap.registerPlugin(ScrollTrigger);

export default function HeroEs() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scale: 0.8,
        opacity: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-[320px]"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <AbstractMesh />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            ref={titleRef}
            className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[1.1] tracking-tighter mb-8"
          >
            CODE
            <br />
            <span className="text-accent">ASSURANCE</span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-400 font-light tracking-wide"
            style={{
              textAlign: 'center',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '48px',
              width: '100%',
            }}
          >
            Servicios de QA, automatización de pruebas y confianza para las releases
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-center gap-4 text-xs tracking-[0.2em] uppercase text-gray-600"
          >
            <div className="w-8 h-px bg-gray-600" />
            <span>Deslizá para explorar</span>
            <div className="w-8 h-px bg-gray-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black opacity-60" />
    </section>
  );
}