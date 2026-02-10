'use client';

import { useState } from 'react';
import Link from 'next/link';

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-8 pt-28 pb-16 lg:px-16 xl:px-24">
      {children}
    </div>
  );
}

export default function CodeQualityPage() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Assess quality risk (where things break)',
      bullets: [
        'Identify hotspots: high-churn modules, repeated bug zones, fragile boundaries',
        'Map risk → recommended controls (tests, checks, refactor targets)',
      ],
    },
    {
      title: 'Enforce standards (quality gates that stick)',
      bullets: [
        'Define merge-ready rules: lint/format/static analysis + thresholds where applicable',
        'PR hygiene: templates, checklists, ownership, review signals',
      ],
    },
    {
      title: 'Reduce debt without slowing delivery',
      bullets: [
        'Refactor targets chosen by business risk (bugs/rework/maintainability), not preference',
        'Safe changes strategy: small PRs, guardrails, CI evidence',
      ],
    },
  ];

  return (
    <main className="min-h-screen flex justify-center pt-8 pb-32">
      <PageContainer>
        <div className="flex w-full flex-col items-center gap-12">
        <section className="w-full space-y-6 text-center flex flex-col items-center">
          <div className="w-full max-w-3xl flex flex-col items-center space-y-4 text-center">
            <div className="inline-block bg-accent/10 border border-accent/30 rounded-full" style={{ paddingLeft: '30px', paddingRight: '20px', paddingTop: '6px', paddingBottom: '6px' }}>
              <span className="text-accent text-xs tracking-[0.9em] uppercase font-mono">Service</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-accent md:text-5xl text-center">
              Code Quality that prevents regressions
            </h1>
            <p className="text-lg text-gray-300 text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
              Standards, risk hotspots, and technical debt control so your delivery stays predictable.
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
            <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
              Promise
            </p>
            <div className="mt-4 space-y-3 text-center">
              {[
                'Quality gates that match real risk (not bureaucracy)',
                'Actionable debt list (prioritized by impact)',
                'Cleaner PRs, fewer rework cycles',
              ].map((item) => (
                <div key={item} className="flex items-center justify-center text-gray-300" style={{ gap: '12px' }}>
                  <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-base font-mono leading-snug text-center">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full space-y-6 text-center">
          <h2 className="text-4xl font-bold text-accent text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>What you get</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {[
              {
                title: 'Quality baseline',
                detail: 'Hotspots, complexity signals, churn areas, and where bugs repeat—so we fix the right things first.',
              },
              {
                title: 'Quality gates & standards',
                detail: 'PR checklist + Definition of Done + automated checks aligned to your team’s workflow.',
              },
              {
                title: 'Prioritized debt plan',
                detail: 'High-ROI fixes and refactors ranked by impact × likelihood (not cosmetic cleanup).',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative w-full max-w-[480px] bg-black/50 border border-accent/70 shadow-[0_0_0_1px_rgba(0,255,136,0.25)] rounded-2xl hover:border-accent transition-all duration-300 text-left"
                style={{
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '32px',
                  paddingBottom: '36px',
                }}
              >
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors" style={{ marginBottom: '16px' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 font-mono">{item.detail}</p>

                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </section>

        <section className="w-full space-y-8 text-center">
          <h2 className="text-4xl font-bold text-accent text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>How it works</h2>

          <div className="grid gap-4 md:grid-cols-3 justify-items-center items-start">
            {howItWorksCards.map((card, index) => {
              const isOpen = expandedHowItWorks === index;

              return (
                <div
                  key={card.title}
                  className="group relative w-full max-w-[480px] self-start bg-black/50 border border-accent/70 shadow-[0_0_0_1px_rgba(0,255,136,0.25)] rounded-2xl hover:border-accent transition-all duration-300 text-left"
                  style={{
                    paddingLeft: '32px',
                    paddingRight: '32px',
                    paddingTop: '32px',
                    paddingBottom: '36px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedHowItWorks(isOpen ? null : index)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold group-hover:text-accent transition-colors" style={{ marginBottom: isOpen ? '16px' : '0px' }}>
                        {card.title}
                      </h3>
                      <span className="text-accent font-mono text-2xl">{isOpen ? '−' : '+'}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="space-y-3">
                      {card.bullets.map((item) => (
                        <div key={item} className="flex items-start gap-4">
                          <div className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0" style={{ marginTop: '0.45rem' }} />
                          <span className="text-base text-gray-300 font-mono leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="w-full space-y-6">
          <h2 className="text-4xl font-bold text-accent text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>Evidence you will actually see</h2>
          {(() => {
            const evidenceItems = [
              'Quality baseline report (hotspots + rationale)',
              'Quality gates checklist + PR template',
              'Before/after examples (lint issues, duplication, flaky areas)',
              'Debt backlog (impact, owner, ETA, why now)',
            ];
            const left = evidenceItems.slice(0, 2);
            const right = evidenceItems.slice(2, 4);

            return (
              <div className="mx-auto w-full max-w-10xl text-left pt-8 space-y-10">
                <div className="grid w-full gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    {left.map((item) => (
                      <div key={item} className="flex items-start gap-4">
                        <div className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0" style={{ marginTop: '0.45rem' }} />
                        <span className="text-gray-300 font-mono leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {right.map((item) => (
                      <div key={item} className="flex items-start gap-4">
                        <div className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0" style={{ marginTop: '0.45rem' }} />
                        <span className="text-gray-300 font-mono leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-100 font-mono font-semibold text-center" style={{ marginTop: '20px' }}>
                  Evidence over opinions: every recommendation maps to measurable risk.
                </p>
              </div>
            );
          })()}
        </section>

        <section className="w-full space-y-6 text-center">
  <h2 className="text-4xl font-bold text-accent text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
    Tools & stack
  </h2>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
    {[
      { title: 'Static Analysis & Type Safety (ESLint / SonarQube / TypeScript)', detail: 'Lint + strict rules to prevent risky patterns, catch regressions early (contracts, nullability, unsafe calls).' },
      { title: 'CI Quality Gates (Jenkins + Git workflows)', detail: 'Merge-ready rules: lint, tests, coverage thresholds, and quality checks enforced on every PR.' },
      { title: 'Automation Signals (Playwright / Cypress / Selenium)', detail: 'CI quality signals from critical journeys/regression to keep maintainability and prevent silent breakage.' },
      { title: 'API & Contract Checks (Postman / contract checks)', detail: 'Faster feedback loops; validate integration behavior without the cost/flake risk of UI-only coverage.' },
      { title: 'Tracking & Test Management (Jira + TestRail)', detail: 'Traceability, recurring defect hotspots, ownership, and regression packs that stay actionable.' },
      { title: 'Safe Refactoring + Data Integrity (small PRs + guardrails + SQL validation)', detail: 'Refactor safely with measurable impact; verify data integrity and detect broken flows caused by backend changes.' },
    ].map((item) => (
      <div
        key={item.title}
        className="group relative w-full max-w-[480px] bg-black/50 border border-accent/70 shadow-[0_0_0_1px_rgba(0,255,136,0.25)] rounded-2xl hover:border-accent transition-all duration-300 text-left"
        style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '32px', paddingBottom: '36px' }}
      >
        <h3 className="text-2xl font-bold group-hover:text-accent transition-colors" style={{ marginBottom: '16px' }}>
          {item.title}
        </h3>
        <p className="text-sm text-gray-300 font-mono">{item.detail}</p>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      </div>
    ))}
  </div>
</section>

<section className="w-full space-y-8 text-center">
  <h2
    className="text-4xl font-bold text-accent text-center"
    style={{ marginTop: '20px', marginBottom: '20px' }}
  >
    FAQs
  </h2>

  <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-2" style={{ marginTop: '20px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
    {[
      {
        q: 'What do you mean by “Code Quality” in practice?',
        a: 'Code quality is how safe it is to change the code. We focus on standards + fast CI feedback to reduce regressions.',
      },
      {
        q: 'How do you find quality hotspots quickly?',
        a: 'We target high-churn modules, repeated bug areas, and fragile boundaries (UI/API/DB). Then we map each hotspot to a concrete control.',
      },
      {
              q: 'Do you enforce standards without slowing delivery?',
              a: 'Yes, PR gates stay minimal but effective (format/lint + key tests). We phase in stricter rules gradually.',
            },
            {
              q: 'What should be a merge blocker vs a warning?',
              a: 'Blockers: broken lint/format, failing critical tests, failing types/security checks.\nWarnings: style improvements and non-critical rule violations.',
            },
            {
              q: 'How do you reduce technical debt without massive rewrites?',
              a: 'We prioritize debt by business risk, then refactor in small PRs with guardrails. Every change ships with CI evidence.',
            },
            {
              q: 'Can you work with React and .NET backends / complex workflows?',
              a: 'Yes. We focus controls on real boundaries: permissions, integrations, and data consistency.',
            },
            {
              q: 'What deliverables do engineers actually get?',
              a: 'A PR gate setup, a hotspot map, prioritized refactor targets, and reusable checklists. Everything is actionable.',
            },
            {
              q: 'How do you measure improvement over time?',
              a: 'Fewer regressions and lower rework, plus more stable CI (better pass/flake rate). Faster PR throughput because issues are caught earlier.',
            },
    ].map((item) => (
      <details
        key={item.q}
        className="group w-full max-w-3xl rounded-2xl border border-accent/30 bg-black/40 px-6 py-4 text-left"
      >
        <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
          <span className="text-accent font-mono text-base leading-snug">
            {item.q}
          </span>
          <span className="text-accent font-mono text-2xl shrink-0 group-open:rotate-45 transition-transform">
            +
          </span>
        </summary>

        <div className="mt-3 text-gray-300 font-mono text-sm leading-relaxed">
          {item.a}
        </div>
      </details>
    ))}
  </div>
</section>

        <div className="flex justify-center pt-4">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full transition-all duration-300 hover:border-accent/50 hover:bg-accent/20"
            style={{
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '6px',
              paddingBottom: '6px'
            }}
          >
            <span className="text-accent text-sm font-mono">Back to Home</span>
            <span className="text-accent text-sm font-mono">→</span>
          </Link>
        </div>
        </div>
      </PageContainer>
    </main>
  );
}
