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

export default function SecurityReviewPageEs() {
  const [expandedHowItWorks, setExpandedHowItWorks] = useState<number | null>(0);

  const howItWorksCards = [
    {
      title: 'Discovery + mapeo de superficie de ataque',
      bullets: [
        'Identificamos flujos críticos para el release (auth, roles/permisos, acciones sensibles)',
        'Mapeamos entry points y servicios/endpoints expuestos',
        'Escaneo baseline para detectar exposición obvia (ej. puertos/servicios abiertos)',
      ],
    },
    {
      title: 'Testing manual de seguridad (hallazgos validados)',
      bullets: [
        'Testing manual para confirmar explotabilidad real (no solo “ruido” de scanners)',
        'Usamos Nmap/Nikto para apoyar discovery y detección de vulnerabilidades',
        'Ejecutamos casos de prueba de seguridad estructurados a través de flujos',
      ],
    },
    {
      title: 'Colaboración + verificación de fixes',
      bullets: [
        'Alineamos alcance y requisitos con equipos cross-funcionales',
        'Entregamos pasos claros de reproducción y comportamiento esperado “secure”',
        'Re-testeamos fixes para reducir riesgo de release y prevenir incidentes',
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
                Revisión de Seguridad para releases de alta visibilidad
              </h1>

              <p
                className="text-lg text-gray-300 text-center"
                style={{ marginTop: '20px', marginBottom: '20px' }}
              >
                Testing manual + discovery de vulnerabilidades enfocado en riesgo real de despliegue, respaldado por evidencia reproducible.
              </p>
            </div>

            <div className="w-full max-w-3xl rounded-2xl border border-accent/20 bg-accent/0 p-5 md:p-6 text-left">
              <p className="text-accent font-mono text-xs tracking-[0.3em] uppercase text-center mb-4">
                Promesa
              </p>

              <div className="mt-4 space-y-3 text-center">
                {[
                  'Testing manual de seguridad alineado a riesgo crítico de despliegue',
                  'Evaluación asistida por herramientas (Nmap, Nikto) + casos de prueba estructurados',
                  'Hallazgos claros + guía de remediación para el equipo de ingeniería',
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
                  title: 'Reporte de hallazgos de seguridad',
                  detail: 'Issues validados con severidad, impacto y pasos de reproducción.',
                },
                {
                  title: 'Casos de prueba de seguridad',
                  detail: 'Casos concretos reutilizables para futuros releases y regresiones.',
                },
                {
                  title: 'Checklist de re-test',
                  detail: 'Checklist práctico para confirmar fixes antes de publicar.',
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
                'Pasos de reproducción (claros y repetibles)',
                'Outputs de herramientas cuando aplique (resúmenes de Nmap/Nikto)',
                'Set de casos de prueba (qué testear la próxima vez)',
                'Notas de confirmación en re-test (fixed / sigue fallando)',
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
                    Principio: evidencia sobre opiniones — cada afirmación se respalda con un resultado reproducible.
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
                  title: 'Nmap (Discovery & exposición)',
                  detail:
                    'Descubrimiento de puertos/servicios, footprint de red y verificación de exposición no intencional.',
                },
                {
                  title: 'Nikto (chequeos baseline de servidor web)',
                  detail:
                    'Detección rápida de misconfigurations comunes y defaults riesgosos.',
                },
                {
                  title: 'Burp Suite / OWASP ZAP (validación manual)',
                  detail:
                    'Interceptar tráfico, reproducir issues y validar explotabilidad (reducir falsos positivos).',
                },
                {
                  title: 'Code scanning (SAST + dependencias)',
                  detail:
                    'Detectar patrones riesgosos y librerías vulnerables temprano en PRs.',
                },
                {
                  title: 'Threat modeling (STRIDE-lite)',
                  detail:
                    'Mapear entry points, trust boundaries y “lo que importa” antes de profundizar.',
                },
                {
                  title: 'Tracking & evidencia (Jira + reportes)',
                  detail:
                    'Repro steps claros, severidad, comportamiento seguro esperado y notas de re-test.',
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
                  q: '¿Qué incluye una Revisión de Seguridad?',
                  a: 'Mapeo de superficie de ataque + escaneo baseline + testing manual para validar explotabilidad real, con guía clara de remediación y verificación de fixes.',
                },
                {
                  q: '¿Hacen pentesting o solo vulnerability scanning?',
                  a: 'Ambos. Los scans encuentran señales rápido; el testing manual confirma qué es realmente explotable y reduce falsos positivos.',
                },
                {
                  q: '¿Cómo deciden qué testear primero?',
                  a: 'Priorizamos flujos críticos de despliegue: auth, roles/permisos, acciones sensibles, integraciones y cualquier dato con riesgo legal o de negocio.',
                },
                {
                  q: '¿Esto afecta producción o datos de usuarios?',
                  a: 'Planificamos ejecución segura: entornos de test cuando se puede, rate limits, técnicas no destructivas, scope acordado y stop conditions claras.',
                },
                {
                  q: '¿Qué evidencia recibimos de los hallazgos?',
                  a: 'Repro steps, endpoints/flujos impactados, severidad, proof-of-concept (seguro) y comportamiento seguro esperado — más resultados de re-test post-fix.',
                },
                {
                  q: '¿Pueden trabajar con frontends React y backends .NET / APIs?',
                  a: 'Sí. Testeamos flujos end-to-end y superficies API, y comunicamos hallazgos de forma accionable para ingeniería.',
                },
                {
                  q: '¿Cubren OWASP Top 10 y riesgos web comunes?',
                  a: 'Sí: auth/session, access control, injection, misconfigurations, exposición de datos sensibles e integraciones inseguras son foco central.',
                },
                {
                  q: '¿Pueden integrar checks de seguridad en CI/CD?',
                  a: 'Podemos recomendar gates livianos (SAST/dependency scans) y una cadencia de reviews manuales antes de releases de alta visibilidad.',
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