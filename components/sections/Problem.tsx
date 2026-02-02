'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const errors = contentRef.current!.querySelectorAll('.error-item');

      gsap.fromTo(
        errors,
        { opacity: 0, x: -50, rotateX: -20 },
        {
          opacity: 1,
          x: 0,
          rotateX: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // Glitch effect on scroll
      gsap.to(contentRef.current, {
        skewX: 2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const errors = [
    { code: 'ERR_001', message: 'Uncaught TypeError: Cannot read property', impact: 'CRITICAL' },
    { code: 'ERR_002', message: 'Memory leak detected in component lifecycle', impact: 'HIGH' },
    { code: 'ERR_003', message: 'API timeout: Request exceeded 30s limit', impact: 'CRITICAL' },
    { code: 'ERR_004', message: 'UI state desync across multiple clients', impact: 'HIGH' },
    { code: 'ERR_005', message: 'Performance degradation: FPS dropped to 12', impact: 'MEDIUM' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-[128px] px-12 lg:px-16 xl:px-24 bg-black"
    >
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="mb-24 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-red-500 mb-4 font-mono">
            System Failure
          </p>
          <h2 className="text-[clamp(2rem,8vw,6rem)] font-bold leading-[0.95] tracking-tighter">
            Without proper QA,
            <br />
            <span className="text-red-500">everything breaks</span>
          </h2>
        </div>

        <div ref={contentRef} className="space-y-4">
          {errors.map((error, index) => (
            <div
              key={index}
              className="error-item border border-red-500/20 bg-red-500/5 p-6 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-red-500">{error.code}</span>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full font-mono ${
                        error.impact === 'CRITICAL'
                          ? 'bg-red-500 text-white'
                          : error.impact === 'HIGH'
                          ? 'bg-orange-500 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}
                    >
                      {error.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-mono">{error.message}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-500 font-light">
            Production failures. User frustration. Lost revenue.
          </p>
        </div>
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-red-500 animate-glitch" />
      </div>
    </section>
  );
}
