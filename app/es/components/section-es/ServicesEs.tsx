'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Testing automatizado',
    href: '/es/services/automated-testing/',
    description: 'Automatización E2E con cobertura enfocada en flujos críticos',
    specs: ['Tests unitarios', 'Tests de integración', 'Escenarios E2E (end-to-end)'],
  },
  {
    title: 'Auditoría de performance',
    href: '/es/services/performance-audit/',
    description: 'Análisis profundo de performance y plan de optimización',
    specs: ['Pruebas de carga', 'Análisis de estrés', 'Identificación de cuellos de botella'],
  },
  {
    title: 'Revisión de seguridad',
    href: '/es/services/security-review/',
    description: 'Evaluación de vulnerabilidades y pruebas de seguridad manuales',
    specs: ['Escaneo de código', 'Modelado de amenazas', 'Chequeo de compliance'],
  },
  {
    title: 'Calidad de código',
    href: '/es/services/code-quality/',
    description: 'Estándares de calidad + control de deuda técnica',
    specs: ['Análisis estático', 'Revisión de arquitectura', 'Refactorización'],
  },
];

export default function ServicesEs() {
  return (
    <section id="services" className="relative py-[240px] px-12 lg:px-16 xl:px-24">
      <div className="mb-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
          Capacidades principales
        </p>
        <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter">
          Servicios con estándar
          <br />
          <span className="text-accent">de ingeniería</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 max-w-[1360px]" style={{ gap: '24px' }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative border border-border rounded-lg bg-gradient-to-br from-white/15 to-transparent hover:border-accent/50 transition-all duration-500"
              style={{ padding: '40px' }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between" style={{ marginBottom: '32px' }}>
                  <h3 className="font-bold" style={{ fontSize: '1.875rem', lineHeight: '1.2' }}>
                    {service.title}
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                <p
                  className="text-gray-300 leading-relaxed"
                  style={{ fontSize: '1.125rem', marginBottom: '40px' }}
                >
                  {service.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-accent/50" />
                      <span className="text-base text-gray-300 font-mono leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full transition-all duration-300 hover:border-accent/50 hover:bg-accent/20"
                    style={{
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                    }}
                  >
                    <span className="text-accent text-sm font-mono">Ver más</span>
                    <span className="text-accent text-sm font-mono">→</span>
                  </Link>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}