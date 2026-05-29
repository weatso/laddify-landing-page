'use client';

import { motion } from 'framer-motion';

interface SlideHeroProps {
  goToSlide: (index: number) => void;
}

export default function SlideHero({ goToSlide }: SlideHeroProps) {
  return (
    <div className="relative flex flex-col items-end justify-end w-full h-full px-4 sm:px-8 pb-20 sm:pb-24 max-w-none uppercase overflow-hidden text-right pointer-events-none">
      
      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col items-end font-extrabold leading-[0.9] tracking-tighter text-[#1A1A2E] mb-0"
      >
        {/* Row 1 */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 text-[7vw] sm:text-[6.5vw] lg:text-[7vw] whitespace-nowrap">
          <span>YOUR</span>
          <span>BRAND</span>
          <div className="relative inline-block">
            <span className="relative z-10">DESERVES</span>
            <motion.div 
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 lg:h-2 bg-gradient-to-r from-[#FF3CAC] to-[#7B2FBE] rounded-full pointer-events-none origin-right"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* Row 2 */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 text-[7vw] sm:text-[6.5vw] lg:text-[7vw] whitespace-nowrap mt-1 sm:mt-2">
          <span>TO</span>
          <span>BE</span>
          <span className="gradient-text">IMPOSSIBLE</span>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 text-[7vw] sm:text-[6.5vw] lg:text-[7vw] whitespace-nowrap mt-1 sm:mt-2">
          <span>TO</span>
          <span>IGNORE.</span>
        </div>
      </motion.div>

      {/* Tagline (Row 4) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-4 text-[4.5vw] sm:text-[4vw] lg:text-[3.5vw] text-[#6B7280] font-bold leading-[1] tracking-tighter mt-4 sm:mt-6 whitespace-nowrap"
      >
        <span>SCALE</span>
        <span>IT.</span>
        <span className="font-extrabold text-[#1A1A2E]">LADDIFY</span>
        <span className="font-extrabold text-[#1A1A2E]">IT.</span>
      </motion.div>
    </div>
  );
}
