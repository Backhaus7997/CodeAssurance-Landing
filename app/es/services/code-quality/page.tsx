import type { Metadata } from 'next';
import CodeQualityClientEs from './CodeQualityClient';

export const metadata: Metadata = {
  title: 'Calidad de Código | Code Assurance',
  description:
    'Estándares, hotspots de riesgo y control de deuda técnica para que tu delivery sea predecible.',
  alternates: {
    canonical: 'https://www.code-assurance.com/es/services/code-quality/',
    languages: {
      en: 'https://www.code-assurance.com/services/code-quality/',
      es: 'https://www.code-assurance.com/es/services/code-quality/',
      'x-default': 'https://www.code-assurance.com/services/code-quality/',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Calidad de Código | Code Assurance',
    description:
      'Estándares, hotspots de riesgo y control de deuda técnica para que tu delivery sea predecible.',
    url: 'https://www.code-assurance.com/es/services/code-quality/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Calidad de Código',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calidad de Código | Code Assurance',
    description:
      'Estándares, hotspots de riesgo y control de deuda técnica para que tu delivery sea predecible.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <CodeQualityClientEs />;
}