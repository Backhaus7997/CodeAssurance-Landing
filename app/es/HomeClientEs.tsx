'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import HeroEs from './components/section-es/HeroEs';
import ProblemEs from './components/section-es/ProblemEs';
import TransitionEs from '@/components/sections-es/TransitionEs';
import ProcessEs from '@/components/sections-es/ProcessEs';
import ServicesEs from '@/components/sections-es/ServicesEs';
import PackagesEs from '@/components/sections-es/PackagesEs';
import DifferentiatorsEs from '@/components/sections-es/DifferentiatorsEs';
import FinalCTAEs from '@/components/sections-es/FinalCTAEs';
import FooterEs from '@/components/sections-es/FooterEs';
import { useLenis } from '@/hooks/useLenis';

export default function HomeClientEs() {
  const [showContent, setShowContent] = useState(false);

  useLenis();

  useEffect(() => {
    if (!showContent) return;

    const { hash } = window.location;
    if (!hash) return;

    const id = hash.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;

    const timeout = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [showContent]);

  return (
    <>
      <Preloader onComplete={() => setShowContent(true)} />

      {showContent && (
        <main className="relative">
          <HeroEs />
          <ProblemEs />
          <TransitionEs />
          <ProcessEs />
          <div className="h-32 lg:h-40 xl:h-48" />
          <ServicesEs />
          <PackagesEs />
          <DifferentiatorsEs />
          <FinalCTAEs />
          <FooterEs />
        </main>
      )}
    </>
  );
}