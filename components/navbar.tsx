'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
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

import { useState } from 'react';
import { smoothScrollTo } from '@/lib/scroll';

const MagneticNavItem = ({ label, onClick }: { label: string; onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-1 text-base sm:text-lg font-bold text-[#1A1A2E]/60 hover:text-[#1A1A2E] transition-colors duration-300 cursor-pointer px-2 py-1"
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
  );
};

export default function Navbar({ activeSlide, goToSlide }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Home', 'Problems', 'Services', 'Pricing', 'Studio', 'Why Us', 'Contact'];

  const handleMobileNav = (index: number) => {
    const container = document.getElementById('mobile-scroll-container');
    if (container) {
      smoothScrollTo(`section-${index}`, undefined, 900);
    } else {
      goToSlide(index);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4 w-full bg-transparent"
      >
        {/* Left Section: Logo & NavItems */}
        <div className="flex items-center gap-12 lg:gap-32">
          {/* Logo */}
          <div className="flex-none">
            <button
              onClick={() => {
                const container = document.getElementById('mobile-scroll-container');
                if (container) {
                  container.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  goToSlide(0);
                }
              }}
              className="relative flex items-center cursor-pointer h-10 w-24 sm:h-12 sm:w-28"
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

          {/* Nav Items (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((label, i) => (
              <MagneticNavItem key={label} label={label} onClick={() => goToSlide(i)} />
            ))}
          </div>
        </div>

        {/* Right Section: Social Icons & Mobile Menu Button */}
        <div className="flex flex-none items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4 sm:gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
              <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
              <TikTokIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://wa.me/6281805877845" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E]/60 hover:text-[#FF3CAC] transition-colors">
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
          
          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 z-50 relative bg-[#1A1A2E]/5 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#1A1A2E] block transition-transform"
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-[#1A1A2E] block transition-opacity"
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-[#1A1A2E] block transition-transform"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="fixed inset-0 z-40 bg-white/80 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-6 text-2xl font-extrabold text-[#1A1A2E]">
            {navItems.map((label, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => handleMobileNav(i)}
                className="hover:text-[#FF3CAC] transition-colors"
              >
                {label}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-6 mt-12">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E] hover:text-[#FF3CAC] transition-colors">
              <InstagramIcon className="w-8 h-8" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E] hover:text-[#FF3CAC] transition-colors">
              <TikTokIcon className="w-8 h-8" />
            </a>
            <a href="https://wa.me/6281805877845" target="_blank" rel="noopener noreferrer" className="text-[#1A1A2E] hover:text-[#FF3CAC] transition-colors">
              <WhatsAppIcon className="w-8 h-8" />
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
