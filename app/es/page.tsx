import type { Metadata } from 'next';
import HomeClientEs from './HomeClientEs';

export const metadata: Metadata = {
  title: 'Code Assurance - Calidad y confianza en cada release',
  description:
    'Servicios de QA y automatización de pruebas para equipos. Reducí el riesgo de release con regresiones confiables y estabilidad en CI.',
  alternates: {
    canonical: 'https://www.code-assurance.com/es/',
    languages: {
      en: 'https://www.code-assurance.com/',
      es: 'https://www.code-assurance.com/es/',
      'x-default': 'https://www.code-assurance.com/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.code-assurance.com/es/',
    siteName: 'Code Assurance',
    title: 'Code Assurance - Calidad y confianza en cada release',
    description:
      'Servicios de QA y automatización de pruebas para equipos. Reducí el riesgo de release con regresiones confiables y estabilidad en CI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Servicios de QA y Automatización',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Assurance - Calidad y confianza en cada release',
    description:
      'Servicios de QA y automatización de pruebas para equipos. Reducí el riesgo de release con regresiones confiables y estabilidad en CI.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <HomeClientEs />;
}