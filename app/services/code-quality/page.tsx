import type { Metadata } from 'next';
import CodeQualityClient from './CodeQualityClient';

export const metadata: Metadata = {
  title: 'Code Quality | Code Assurance',
  description:
    'Standards, risk hotspots, and technical debt control so your delivery stays predictable.',
  alternates: {
    canonical: 'https://www.code-assurance.com/services/code-quality/',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Code Quality | Code Assurance',
    description:
      'Standards, risk hotspots, and technical debt control so your delivery stays predictable.',
    url: 'https://www.code-assurance.com/services/code-quality/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Code Assurance - Code Quality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Quality | Code Assurance',
    description:
      'Standards, risk hotspots, and technical debt control so your delivery stays predictable.',
    images: ['/og-image.png'],
  },
};

export default function Page() {
  return <CodeQualityClient />;
}