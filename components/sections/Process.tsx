'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Analyze',
    subtitle: 'Deep code analysis and architecture review',
    queHacemos: [
      'Audit critical flows and risk points',
      'Review bug patterns and CI failures',
      'Prioritize by impact'
    ],
    entregables: [
      'Risk map by module',
      'Quick wins list',
      'Prioritized QA backlog'
    ],
    impacto: [
      'Fewer surprises at release',
      'Focus on critical issues',
      'Clear plan in days'
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Design',
    subtitle: 'Test strategy and coverage planning',
    queHacemos: [
      'Define strategy by levels (smoke/regression/E2E/API)',
      'Establish go/no-go criteria',
      'Design data strategy and coverage'
    ],
    entregables: [
      'Test strategy document',
      'Coverage↔risk matrix',
      'CI plan with gates'
    ],
    impacto: [
      'Measurable quality',
      'Consistent feedback',
      'Clear exit rules'
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'Execute',
    subtitle: 'Automated and manual testing protocols',
    queHacemos: [
      'Automate E2E where it adds most value',
      'Execute focused regression',
      'Record clear evidence (logs/screens)'
    ],
    entregables: [
      'Stable test suite',
      'Reports per PR/release',
      'Exit checklist'
    ],
    impacto: [
      'Fewer bugs in prod',
      'Release with confidence',
      'Faster cycle'
    ]
  },
  {
    id: 4,
    number: '04',
    title: 'Monitor',
    subtitle: 'Continuous integration and performance tracking',
    queHacemos: [
      'Monitor early signals (CI/health checks)',
      'Track flaky tests',
      'Configure alerts for critical failures'
    ],
    entregables: [
      'Trends dashboard',
      'Stability alerts',
      'Weekly report'
    ],
    impacto: [
      'Fewer incidents',
      'Visible stability',
      'Less flakiness'
    ]
  },
  {
    id: 5,
    number: '05',
    title: 'Optimize',
    subtitle: 'Refinement and quality assurance loops',
    queHacemos: [
      'Refine suites based on product changes',
      'Reduce maintenance and flakiness',
      'Improve pipeline performance'
    ],
    entregables: [
      'QA roadmap',
      'Test refactors and hardening',
      'CI time improvements'
    ],
    impacto: [
      'Faster CI',
      'Lower QA cost',
      'Sustainable process'
    ]
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section className="relative pt-[280px] pb-[400px] px-12 lg:px-16 xl:px-24 mb-32 lg:mb-40 xl:mb-48">
      <div className="mb-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
          Our Process
        </p>
        <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter">
          Systematic Excellence
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid lg:grid-cols-[480px_1fr] gap-12 items-start max-w-[1280px] w-full">
          {/* Left: Interactive Steps */}
          <div className="flex flex-col py-4" style={{ gap: '18px' }}>
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                role="tab"
                aria-selected={index === activeStep}
                className={`w-full text-left transition-all duration-500 rounded-lg border relative ${
                  index === activeStep
                    ? 'bg-accent/5 border-accent/50 shadow-lg shadow-accent/20'
                    : 'bg-transparent border-white/10 hover:border-white/20'
                }`}
                style={{ padding: '18px', minHeight: '92px' }}
              >
                <div className="flex items-start" style={{ gap: '16px' }}>
                  <div
                    className={`text-3xl font-bold transition-colors duration-500 ${
                      index === activeStep ? 'text-accent' : 'text-gray-700'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold transition-colors duration-500 ${
                      index === activeStep ? 'text-white' : 'text-gray-400'
                    }`} style={{ marginBottom: '6px' }}>
                      {step.title}
                    </h3>
                    <p className={`text-xs transition-colors duration-500 ${
                      index === activeStep ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Active indicator as overlay */}
                {index === activeStep && (
                  <div className="absolute right-0 top-0 h-full w-1 bg-accent rounded-r-lg" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Content Panel */}
          <div className="lg:sticky lg:top-32">
            <div className="relative border border-border rounded-lg overflow-hidden bg-gradient-to-br from-accent/15 to-transparent" style={{ padding: '48px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
                >
                  {/* What we do */}
                  <div>
                    <h4 className="text-accent text-sm font-mono uppercase tracking-wider font-bold" style={{ marginBottom: '20px' }}>
                      What we do
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {currentStep.queHacemos.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 self-start translate-y-[0.45rem]" />
                          <span className="text-gray-300 text-sm" style={{ lineHeight: '1.8' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-accent text-sm font-mono uppercase tracking-wider font-bold" style={{ marginBottom: '20px' }}>
                      Deliverables
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {currentStep.entregables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 self-start translate-y-[0.45rem]" />
                          <span className="text-gray-300 text-sm" style={{ lineHeight: '1.8' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-accent text-sm font-mono uppercase tracking-wider font-bold" style={{ marginBottom: '20px' }}>
                      Impact
                    </h4>
                    <div className="flex flex-wrap" style={{ gap: '14px' }}>
                      {currentStep.impacto.map((item, i) => (
                        <div
                          key={i}
                          className="bg-accent/10 border border-accent/30 rounded-full"
                          style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px', minHeight: '36px' }}
                        >
                          <span className="text-accent text-sm font-medium leading-none">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="border-t border-white/10" style={{ marginTop: '16px', paddingTop: '32px' }}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-mono">Progress</span>
                        <span className="text-xs text-accent font-mono font-bold">{Math.round(progress)}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
                        {/* Progress fill */}
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-accent/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-accent/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
