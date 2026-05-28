'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  activeSlide: number;
  goToSlide: (index: number) => void;
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Navbar({ activeSlide, goToSlide }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 py-2 w-full"
    >
      {/* Left Section: Logo & NavItems */}
      <div className="flex items-center gap-12 lg:gap-32">
        {/* Logo */}
        <div className="flex-none">
          <button
            onClick={() => goToSlide(0)}
            className="relative flex items-center cursor-pointer h-10 w-20 sm:h-14 sm:w-28"
            aria-label="Go to home"
          >
            <Image
              src="/logo.png"
              alt="Laddify Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </button>
        </div>

        {/* Nav Items (Aligned to start after the logo + spacer, matching bottom section indicator X-axis) */}
        <div className="hidden lg:flex items-center gap-8">
          {['Home', 'Problems', 'Services', 'Pricing', 'Studio', 'Why Us', 'Contact'].map(
            (label, i) => (
              <motion.button
                key={label}
                onClick={() => goToSlide(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-1 text-base sm:text-lg font-bold text-[#1A1A2E]/60 hover:text-[#1A1A2E] transition-all duration-300 cursor-pointer"
              >
                {label}
                {label === 'Contact' && (
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                )}
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex flex-none items-center gap-6">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
          <InstagramIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
          <TikTokIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
        <a href="https://wa.me/6281805877845" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
          <WhatsAppIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>
    </motion.nav>
  );
}
