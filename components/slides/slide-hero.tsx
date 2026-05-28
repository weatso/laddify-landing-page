'use client';

import { motion } from 'framer-motion';

interface SlideHeroProps {
  goToSlide: (index: number) => void;
}

export default function SlideHero({ goToSlide }: SlideHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="glass-card px-5 py-2 mb-8 inline-flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF3CAC] to-[#2BD2FF] animate-pulse" />
        <span className="text-sm font-medium text-[#6B7280]">
          End-to-End Growth Partner
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[#1A1A2E] mb-6"
      >
        Your Brand Deserves
        <br />
        to Be{' '}
        <span className="gradient-text">
          Impossible to Ignore.
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg sm:text-xl text-[#6B7280] font-medium mb-10 max-w-xl"
      >
        Scale It.{' '}
        <span className="font-bold text-[#1A1A2E]">Laddify It.</span>
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => goToSlide(6)}
          className="btn-primary text-base px-8 py-4 cursor-pointer"
        >
          Start Scaling
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => goToSlide(2)}
          className="btn-secondary text-base px-8 py-4 cursor-pointer"
        >
          See Our Services
        </button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-sm:hidden"
      >
        <span className="text-xs text-[#6B7280] font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-[#1A1A2E]/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gradient-to-b from-[#FF3CAC] to-[#2BD2FF]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
