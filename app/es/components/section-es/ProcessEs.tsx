'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Evaluar',
    subtitle: 'Evaluación de riesgo + reality check (producto, CI, puntos de falla)',
    queHacemos: [
      'Identificar flujos críticos de usuario y puntos de falla (auth, pagos, roles, integraciones)',
      'Analizar historial de CI, regresiones y señales de flakiness (qué falla, cada cuánto, por qué)',
      'Rankear riesgo por impacto × probabilidad (qué cubrir primero)',
    ],
    entregables: [
      'Mapa de riesgo por área/módulo',
      'Lista de top issues + quick wins (arreglos con mejor ROI)',
      'Backlog de testing priorizado por nivel (smoke/regression/E2E/API/contract)',
    ],
    impacto: [
      'Menos sorpresas en los releases',
      'Prioridades claras alineadas al riesgo del negocio',
      'Plan accionable en días, no en semanas',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Planificar',
    subtitle: 'Estrategia de testing + plan de cobertura + quality gates medibles',
    queHacemos: [
      'Definir niveles de test y alcance de ejecución',
      'Setear criterios explícitos de go/no-go (gates: bugs críticos, pass rate de smoke)',
      'Definir ambientes y enfoque de test data (reset, cuentas, mocks vs real)',
    ],
    entregables: [
      'Estrategia de testing (1–2 páginas, lista para ejecutar)',
      'Matriz Riesgo ↔ Cobertura (riesgo mapeado a tipos de tests)',
      'Propuesta de gates CI/CD (qué bloquea merge/release + ownership)',
    ],
    impacto: [
      'Calidad medible (señales claras de pasa/falla)',
      'Ciclo de feedback consistente para dev/product',
      'Decisiones de release más rápidas (menos debate, más evidencia)',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Entregar',
    subtitle: 'Ejecución enfocada + automatización donde vale la pena',
    queHacemos: [
      'Ejecutar regresión basada en riesgo (acotada a cambios, no “regresión infinita”)',
      'Automatizar cobertura de alto valor (E2E + API donde tiene sentido)',
      'Generar evidencia audit-ready (pasos, logs, screenshots, run links, test data usado)',
    ],
    entregables: [
      'Reporte de release/PR (alcance, resultados, severidad, links a evidencia)',
      'Incremento de automatización (tests nuevos + reglas de mantenimiento/ownership)',
      'Checklist de salida (validaciones pre-deploy)',
    ],
    impacto: [
      'Menos bugs en producción',
      ' Menos ida y vuelta con engineering',
      'Ciclos más cortos al reducir el retrabajo',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Estabilizar',
    subtitle: 'Observabilidad + flake triage + hardening del pipeline',
    queHacemos: [
      'Trackear métricas de estabilidad del pipeline (pass rate, flake rate, runtime, fallas por componente)',
      'Triage de flaky tests con una política consistente (fix / quarantine / remove + owner)',
      'Mejorar confiabilidad y velocidad de CI (paralelización, caching, thresholds, menos ruido)',
    ],
    entregables: [
      'Dashboard de estabilidad (tendencias: flakes/failures/runtime)',
      'Lista de acciones para flakiness (root cause + decisión + owner + ETA)',
      'Resumen de hardening de CI (métricas before/after)',
    ],
    impacto: [
      'Menos builds “falsamente rojas” y menos ruido',
      'CI más rápida y confiable',
      'QA se vuelve sostenible (menor costo de mantenimiento)',
    ],
  },
];

export default function ProcessEs() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section className="relative pt-[280px] pb-[400px] px-12 lg:px-16 xl:px-24 mb-32 lg:mb-40 xl:mb-48">
      <div className="text-center" style={{ marginBottom: '80px' }}>
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
          Nuestro proceso
        </p>
        <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter">
          Excelencia sistemática
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
                    <h3
                      className={`text-lg font-bold transition-colors duration-500 ${
                        index === activeStep ? 'text-white' : 'text-gray-400'
                      }`}
                      style={{ marginBottom: '6px' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs transition-colors duration-500 ${
                        index === activeStep ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
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
            <div
              className="relative border border-border rounded-lg overflow-hidden bg-gradient-to-br from-accent/15 to-transparent"
              style={{ padding: '32px' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
                >
                  {/* What we do */}
                  <div>
                    <h4
                      className="text-accent text-sm font-mono uppercase tracking-wider font-bold"
                      style={{ marginBottom: '16px' }}
                    >
                      Qué hacemos
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentStep.queHacemos.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 self-start translate-y-[0.45rem]" />
                          <span className="text-gray-300 text-sm" style={{ lineHeight: '1.8' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4
                      className="text-accent text-sm font-mono uppercase tracking-wider font-bold"
                      style={{ marginBottom: '16px' }}
                    >
                      Entregables
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentStep.entregables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 self-start translate-y-[0.45rem]" />
                          <span className="text-gray-300 text-sm" style={{ lineHeight: '1.8' }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4
                      className="text-accent text-sm font-mono uppercase tracking-wider font-bold"
                      style={{ marginBottom: '16px' }}
                    >
                      Impacto
                    </h4>
                    <div className="flex flex-wrap" style={{ gap: '12px' }}>
                      {currentStep.impacto.map((item, i) => (
                        <div
                          key={i}
                          className="bg-accent/10 border border-accent/30 rounded-full"
                          style={{
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            minHeight: '36px',
                          }}
                        >
                          <span className="text-accent text-sm font-medium leading-none">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="border-t border-white/10" style={{ marginTop: '8px', paddingTop: '24px' }}>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-mono">Progreso</span>
                        <span className="text-xs text-accent font-mono font-bold">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden">
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