'use client';

import { motion } from 'framer-motion';

interface SlideHeroProps {
  goToSlide: (index: number) => void;
}

export default function SlideHero({ goToSlide }: SlideHeroProps) {
  return (
    <div className="flex flex-col justify-end w-full h-full px-4 sm:px-6 pb-20 sm:pb-24 max-w-none uppercase overflow-hidden">
      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col font-extrabold leading-[0.85] tracking-tighter text-[#1A1A2E] mb-0 w-full"
      >
        {/* Row 1 */}
        <div className="flex items-center justify-between w-full text-[7.5vw] sm:text-[8vw] lg:text-[8vw] whitespace-nowrap">
          <span>YOUR</span>
          <span>BRAND</span>
          <span>DESERVES</span>
        </div>
        
        {/* Row 2 (Right aligned, standard spacing) */}
        <div className="flex items-center justify-end w-full gap-2 sm:gap-4 lg:gap-6 text-[5vw] sm:text-[5.5vw] lg:text-[5.5vw] whitespace-nowrap mt-0 sm:mt-1">
          <span>TO</span>
          <span>BE</span>
          <span className="gradient-text">IMPOSSIBLE</span>
          <span>TO</span>
          <span>IGNORE.</span>
        </div>
      </motion.div>

      {/* Tagline (Row 3, Right aligned, standard spacing) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center justify-end w-full gap-2 sm:gap-4 lg:gap-6 text-[5vw] sm:text-[5.5vw] lg:text-[5.5vw] text-[#6B7280] font-bold leading-[0.85] tracking-tighter mt-0 sm:mt-1 whitespace-nowrap"
      >
        <span>SCALE</span>
        <span>IT.</span>
        <span className="font-extrabold text-[#1A1A2E]">LADDIFY</span>
        <span className="font-extrabold text-[#1A1A2E]">IT.</span>
      </motion.div>
    </div>
  );
}
