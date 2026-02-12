import type { Metadata } from 'next';
import SecurityReviewClient from './SecurityReviewClient';

export const metadata: Metadata = {
  title: 'Security Review | Code Assurance',
  description:
    'Manual security testing + vulnerability discovery focused on real deployment risk backed by reproducible evidence.',
  alternates: {
    canonical: 'https://www.code-assurance.com/services/security-review/',
    languages: {
      en: 'https://www.code-assurance.com/services/security-review/',
      es: 'https://www.code-assurance.com/es/services/security-review/',
      'x-default': 'https://www.code-assurance.com/services/security-review/',
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Security Review | Code Assurance',
    description:
      'Manual security testing + vulnerability discovery focused on real deployment risk backed by reproducible evidence.',
    url: 'https://www.code-assurance.com/services/security-review/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Security Review',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Review | Code Assurance',
    description:
      'Manual security testing + vulnerability discovery focused on real deployment risk backed by reproducible evidence.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <SecurityReviewClient />;
}