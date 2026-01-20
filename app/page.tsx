'use client';

import { useState } from 'react';
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Transition from '@/components/sections/Transition';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Differentiators from '@/components/sections/Differentiators';
import FinalCTA from '@/components/sections/FinalCTA';
import { useLenis } from '@/hooks/useLenis';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useLenis();

  return (
    <>
      <Preloader onComplete={() => setShowContent(true)} />
      
      {showContent && (
        <main className="relative">
          <Hero />
          <Problem />
          <Transition />
          <Process />
          <Services />
          <Differentiators />
          <FinalCTA />
        </main>
      )}
    </>
  );
}

