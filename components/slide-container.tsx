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
    x: 100,
    scale: 0.97,
    filter: 'blur(8px)',
  },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    x: -100,
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
    <div className="relative w-full h-full flex items-center justify-center pt-14 sm:pt-16 pb-8">
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
          className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto overflow-x-hidden py-4"
        >
          {children[activeSlide]}
        </motion.div>
      </AnimatePresence>


    </div>
  );
}
