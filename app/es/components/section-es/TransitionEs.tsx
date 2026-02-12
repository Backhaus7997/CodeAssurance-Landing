'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TransitionEs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const gridLines = gridRef.current!.querySelectorAll('.grid-line');
      gsap.fromTo(
        gridLines,
        { scaleX: 0, scaleY: 0 },
        {
          scaleX: 1,
          scaleY: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-[280px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-x-hidden"
    >
      {/* Animated grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
            style={{ left: `${(i + 1) * 8.33}%` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 border border-accent/30 rounded-full mb-6">
            <p className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
              Sistema optimizado
            </p>
          </div>

          <h2 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.95] tracking-tighter max-w-full">
            Precisión.
            <br />
            <span className="text-accent">Control.</span>
            <br />
            Confianza.
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Code Assurance transforma el caos en excelencia sistemática.
            <br />
            Cada línea validada. Cada caso límite cubierto.
          </p>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Detección de bugs
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-800" />
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">10x</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Entrega más rápida
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-800" />
            <div className="text-center">
              <div className="text-5xl font-bold text-accent mb-2">Cero</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Downtime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}