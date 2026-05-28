'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideContainerProps {
  activeSlide: number;
  children: ReactNode[];
  totalSlides: number;
  goToSlide: (index: number) => void;
}

const slideVariants = {
  enter: {
    opacity: 0,
    y: 40,
    scale: 0.97,
    filter: 'blur(8px)',
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.97,
    filter: 'blur(8px)',
  },
};

export default function SlideContainer({
  activeSlide,
  children,
  totalSlides,
  goToSlide,
}: SlideContainerProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          {children[activeSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicator Dots (right edge) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50 max-sm:hidden">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`slide-dot ${i === activeSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile slide indicator (bottom) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 sm:hidden">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeSlide
                ? 'w-6 h-2 bg-gradient-to-r from-[#FF3CAC] to-[#2BD2FF]'
                : 'w-2 h-2 bg-[#1A1A2E]/15'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
