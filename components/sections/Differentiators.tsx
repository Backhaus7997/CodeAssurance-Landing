'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  { text: 'Built by engineers,', highlight: 'for engineers' },
  { text: 'Quality is not optional,', highlight: "it's engineered" },
  { text: 'We find bugs', highlight: 'before users do' },
];

export default function Differentiators() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const statements = sectionRef.current!.querySelectorAll('.statement');

      statements.forEach((statement, index) => {
        gsap.fromTo(
          statement,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: statement,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );

        // Background color shift
        ScrollTrigger.create({
          trigger: statement,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(sectionRef.current, {
              backgroundColor: index % 2 === 0 ? '#000000' : '#050505',
              duration: 0.5,
            });
          },
          onEnterBack: () => {
            gsap.to(sectionRef.current, {
              backgroundColor: index % 2 === 0 ? '#000000' : '#050505',
              duration: 0.5,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[320px] px-12 lg:px-16 xl:px-24 bg-black">
      <div className="space-y-[240px]">
        {differentiators.map((item, index) => (
          <div key={index} className="statement text-center">
            <h2 className="text-[clamp(2rem,10vw,7rem)] font-bold leading-[0.95] tracking-tighter">
              {item.text}
              <br />
              <span className="text-accent">{item.highlight}</span>
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
