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

export default function PerformanceAuditPageEs() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Primero el baseline (qué medimos)',
      bullets: [
        'Primero los journeys críticos (login, checkout/pago, aprobaciones, búsqueda, dashboards clave)',
        'Definimos expectativas (p95/p99, error rate) + restricciones (entorno/datos/patrones de tráfico)',
      ],
    },
    {
      title: 'Aislamiento del bottleneck (cómo acotamos la causa)',
      bullets: [
        'Triage por capas: UI vs API vs señales de DB vs dependencias de terceros',
        'Mediciones a nivel API: endpoints lentos, payload size, llamadas ineficientes, timeouts',
        'Validación de datos cuando aplica (chequeos SQL / señales de consistencia) para confirmar impacto',
      ],
    },
    {
      title: 'Mentalidad de verificación (cómo lo mantenemos real)',
      bullets: [
        'Hallazgos con evidencia (métricas + ejecuciones reproducibles)',
        'Próximos pasos priorizados: quick wins vs investigación profunda',
        'Plan de re-test para validar mejoras luego de los cambios',
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
                Auditoría de Performance para velocidad predecible
              </h1>

              <p
                className="text-lg text-gray-300 text-center"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                Baseline + identificación de bottlenecks enfocada en journeys reales, respaldada por evidencia medible.
              </p>
            </div>

            <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
              <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
                Promesa
              </p>

              <div className="mt-4 space-y-3 text-center">
                {[
                  'Métricas baseline para trackear (error rate, páginas/endpoints más lentos)',
                  'Hallazgos ligados a journeys y endpoints (sin conjeturas vagas)',
                  'Plan de optimización priorizado (quick wins + fixes de alto impacto)',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-center text-gray-300"
                    style={{ gap: '12px' }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-base font-mono leading-snug text-center">{item}</span>
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
              Qué obtenés
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {[
                {
                  title: 'Reporte de baseline + métricas',
                  detail: 'Páginas/endpoints clave, p95/p99, error rate y tendencias de performance.',
                },
                {
                  title: 'Bottlenecks + hipótesis de causa raíz',
                  detail:
                    'Top puntos lentos + causas probables (API/DB/query/render/terceros) con guía de “dónde mirar”.',
                },
                {
                  title: 'Plan de acción + validación',
                  detail:
                    'Fixes priorizados (impacto/esfuerzo), sugerencia de owner, plan de test seguro y checklist de re-test para confirmar mejoras.',
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
                        <span className="text-accent font-mono text-2xl">{isOpen ? '−' : '+'}</span>
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
                'Snapshot baseline: p95/p99, latencia + error rate + endpoints más lentos.',
                'Top bottlenecks rankeados por impacto',
                'Template de comparación before/after para el equipo',
                'Notas de restricciones (datos, entorno, terceros)',
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
                          <span className="text-gray-300 font-mono leading-relaxed">{item}</span>
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
                          <span className="text-gray-300 font-mono leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p
                    className="text-gray-100 font-mono font-semibold text-center"
                    style={{ marginTop: '20px' }}
                  >
                    Evidencia sobre opiniones: cada afirmación se respalda con ejecuciones medidas.
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
              Herramientas & stack
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {[
                {
                  title: 'Load & performance testing (k6 / JMeter)',
                  detail:
                    'Baselines para journeys clave, p95/p99, throughput y error rate bajo tráfico realista.',
                },
                {
                  title: 'Frontend profiling (DevTools / Lighthouse)',
                  detail:
                    'Detectar bottlenecks de render/JS/assets y latencia percibida (señales CWV cuando aplica).',
                },
                {
                  title: 'API & endpoint diagnostics (Postman / curl)',
                  detail:
                    'Mediciones reproducibles de endpoints, payload checks, patrones de timeouts y comportamiento de integraciones.',
                },
                {
                  title: 'Backend & DB investigation (SQL checks)',
                  detail:
                    'Validar queries lentas, patrones N+1, señales de consistencia y confirmar “¿es la DB?”.',
                },
                {
                  title: 'Monitoring & tracing (APM: Datadog / New Relic / OpenTelemetry)',
                  detail:
                    'Correlacionar requests lentos entre servicios, dependencias y terceros con evidencia de trazas.',
                },
                {
                  title: 'CI execution & reporting (Jenkins + Git workflows)',
                  detail:
                    'Runs repetibles, evidencia apta para PRs y comparaciones before/after después de cambios.',
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
                  q: '¿Qué medís en una Auditoría de Performance?',
                  a: 'Journeys reales con p95/p99, throughput y error rate más las páginas/endpoints más lentos.',
                },
                {
                  q: '¿Cómo elegís qué journeys testear primero?',
                  a: 'Empezamos por flujos críticos para releases (login, checkout/pago, aprobaciones, búsqueda, dashboards clave).',
                },
                {
                  q: '¿Testeás performance de UI o de API?',
                  a: 'Ambos: UI para latencia percibida y API/DB para el bottleneck real.',
                },
                {
                  q: '¿Cómo aislás dónde está el bottleneck?',
                  a: 'Hacemos triage por capa (UI vs API vs DB vs terceros) y validamos con ejecuciones reproducibles.',
                },
                {
                  q: '¿Esto impacta tráfico de producción?',
                  a: 'No por defecto: usamos planes seguros, carga controlada y staging cuando es posible.',
                },
                {
                  q: '¿Qué recibe el equipo al final?',
                  a: 'Reporte baseline, mapa rankeado de bottlenecks con causas probables y un plan de acción priorizado.',
                },
                {
                  q: '¿Cómo probás mejoras después de fixes?',
                  a: 'Re-ejecutamos los mismos escenarios y entregamos comparaciones before/after con las mismas métricas.',
                },
                {
                  q: '¿Cuánto tarda un audit típico?',
                  a: 'Scopes chicos pueden ser rápidos; sistemas grandes tardan más, pero entregamos valor temprano (baseline + top bottlenecks primero).',
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group w-full max-w-3xl rounded-2xl border border-accent/30 bg-black/40 px-6 py-4 text-left"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="text-accent font-mono text-base leading-snug">{item.q}</span>
                    <span className="text-accent font-mono text-2xl shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>

                  <div className="mt-3 text-gray-300 font-mono text-sm leading-relaxed">{item.a}</div>
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