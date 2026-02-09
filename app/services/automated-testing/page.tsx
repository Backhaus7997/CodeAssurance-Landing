import type { Metadata } from 'next';
import AutomatedTestingClient from './AutomatedTestingClient';

export const metadata: Metadata = {
  title: 'Automated Testing | Code Assurance',
  description:
    'E2E + API/contract coverage focused on critical flows—built to be stable in CI.',
  alternates: {
    canonical: 'https://www.code-assurance.com/services/automated-testing/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Automated Testing | Code Assurance',
    description:
      'E2E + API/contract coverage focused on critical flows—built to be stable in CI.',
    url: 'https://www.code-assurance.com/services/automated-testing/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Automated Testing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automated Testing | Code Assurance',
    description:
      'E2E + API/contract coverage focused on critical flows—built to be stable in CI.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <AutomatedTestingClient />;
}