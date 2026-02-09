import type { Metadata } from 'next';
import PerformanceAuditClient from './PerformanceAuditClient';

export const metadata: Metadata = {
  title: 'Performance Audit | Code Assurance',
  description:
    'Baseline + bottleneck identification focused on real user journeys backed by measurable evidence.',
  alternates: {
    canonical: 'https://www.code-assurance.com/services/performance-audit/',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Performance Audit | Code Assurance',
    description:
      'Baseline + bottleneck identification focused on real user journeys backed by measurable evidence.',
    url: 'https://www.code-assurance.com/services/performance-audit/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Performance Audit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Audit | Code Assurance',
    description:
      'Baseline + bottleneck identification focused on real user journeys backed by measurable evidence.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <PerformanceAuditClient />;
}