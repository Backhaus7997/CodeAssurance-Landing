import type { Metadata } from 'next';
import PerformanceAuditClient from './PerformanceAuditClient';

export const metadata: Metadata = {
  title: 'Auditoría de Performance | Code Assurance',
  description:
    'Baseline + identificación de bottlenecks enfocada en journeys reales, respaldada por evidencia medible.',
  alternates: {
    canonical: 'https://www.code-assurance.com/es/services/performance-audit/',
    languages: {
      en: 'https://www.code-assurance.com/services/performance-audit/',
      es: 'https://www.code-assurance.com/es/services/performance-audit/',
      'x-default': 'https://www.code-assurance.com/services/performance-audit/',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Auditoría de Performance | Code Assurance',
    description:
      'Baseline + identificación de bottlenecks enfocada en journeys reales, respaldada por evidencia medible.',
    url: 'https://www.code-assurance.com/es/services/performance-audit/',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Auditoría de Performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auditoría de Performance | Code Assurance',
    description:
      'Baseline + identificación de bottlenecks enfocada en journeys reales, respaldada por evidencia medible.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <PerformanceAuditClient />;
}