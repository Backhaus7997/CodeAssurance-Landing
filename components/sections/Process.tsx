'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Analyze',
    description: 'Deep code analysis and architecture review',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Test strategy and coverage planning',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Automated and manual testing protocols',
  },
  {
    number: '04',
    title: 'Monitor',
    description: 'Continuous integration and performance tracking',
  },
  {
    number: '05',
    title: 'Optimize',
    description: 'Refinement and quality assurance loops',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      steps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${index * 20}% center`,
          end: `top+=${(index + 1) * 20}% center`,
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[280px] px-12 lg:px-16 xl:px-24">
      <div className="mb-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
          Our Process
        </p>
        <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter">
          Systematic
          <br />
          Excellence
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-[1280px]">
          {/* Left: Progress indicator */}
          <div className="lg:sticky lg:top-32">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeStep ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`text-6xl font-bold transition-colors duration-500 ${
                        index === activeStep ? 'text-accent' : 'text-gray-800'
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="flex-1 pt-3">
                      <h3 className="text-3xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-500 text-lg">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual representation */}
          <div className="h-[600px] relative">
            <div className="sticky top-32">
              <div className="relative w-full h-[400px] border border-border rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-transparent">
                {/* Animated progress bars */}
                <div className="absolute inset-0 p-8 flex flex-col justify-center space-y-4">
                  {steps.map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="text-xs text-gray-600 font-mono">
                        Step {(index + 1).toString().padStart(2, '0')}
                      </div>
                      <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-1000"
                          style={{
                            width: index < activeStep ? '100%' : index === activeStep ? '60%' : '0%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-accent/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-accent/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-accent/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-accent/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
