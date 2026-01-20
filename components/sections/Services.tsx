'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Automated Testing',
    description: 'End-to-end test automation with comprehensive coverage',
    specs: ['Unit Testing', 'Integration Tests', 'E2E Scenarios'],
  },
  {
    title: 'Performance Audit',
    description: 'Deep performance analysis and optimization protocols',
    specs: ['Load Testing', 'Stress Analysis', 'Bottleneck ID'],
  },
  {
    title: 'Security Review',
    description: 'Vulnerability assessment and penetration testing',
    specs: ['Code Scanning', 'Threat Modeling', 'Compliance Check'],
  },
  {
    title: 'Code Quality',
    description: 'Standards enforcement and technical debt management',
    specs: ['Static Analysis', 'Architecture Review', 'Refactoring'],
  },
];

export default function Services() {
  return (
    <section className="relative py-[240px] px-12 lg:px-16 xl:px-24">
      <div className="mb-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-6 font-mono">
          Core Capabilities
        </p>
        <h2 className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter">
          Engineering-Grade
          <br />
          <span className="text-accent">Services</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-6 max-w-[1280px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative border border-border rounded-lg p-8 bg-gradient-to-br from-white/5 to-transparent hover:border-accent/50 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>

                <div className="space-y-2">
                  {service.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-accent/50" />
                      <span className="text-sm text-gray-500 font-mono">{spec}</span>
                    </div>
                  ))}
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
