'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const packagesData = {
  qualityCheck: {
    title: "QUALITY CHECK",
    subtitle: "QA Manual Funcional por Proyecto",
    description: "Detectar defectos funcionales antes del go-live y reducir riesgos en cambios grandes o módulos nuevos.",
    plans: [
      {
        name: "Plan Standard",
        badge: "Módulo chico/mediano",
        bullets: [
          "Un módulo nuevo o varias funcionalidades relacionadas",
          "5–10 pantallas/flujos, reglas de negocio moderadas",
          "Equipo: 1 QA Senior + 1 QA Junior"
        ]
      },
      {
        name: "Plan Medium",
        badge: "Módulo complejo",
        bullets: [
          "Módulos de negocio importantes o complejos",
          "10–20 pantallas/flujos, varias reglas de negocio",
          "Varias integraciones (APIs, pasarelas, servicios internos)",
          "Equipo: 1 QA Senior + 2 QA Juniors"
        ]
      },
      {
        name: "Plan Premium",
        badge: "Alto impacto",
        bullets: [
          "Cambios de altísimo impacto en el negocio",
          "> 20 pantallas/flujos, múltiples integraciones y escenarios",
          "Necesidad de probar flujos end-to-end de principio a fin",
          "Equipo: 1 QA Senior + 2–3 QA Juniors"
        ]
      }
    ]
  },
  qualityBooster: {
    title: "QUALITY BOOSTER",
    subtitle: "Regresión Continua + Kickstart de Automatización",
    description: "Framework de automatización funcionando con un set inicial de casos automatizados de regresión crítica.",
    plans: [
      {
        name: "Kickstart Básico",
        badge: "Producto chico",
        bullets: [
          "Apps o módulos relativamente chicos",
          "1–2 flujos críticos principales y pocas integraciones",
          "Framework base + automatización de set inicial",
          "Equipo: 1 QA Automation Senior + 1 QA Automation Junior/Semi"
        ]
      },
      {
        name: "Kickstart Estándar",
        badge: "Producto mediano",
        bullets: [
          "Productos con varios módulos y flujos, 2–3 roles de usuario",
          "Framework con estructura, reporting y pipelines básicos",
          "Automatización + estabilización + documentación",
          "Equipo: 1 QA Automation Senior + 1–2 QA Automation Juniors/Semi"
        ]
      },
      {
        name: "Kickstart Completo",
        badge: "Producto complejo",
        bullets: [
          "Sistemas core del negocio con flujos y reglas complejas",
          "Framework robusto + automatización + estabilización completa",
          "Documentación completa + training al equipo",
          "Equipo: 1 QA Automation Senior + 2 QA Automation Juniors/Semi"
        ]
      }
    ]
  },
  qualitySquad: {
    title: "QUALITY SQUAD",
    subtitle: "Equipo Dedicado de QA",
    description: "Capacidad de QA estable y especializada para dar soporte a equipos de desarrollo que no tienen QA interno suficiente.",
    plans: [
      {
        name: "Squad Part-Time",
        badge: "Soporte flexible",
        bullets: [
          "QA asignado part-time a uno o más proyectos",
          "Participación en ceremonias clave",
          "Diseño y ejecución de pruebas funcionales",
          "Reportes periódicos de avance"
        ]
      },
      {
        name: "Squad Full-Time",
        badge: "Dedicación completa",
        bullets: [
          "QA asignado full-time a proyectos críticos",
          "Participación en dailies, plannings, refinements",
          "Pruebas funcionales y exploratorias continuas",
          "Reporte y seguimiento exhaustivo de bugs"
        ]
      }
    ]
  }
};

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<'qualityCheck' | 'qualityBooster' | 'qualitySquad'>('qualityCheck');

  const currentPackage = packagesData[selectedPackage];

  return (
    <section className="relative py-48 px-12 lg:px-16 xl:px-24" style={{ marginTop: '200px', marginBottom: '200px' }}>
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
            Nuestros Servicios
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter mb-6 text-center">
            Paquetes de
            <br />
            <span className="text-accent">Quality Assurance</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl text-center" style={{ marginTop: '32px', marginBottom: '32px' }}>
            Soluciones diseñadas para cada etapa de tu producto
          </p>
        </div>

        {/* Package Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {Object.entries(packagesData).map(([key, pkg]) => (
            <button
              key={key}
              onClick={() => setSelectedPackage(key as any)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
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
            <h3 className="text-3xl font-bold text-accent mb-3 text-center">{currentPackage.subtitle}</h3>
            <p className="text-gray-400 text-lg max-w-3xl text-center">{currentPackage.description}</p>
          </div>

          {/* Plans Grid */}
          <div className={`${currentPackage.plans.length === 2 ? 'flex flex-wrap justify-center' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {currentPackage.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 ${currentPackage.plans.length === 2 ? 'w-full md:w-[calc(50%-12px)] lg:w-[500px]' : ''}`}
              >
                {/* Badge */}
                <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/30 rounded-full mb-6">
                  <span className="text-accent text-sm font-mono">{plan.badge}</span>
                </div>

                {/* Plan Name */}
                <h4 className="text-2xl font-bold mb-6 group-hover:text-accent transition-colors">
                  {plan.name}
                </h4>

                {/* Bullets */}
                <ul className="space-y-4">
                  {plan.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
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
