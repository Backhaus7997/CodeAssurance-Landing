import type { Metadata } from 'next';
import SecurityReviewClient from './SecurityReviewClient';

export const metadata: Metadata = {
  title: 'Revisión de Seguridad | Code Assurance',
  description:
    'Testing manual de seguridad + discovery de vulnerabilidades enfocado en riesgo real de despliegue, respaldado por evidencia reproducible.',
  alternates: {
    canonical: 'https://www.code-assurance.com/es/services/security-review/',
    languages: {
      en: 'https://www.code-assurance.com/services/security-review/',
      es: 'https://www.code-assurance.com/es/services/security-review/',
      'x-default': 'https://www.code-assurance.com/services/security-review/',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Revisión de Seguridad | Code Assurance',
    description:
      'Testing manual de seguridad + discovery de vulnerabilidades enfocado en riesgo real de despliegue, respaldado por evidencia reproducible.',
    url: 'https://www.code-assurance.com/es/services/security-review/',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Revisión de Seguridad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revisión de Seguridad | Code Assurance',
    description:
      'Testing manual de seguridad + discovery de vulnerabilidades enfocado en riesgo real de despliegue, respaldado por evidencia reproducible.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <SecurityReviewClient />;
}