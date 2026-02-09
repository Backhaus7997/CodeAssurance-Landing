export const metadata = {
  alternates: {
    canonical: 'https://www.code-assurance.com/services/automated-testing/',
  },
};
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

export default function AutomatedTestingPage() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Coverage strategy (what gets automated first)',
      bullets: [
        'Critical journeys first: auth, roles/permissions, approvals, payments, integrations',
        'Right level per risk: API/contract where cheaper + more stable; E2E only where truly necessary',
      ],
    },
    {
      title: 'Reliability by design (how we prevent flakiness)',
      bullets: [
        'Stable-first selectors + deterministic waits (no “sleep-based” automation)',
        'Test data strategy + flake policy (fix/quarantine/remove) with owner assigned',
      ],
    },
    {
      title: 'CI execution model (how it fits your delivery pipeline)',
      bullets: [
        'PR suite (fast): smoke + critical flows, designed to gate merges',
        'Gates are explicit: pass/fail rules tied to risk (not subjective “looks good”)',
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
              Automated Testing for release confidence
            </h1>
            <p className="text-lg text-gray-300 text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>
              E2E + API/contract coverage focused on critical flows—built to be stable in CI.
            </p>
          </div>

          <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
            <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
              Promise
            </p>
            <div className="mt-4 space-y-3 text-center">
              {[
                'Risk-based coverage (not “test everything”)',
                'CI-ready evidence (runs, logs, screenshots)',
                'Flake triage + maintenance rules',
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
                title: 'Automation plan',
                detail: 'What to automate first + why, including flake rate / pass rate / runtime trends',
              },
              {
                title: 'Test suite increment',
                detail: 'New tests + clear ownership + rules that keep the suite stable over time',
              },
              {
                title: 'CI execution profile',
                detail: 'Runtime targets + execution strategy to keep CI fast and reliable',
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
              'PR/release run links and summaries (what was covered + what failed)',
              'Logs + screenshots + traces/video (when applicable)',
              'Failure clustering (top failing tests, flaky hotspots, failing components)',
              'Trend snapshots: pass rate, flake rate, runtime evolution',
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
                  Evidence over opinions: every claim is backed by a run.
                </p>
              </div>
            );
          })()}
        </section>

        <section className="w-full space-y-6 text-center">
          <h2 className="text-4xl font-bold text-accent text-center" style={{ marginTop: '20px', marginBottom: '20px' }}>Scope examples</h2>
          <div className="grid gap-4 md:grid-cols-3 justify-items-center">
            {[
              {
                title: 'Small scope',
                body: '3–5 critical flows + PR smoke suite + baseline stability metrics',
              },
              {
                title: 'Medium scope',
                body: '8–15 flows + flake policy + reporting',
              },
              {
                title: 'High scope',
                body: 'multiple modules + roles/permissions matrix + CI optimization + cross-browser',
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
                <p className="text-sm text-gray-300 font-mono">{item.body}</p>

                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </div>
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
