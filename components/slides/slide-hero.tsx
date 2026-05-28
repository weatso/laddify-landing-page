'use client';

import { motion } from 'framer-motion';

interface SlideHeroProps {
  goToSlide: (index: number) => void;
}

export default function SlideHero({ goToSlide }: SlideHeroProps) {
  return (
    <div className="flex flex-col items-end justify-center text-right w-full h-full px-4 max-w-none uppercase overflow-hidden">
      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col items-end font-extrabold leading-[0.85] tracking-tighter text-[#1A1A2E] mb-6 w-full"
      >
        <span className="text-[7.2vw] whitespace-nowrap">
          Your Brand Deserves
        </span>
        <span className="text-[5vw] whitespace-nowrap mt-2">
          to Be <span className="gradient-text">Impossible to Ignore.</span>
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-[6.5vw] text-[#6B7280] font-bold whitespace-nowrap leading-[0.85] tracking-tighter"
      >
        Scale It.{' '}
        <span className="font-extrabold text-[#1A1A2E]">Laddify It.</span>
      </motion.p>
    </div>
  );
}
