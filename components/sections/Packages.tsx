'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const packagesData = {
  qualityCheck: {
    title: "QUALITY CHECK",
    subtitle: "Manual Functional QA per Project",
    description: "Detect functional defects before go-live and reduce risk in large changes or new modules.",
    plans: [
      {
        name: "Standard Plan",
        badge: "Small / medium module",
        bullets: [
          "New module or several related features",
          "5–10 screens/flows, moderate business rules",
          "Typical team: 1 Senior QA + 1 Junior QA"
        ]
      },
      {
        name: "Medium Plan",
        badge: "Complex module",
        bullets: [
          "Important or complex business modules",
          "10–20 screens/flows, multiple business rules",
          "Several integrations (APIs, gateways, internal services)",
          "Typical team: 1 Senior QA + 2 Junior QAs"
        ]
      },
      {
        name: "Premium Plan",
        badge: "High impact",
        bullets: [
          "Very high business impact changes",
          "> 20 screens/flows, multiple integrations and scenarios",
          "End-to-end flows that must be validated from start to finish",
          "Typical team: 1 Senior QA + 2–3 Junior QAs"
        ]
      }
    ]
  },
  qualityBooster: {
    title: "QUALITY BOOSTER",
    subtitle: "Continuous Regression + Automation Kickstart",
    description: "Have an automation framework up and running with an initial set of automated regression tests for critical flows.",
    plans: [
      {
        name: "Kickstart Basic",
        badge: "Small product",
        bullets: [
          "Small apps or modules",
          "1–2 main critical flows and few integrations",
          "Base framework + automation of the initial set",
          "Typical team: 1 Senior QA Automation + 1 Junior/Semi QA Automation"
        ]
      },
      {
        name: "Kickstart Standard",
        badge: "Medium product",
        bullets: [
          "Products with several modules and flows, 2–3 user roles",
          "Framework with structure, reporting and basic pipelines",
          "Automation + stabilization + documentation",
          "Typical team: 1 Senior QA Automation + 1–2 Junior/Semi QA Automation"
        ]
      },
      {
        name: "Kickstart Full",
        badge: "Complex product",
        bullets: [
          "Core business systems with many flows and complex rules",
          "Robust framework + automation + full stabilization",
          "Complete documentation + team training",
          "Typical team: 1 Senior QA Automation + 2 Junior/Semi QA Automation"
        ]
      }
    ]
  },
  qualitySquad: {
    title: "QUALITY SQUAD",
    subtitle: "Dedicated QA Team",
    description: "Provide stable, specialized QA capacity to support development teams that have little or no in-house QA.",
    plans: [
      {
        name: "Squad Part-Time",
        badge: "Flexible support",
        bullets: [
          "QA assigned part-time to one or more projects",
          "Participation in key ceremonies",
          "Design and execution of functional tests",
          "Regular progress reports"
        ]
      },
      {
        name: "Squad Full-Time",
        badge: "Full dedication",
        bullets: [
          "QA assigned full-time to critical projects",
          "Participation in dailies, plannings, refinements",
          "Ongoing functional and exploratory testing",
          "Comprehensive defect reporting and follow-up"
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
            Our Services
          </p>
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] tracking-tighter mb-6 text-center">
            Packages for
            <br />
            <span className="text-accent">Quality Assurance</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl text-center" style={{ marginTop: '32px', marginBottom: '32px' }}>
            Solutions designed for every stage of your product
          </p>
        </div>

        {/* Package Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16 px-4"
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
            <h3 className="text-3xl font-bold text-accent mb-3 text-center">{currentPackage.subtitle}</h3>
            <p className="text-gray-400 text-lg max-w-3xl text-center">{currentPackage.description}</p>
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
                  width: '100%'
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
                    paddingBottom: '6px'
                  }}
                >
                  <span className="text-accent text-sm font-mono">{plan.badge}</span>
                </div>

                {/* Plan Name */}
                <h4 className="text-2xl font-bold group-hover:text-accent transition-colors" style={{ marginBottom: '24px' }}>
                  {plan.name}
                </h4>

                {/* Bullets */}
                <ul style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
