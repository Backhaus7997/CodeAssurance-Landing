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

export default function CodeQualityClientEs() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Evaluar el riesgo de calidad (dónde se rompe)',
      bullets: [
        'Identificar hotspots: módulos con alto churn, zonas con bugs recurrentes, límites frágiles',
        'Mapear riesgo → controles recomendados (tests, checks, targets de refactor)',
      ],
    },
    {
      title: 'Aplicar estándares (quality gates que se sostienen)',
      bullets: [
        'Definir reglas “merge-ready”: lint/format/static analysis + umbrales cuando aplique',
        'Higiene de PR: templates, checklists, ownership y señales de review',
      ],
    },
    {
      title: 'Reducir deuda sin frenar el delivery',
      bullets: [
        'Targets de refactor elegidos por riesgo de negocio (bugs/rework/mantenibilidad), no por preferencia',
        'Estrategia segura: PRs chicos, guardrails y evidencia en CI',
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
                Calidad de Código que previene regresiones
              </h1>
              <p
                className="text-lg text-gray-300 text-center"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                Estándares, hotspots de riesgo y control de deuda técnica para que tu
                delivery sea predecible.
              </p>
            </div>

            <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
              <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
                Promesa
              </p>
              <div className="mt-4 space-y-3 text-center">
                {[
                  'Quality gates que reflejan riesgo real (no burocracia)',
                  'Lista de deuda accionable (priorizada por impacto)',
                  'PRs más limpios, menos ciclos de rework',
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
              Qué te llevás
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {[
                {
                  title: 'Baseline de calidad',
                  detail:
                    'Hotspots, señales de complejidad, churn y dónde se repiten bugs—para arreglar primero lo que más duele.',
                },
                {
                  title: 'Quality gates y estándares',
                  detail:
                    'Checklist de PR + Definition of Done + checks automáticos alineados al workflow del equipo.',
                },
                {
                  title: 'Plan de deuda priorizado',
                  detail:
                    'Fixes y refactors de alto ROI rankeados por impacto × probabilidad (no “limpieza cosmética”).',
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
                'Reporte baseline de calidad (hotspots + rationale)',
                'Checklist de quality gates + template de PR',
                'Ejemplos antes/después (lint issues, duplicación, áreas frágiles)',
                'Backlog de deuda (impacto, owner, ETA, por qué ahora)',
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
                    Evidence over opinions: cada recomendación mapea a riesgo medible.
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
                  title:
                    'Static Analysis & Type Safety (ESLint / SonarQube / TypeScript)',
                  detail:
                    'Lint + reglas strict para prevenir patrones riesgosos y atrapar regresiones temprano (contratos, nullability, llamadas inseguras).',
                },
                {
                  title: 'CI Quality Gates (Jenkins + Git workflows)',
                  detail:
                    'Reglas “merge-ready”: lint, tests, umbrales de cobertura y checks de calidad en cada PR.',
                },
                {
                  title: 'Automation Signals (Playwright / Cypress / Selenium)',
                  detail:
                    'Señales de calidad en CI desde journeys críticos/regresión para mantener la suite y evitar roturas silenciosas.',
                },
                {
                  title: 'API & Contract Checks (Postman / contract checks)',
                  detail:
                    'Feedback más rápido: validar integraciones sin el costo/flake risk de depender solo de UI.',
                },
                {
                  title: 'Tracking & Test Management (Jira + TestRail)',
                  detail:
                    'Trazabilidad, hotspots recurrentes, ownership y regression packs accionables.',
                },
                {
                  title:
                    'Safe Refactoring + Data Integrity (small PRs + guardrails + SQL validation)',
                  detail:
                    'Refactors seguros con impacto medible; validación de integridad de datos para detectar flujos rotos por cambios de backend.',
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
                  q: '¿Qué significa “calidad de código” en la práctica?',
                  a: 'Es qué tan seguro es cambiar el código. Enfocamos estándares + feedback rápido en CI para reducir regresiones.',
                },
                {
                  q: '¿Cómo encuentran hotspots de calidad rápido?',
                  a: 'Buscamos módulos con alto churn, bugs repetidos y límites frágiles (UI/API/DB). Cada hotspot mapea a un control concreto.',
                },
                {
                  q: '¿Se pueden aplicar estándares sin frenar el delivery?',
                  a: 'Sí. Los PR gates quedan mínimos pero efectivos (format/lint + tests clave). Lo estricto se sube por fases.',
                },
                {
                  q: '¿Qué debería bloquear un merge vs ser warning?',
                  a: 'Blockers: lint/format rotos, tests críticos fallando, types/security checks fallando. Warnings: mejoras de estilo y reglas no críticas.',
                },
                {
                  q: '¿Cómo bajan deuda técnica sin reescrituras enormes?',
                  a: 'Priorizamos deuda por riesgo de negocio y refactorizamos en PRs chicos con guardrails + evidencia en CI.',
                },
                {
                  q: '¿Pueden trabajar con React y backends .NET / flujos complejos?',
                  a: 'Sí. Ponemos controles en límites reales: permisos, integraciones y consistencia de datos.',
                },
                {
                  q: '¿Qué entregables recibe el equipo de ingeniería?',
                  a: 'Setup de PR gates, mapa de hotspots, targets de refactor priorizados y checklists reutilizables. Todo accionable.',
                },
                {
                  q: '¿Cómo miden mejora con el tiempo?',
                  a: 'Menos regresiones y rework, y CI más estable (mejor pass/flake rate). PRs más rápidos porque se detecta antes.',
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
              <span className="text-accent text-sm font-mono">
                Volver al Home
              </span>
              <span className="text-accent text-sm font-mono">→</span>
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}