'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Transition from '@/components/sections/Transition';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Packages from '@/components/sections/Packages';
import Differentiators from '@/components/sections/Differentiators';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';
import { useLenis } from '@/hooks/useLenis';

export default function Home() {
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
          <Hero />
          <Problem />
          <Transition />
          <Process />
          <div className="h-32 lg:h-40 xl:h-48" />
          <Services />
          <Packages />
          <Differentiators />
          <FinalCTA />
          <Footer />
        </main>
      )}
    </>
  );
}

