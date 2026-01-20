'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 6000;
    const steps = 100;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-scan" />
          </div>

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay">
            <div className="absolute inset-0 bg-noise animate-noise" />
          </div>

          {/* Main content */}
          <div className="relative text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-mono">
                System Status
              </p>
              <h1 className="text-2xl font-light tracking-tight text-white">
                Initializing Quality Assurance
              </h1>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-64 mx-auto"
            >
              <div className="h-px bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-dim to-accent"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs font-mono text-gray-600">
                  {progress.toString().padStart(3, '0')}%
                </span>
                <span className="text-xs font-mono text-gray-600">
                  {(progress / 10).toFixed(1)}s
                </span>
              </div>
            </motion.div>

            {/* Status messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="pt-8"
            >
              <div className="text-xs font-mono text-gray-700 space-y-1">
                {progress > 20 && <p>→ Loading modules...</p>}
                {progress > 40 && <p>→ Verifying protocols...</p>}
                {progress > 60 && <p>→ Establishing connection...</p>}
                {progress > 80 && <p>→ System ready</p>}
              </div>
            </motion.div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/20" />
          <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/20" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/20" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
