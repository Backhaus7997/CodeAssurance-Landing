'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const packagesData = {
  qualityCheck: {
    title: 'QUALITY CHECK',
    subtitle: 'QA Funcional Manual por Proyecto',
    description:
      'Detectá defectos funcionales antes del go-live y reducí el riesgo en cambios grandes o módulos nuevos.',
    plans: [
      {
        name: 'Plan Standard',
        badge: 'Módulo chico / mediano',
        bullets: [
          'Módulo nuevo o varias features relacionadas',
          '5–10 pantallas/flujos, reglas de negocio moderadas',
          'Equipo típico: 1 QA Senior + 1 QA Junior',
        ],
      },
      {
        name: 'Plan Medium',
        badge: 'Módulo complejo',
        bullets: [
          'Módulos importantes o complejos del negocio',
          '10–20 pantallas/flujos, múltiples reglas de negocio',
          'Varias integraciones (APIs, gateways, servicios internos)',
          'Equipo típico: 1 QA Senior + 2 QAs Junior',
        ],
      },
      {
        name: 'Plan Premium',
        badge: 'Alto impacto',
        bullets: [
          'Cambios de altísimo impacto para el negocio',
          '> 20 pantallas/flujos, múltiples integraciones y escenarios',
          'Flujos end-to-end que deben validarse de punta a punta',
          'Equipo típico: 1 QA Senior + 2–3 QAs Junior',
        ],
      },
    ],
  },
  qualityBooster: {
    title: 'QUALITY BOOSTER',
    subtitle: 'Regresión Continua + Inicio de Automatización',
    description:
      'Framework de automatización funcionando con un set inicial de regresión automatizada para flujos críticos.',
    plans: [
      {
        name: 'Kickstart Basic',
        badge: 'Producto chico',
        bullets: [
          'Apps o módulos pequeños',
          '1–2 flujos críticos principales y pocas integraciones',
          'Framework base + automatización del set inicial',
          'Equipo típico: 1 QA Automation Senior + 1 QA Automation Junior/Semi',
        ],
      },
      {
        name: 'Kickstart Standard',
        badge: 'Producto mediano',
        bullets: [
          'Productos con varios módulos y flujos, 2–3 roles de usuario',
          'Framework con estructura, reporting y pipelines básicos',
          'Automatización + estabilización + documentación',
          'Equipo típico: 1 QA Automation Senior + 1–2 QA Automation Junior/Semi',
        ],
      },
      {
        name: 'Kickstart Full',
        badge: 'Producto complejo',
        bullets: [
          'Sistemas core con muchos flujos y reglas complejas',
          'Framework robusto + automatización + estabilización completa',
          'Documentación completa + training para el equipo',
          'Equipo típico: 1 QA Automation Senior + 2 QA Automation Junior/Semi',
        ],
      },
    ],
  },
  qualitySquad: {
    title: 'QUALITY SQUAD',
    subtitle: 'Equipo QA Dedicado',
    description:
      'Capacidad QA estable y especializada para equipos que tienen poca o ninguna QA in-house.',
    plans: [
      {
        name: 'Squad Part-Time',
        badge: 'Soporte flexible',
        bullets: [
          'QA asignado part-time a uno o más proyectos',
          'Participación en ceremonias clave',
          'Diseño y ejecución de pruebas funcionales',
          'Reportes de progreso regulares',
        ],
      },
      {
        name: 'Squad Full-Time',
        badge: 'Dedicación full',
        bullets: [
          'QA asignado full-time a proyectos críticos',
          'Participación en dailies, plannings y refinements',
          'Testing funcional y exploratorio continuo',
          'Reporte y seguimiento completo de defectos',
        ],
      },
    ],
  },
};

export default function PackagesEs() {
  const [selectedPackage, setSelectedPackage] = useState<
    'qualityCheck' | 'qualityBooster' | 'qualitySquad'
  >('qualityCheck');

  const currentPackage = packagesData[selectedPackage];

  return (
    <section
      className="relative py-48 px-12 lg:px-16 xl:px-24"
      style={{ marginTop: '200px', marginBottom: '200px' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
            Nuestros servicios
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter mb-6 text-center">
            Paquetes de
            <br />
            <span className="text-accent">Quality Assurance</span>
          </h2>
          <p
            className="text-xl text-gray-400 max-w-3xl text-center"
            style={{ marginTop: '32px', marginBottom: '32px' }}
          >
            Soluciones diseñadas para cada etapa de tu producto
          </p>
        </div>

        {/* Package Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 px-4"
          style={{ marginBottom: '32px' }}
        >
          {Object.entries(packagesData).map(([key, pkg]) => (
            <button
              key={key}
              onClick={() => setSelectedPackage(key as any)}
              className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                selectedPackage === key
                  ? 'bg-accent text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {pkg.title}
            </button>
          ))}
        </motion.div>

        {/* Package Content */}
        <motion.div
          key={selectedPackage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-3xl font-bold text-accent mb-3 text-center">
              {currentPackage.subtitle}
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl text-center">
              {currentPackage.description}
            </p>
          </div>

          {/* Plans Grid */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {currentPackage.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-black/50 border border-white/10 rounded-2xl hover:border-accent/50 transition-all duration-300 w-full"
                style={{
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  paddingTop: '32px',
                  paddingBottom: '36px',
                  maxWidth: '480px',
                  width: '100%',
                }}
              >
                {/* Badge */}
                <div
                  className="inline-block bg-accent/10 border border-accent/30 rounded-full"
                  style={{
                    marginBottom: '24px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                  }}
                >
                  <span className="text-accent text-sm font-mono">{plan.badge}</span>
                </div>

                {/* Plan Name */}
                <h4
                  className="text-2xl font-bold group-hover:text-accent transition-colors"
                  style={{ marginBottom: '24px' }}
                >
                  {plan.name}
                </h4>

                {/* Bullets */}
                <ul
                  style={{
                    paddingLeft: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {plan.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center text-gray-400" style={{ gap: '12px' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l border-t border-accent/20" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r border-b border-accent/20" />
    </section>
  );
}