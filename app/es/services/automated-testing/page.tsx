import type { Metadata } from 'next';
import AutomatedTestingClientEs from './AutomatedTestingClientEs';

export const metadata: Metadata = {
  title: 'Testing Automatizado | Code Assurance',
  description:
    'Cobertura E2E + API/contract enfocada en flujos críticos—con estabilidad real en CI.',
  alternates: {
    canonical: 'https://www.code-assurance.com/es/services/automated-testing/',
    languages: {
      en: 'https://www.code-assurance.com/services/automated-testing/',
      es: 'https://www.code-assurance.com/es/services/automated-testing/',
      'x-default': 'https://www.code-assurance.com/services/automated-testing/'
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Testing Automatizado | Code Assurance',
    description:
      'Cobertura E2E + API/contract enfocada en flujos críticos—con estabilidad real en CI.',
    url: 'https://www.code-assurance.com/es/services/automated-testing/',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Testing Automatizado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testing Automatizado | Code Assurance',
    description:
      'Cobertura E2E + API/contract enfocada en flujos críticos—con estabilidad real en CI.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <AutomatedTestingClientEs />;
}