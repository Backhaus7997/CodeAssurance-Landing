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

export default function AutomatedTestingClientEs() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Estrategia de cobertura (qué se automatiza primero)',
      bullets: [
        'Primero los journeys críticos: auth, roles/permisos, aprobaciones, pagos, integraciones',
        'Capa correcta por riesgo: API/contract donde es más barato + estable; E2E solo donde realmente hace falta',
      ],
    },
    {
      title: 'Confiabilidad por diseño (cómo evitamos flakiness)',
      bullets: [
        'Selectores estables + esperas determinísticas (sin automation basada en “sleep”)',
        'Estrategia de datos + política de flakes (fix/quarantine/remove) con ownership asignado',
      ],
    },
    {
      title: 'Modelo de ejecución en CI (cómo encaja en tu pipeline)',
      bullets: [
        'Suite para PR (rápida): smoke + flujos críticos, diseñada para bloquear merges',
        'Gates explícitos: reglas pass/fail atadas al riesgo (no “se ve bien”)',
      ],
    },
  ];

  return (
    <main className="min-h-screen flex justify-center pt-8 pb-32">
      <PageContainer>
        <div className="flex w-full flex-col items-center gap-12">
          <section className="w-full space-y-6 text-center flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col items-center space-y-4 text-center">
              <div
                className="inline-block bg-accent/10 border border-accent/30 rounded-full"
                style={{
                  paddingLeft: '30px',
                  paddingRight: '20px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                }}
              >
                <span className="text-accent text-xs tracking-[0.9em] uppercase font-mono">
                  Servicio
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-accent md:text-5xl text-center">
                Testing Automatizado para confianza en releases
              </h1>

              <p
                className="text-lg text-gray-300 text-center"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                Cobertura E2E + API/contract enfocada en flujos críticos—con estabilidad real en CI.
              </p>
            </div>

            <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
              <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
                Promesa
              </p>
              <div className="mt-4 space-y-3 text-center">
                {[
                  'Cobertura basada en riesgo (no “testear todo”)',
                  'Evidencia lista para CI (runs, logs, screenshots)',
                  'Triage de flakes + reglas de mantenimiento',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-center text-gray-300"
                    style={{ gap: '12px' }}
                  >
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
            <h2
              className="text-4xl font-bold text-accent text-center"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              Qué recibís
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {[
                {
                  title: 'Plan de automatización',
                  detail:
                    'Qué automatizar primero + por qué, incluyendo flake rate / pass rate / tendencias de runtime',
                },
                {
                  title: 'Incremento de suite',
                  detail:
                    'Nuevos tests + ownership claro + reglas que mantienen la suite estable en el tiempo',
                },
                {
                  title: 'Perfil de ejecución en CI',
                  detail:
                    'Objetivos de runtime + estrategia de ejecución para mantener CI rápido y confiable',
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
                  <h3
                    className="text-2xl font-bold group-hover:text-accent transition-colors"
                    style={{ marginBottom: '16px' }}
                  >
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
              Cómo funciona
            </h2>

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
                        <h3
                          className="text-2xl font-bold group-hover:text-accent transition-colors"
                          style={{ marginBottom: isOpen ? '16px' : '0px' }}
                        >
                          {card.title}
                        </h3>
                        <span className="text-accent font-mono text-2xl">
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="space-y-3">
                        {card.bullets.map((item) => (
                          <div key={item} className="flex items-start gap-4">
                            <div
                              className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0"
                              style={{ marginTop: '0.45rem' }}
                            />
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
            <h2
              className="text-4xl font-bold text-accent text-center"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              Evidencia que realmente vas a ver
            </h2>

            {(() => {
              const evidenceItems = [
                'Links y resúmenes de runs de PR/release (qué se cubrió + qué falló)',
                'Logs + screenshots + traces/video (cuando aplica)',
                'Clustering de fallos (tests que más fallan, hotspots de flakiness, componentes afectados)',
                'Snapshots de tendencia: pass rate, flake rate, evolución del runtime',
              ];
              const left = evidenceItems.slice(0, 2);
              const right = evidenceItems.slice(2, 4);

              return (
                <div className="mx-auto w-full max-w-10xl text-left pt-8 space-y-10">
                  <div className="grid w-full gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      {left.map((item) => (
                        <div key={item} className="flex items-start gap-4">
                          <div
                            className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0"
                            style={{ marginTop: '0.45rem' }}
                          />
                          <span className="text-gray-300 font-mono leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {right.map((item) => (
                        <div key={item} className="flex items-start gap-4">
                          <div
                            className="h-2 w-2 rounded-full bg-accent/70 flex-shrink-0"
                            style={{ marginTop: '0.45rem' }}
                          />
                          <span className="text-gray-300 font-mono leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p
                    className="text-gray-100 font-mono font-semibold text-center"
                    style={{ marginTop: '20px' }}
                  >
                    Evidencia sobre opiniones: cada claim se respalda con un run.
                  </p>
                </div>
              );
            })()}
          </section>

          <section className="w-full space-y-6 text-center">
            <h2
              className="text-4xl font-bold text-accent text-center"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              Tools & stack
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {[
                {
                  title: 'Playwright',
                  detail:
                    'E2E para journeys críticos + traces/video para debuggear fallos rápido.',
                },
                {
                  title: 'Cypress / Selenium',
                  detail:
                    'Cuando ya hay suites existentes o se necesita compatibilidad con tooling actual.',
                },
                {
                  title: 'Postman / API testing',
                  detail:
                    'Feedback rápido en endpoints e integraciones antes de pagar el costo del UI.',
                },
                {
                  title: 'CI/CD (Jenkins + Git)',
                  detail:
                    'PR gates, smoke suites y evidencia en runs atada a merges/releases.',
                },
                {
                  title: 'Jira + TestRail',
                  detail:
                    'Trazabilidad: planes, packs de regresión y ciclo de defectos claro.',
                },
                {
                  title: 'SQL validation',
                  detail:
                    'Chequeos de integridad backend (CRUD, consistencia) donde el sistema lo necesita.',
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
                  <h3
                    className="text-2xl font-bold group-hover:text-accent transition-colors"
                    style={{ marginBottom: '16px' }}
                  >
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

            <div
              className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-2"
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {[
                {
                  q: '¿Cuánto tarda en quedar lista una suite de regresión automatizada lista para CI?',
                  a: 'Depende del scope. Se arranca con 3–5 flujos críticos + gates en PR y se escala iterativamente midiendo flake rate y runtime.',
                },
                {
                  q: '¿Qué automatizás primero en un producto nuevo?',
                  a: 'Journeys críticos: autenticación, roles/permisos, aprobaciones, pagos, integraciones. Priorizamos lo que más afecta releases.',
                },
                {
                  q: '¿Cómo reducís tests flaky en Playwright/Cypress?',
                  a: 'Selectores estables, esperas determinísticas (sin sleep), datos controlados y política de flake (fix/quarantine/remove) con ownership.',
                },
                {
                  q: '¿Enfocás API/contract testing o E2E?',
                  a: 'Ambos: API/contract donde es más barato/estable; E2E solo donde la integración UI es el riesgo real.',
                },
                {
                  q: '¿Cómo corrés automation en CI/CD (PR gates vs nightly)?',
                  a: 'Suite rápida en PR para bloquear merges + corridas programadas para regresión más amplia. Gates explícitos y con evidencia.',
                },
                {
                  q: '¿Podés trabajar con React / backends .NET y workflows complejos?',
                  a: 'Sí. Validamos workflows complejos y sistemas multi-módulo alineando el scope a paths críticos de negocio.',
                },
                {
                  q: '¿Qué evidencia recibe el equipo de ingeniería?',
                  a: 'Links de runs, logs, screenshots, traces/video (si aplica) y snapshots de tendencias (flake/runtime).',
                },
                {
                  q: '¿Cómo manejás datos de test y ambientes de forma segura?',
                  a: 'Definimos estrategia de datos (fixtures/seed/reset), aislamos operaciones riesgosas y evitamos impacto en producción por diseño.',
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
              href="/es/#services"
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full transition-all duration-300 hover:border-accent/50 hover:bg-accent/20"
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '6px',
                paddingBottom: '6px',
              }}
            >
              <span className="text-accent text-sm font-mono">Volver al Home</span>
              <span className="text-accent text-sm font-mono">→</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}