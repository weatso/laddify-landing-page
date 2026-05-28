'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  activeSlide: number;
  goToSlide: (index: number) => void;
}

export default function Navbar({ activeSlide, goToSlide }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4"
    >
      {/* Logo */}
      <button
        onClick={() => goToSlide(0)}
        className="flex items-center gap-2 cursor-pointer"
        aria-label="Go to home"
      >
        <Image
          src="/logo.svg"
          alt="Laddify Logo"
          width={120}
          height={36}
          priority
          className="h-8 sm:h-9 w-auto"
        />
      </button>

      {/* Center: slide labels (desktop only) */}
      <div className="hidden lg:flex items-center gap-1 glass-card py-2 px-3">
        {['Home', 'Problems', 'Services', 'Pricing', 'Studio', 'Why Us', 'Contact'].map(
          (label, i) => (
            <button
              key={label}
              onClick={() => goToSlide(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                i === activeSlide
                  ? 'bg-gradient-to-r from-[#FF3CAC] to-[#2BD2FF] text-white shadow-md'
                  : 'text-[#1A1A2E]/60 hover:text-[#1A1A2E] hover:bg-white/50'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => goToSlide(6)}
        className="btn-primary text-sm py-2.5 px-5 cursor-pointer"
      >
        Let&apos;s Talk
      </button>
    </motion.nav>
  );
}
