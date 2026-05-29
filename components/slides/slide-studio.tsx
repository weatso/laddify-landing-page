'use client';

import { motion } from 'framer-motion';

export default function SlideStudio() {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full h-full min-h-[60vh]">
      {/* Mystical Background Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-64 h-64 sm:w-96 sm:h-96 bg-[#7B2FBE]/10 blur-[100px] rounded-full absolute -top-10 -left-10" />
        <div className="w-64 h-64 sm:w-96 sm:h-96 bg-[#FF3CAC]/10 blur-[100px] rounded-full absolute bottom-10 right-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#7B2FBE] uppercase mb-4 sm:mb-6">
          The Unseen Architecture
        </p>
        
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#1A1A2E] mb-6 sm:mb-8 tracking-tight leading-none">
          Not just cases.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF]">
            Legends.
          </span>
        </h2>
        
        <p className="text-sm sm:text-base text-[#6B7280] max-w-lg mx-auto mb-10 sm:mb-14 leading-relaxed px-4">
          Dive into our immersive case studies. See how we architect growth, engineer virality, and transform ordinary brands into digital powerhouses.
        </p>

        {/* The Mysterious Button */}
        <motion.a
          href="/studio"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center cursor-pointer"
        >
          {/* Button Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF3CAC] via-[#7B2FBE] to-[#2BD2FF] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* Button Inner */}
          <div className="relative flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-[#1A1A2E] rounded-full text-white text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden">
            {/* Button inner shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <span>Enter Studio</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
