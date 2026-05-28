'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import SlideContainer from '@/components/slide-container';
import { useSlideNavigation } from '@/hooks/use-slide-navigation';

import SlideHero from '@/components/slides/slide-hero';
import SlideProblems from '@/components/slides/slide-problems';
import SlideServices from '@/components/slides/slide-services';
import SlidePackages from '@/components/slides/slide-packages';
import SlideStudio from '@/components/slides/slide-studio';
import SlideAuthority from '@/components/slides/slide-authority';
import SlideContact from '@/components/slides/slide-contact';

const AetherFlow = dynamic(() => import('@/components/aether-flow'), {
  ssr: false,
});

export default function Home() {
  const { activeSlide, goToSlide, totalSlides } = useSlideNavigation();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Lapisan Bawah (Engine 3D) - Sekarang berada di z-0 */}
      <AetherFlow />

      {/* Lapisan Atas (Sistem UI & Navigasi) - Dikunci di z-10 */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar activeSlide={activeSlide} goToSlide={goToSlide} />

        <SlideContainer
          activeSlide={activeSlide}
          goToSlide={goToSlide}
          totalSlides={totalSlides}
        >
          <SlideHero goToSlide={goToSlide} />
          <SlideProblems />
          <SlideServices />
          <SlidePackages goToSlide={goToSlide} />
          <SlideStudio />
          <SlideAuthority />
          <SlideContact />
        </SlideContainer>

        {/* Bottom Bar: Section Indicator */}
        <div className="absolute bottom-4 left-4 sm:left-6 z-50">
          <div className="text-xs sm:text-sm font-bold text-[#1A1A2E]/80 uppercase tracking-widest whitespace-nowrap">
            Section - {['Home', 'Problems', 'Services', 'Pricing', 'Studio', 'Why Us', 'Contact'][activeSlide]}
          </div>
        </div>
      </div>
      
    </div>
  );
}