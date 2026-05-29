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

const ChibiPooScene = dynamic(() => import('@/components/chibi-poo-scene'), {
  ssr: false,
});

export const SECTION_LABELS = ['Home', 'Problems', 'Services', 'Pricing', 'Studio', 'Why Us', 'Contact'];

export default function Home() {
  const { activeSlide, goToSlide, totalSlides } = useSlideNavigation();

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Lapisan Bawah (Engine 3D) - Sekarang berada di z-0 */}
      <AetherFlow />

      {/* Lapisan Global 3D ChibiPoo - Persistent di semua slide */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <ChibiPooScene activeSlide={activeSlide} />
      </div>

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

        {/* Bottom Bar: Section Indicator (Alignment: Bawah Kiri) */}
        <div className="absolute bottom-4 left-4 sm:left-6 z-50 pointer-events-none">
          <div className="text-xs sm:text-sm font-bold text-[#1A1A2E] uppercase tracking-widest whitespace-nowrap flex items-center justify-start gap-2">
            <span className="opacity-50">Section</span>
            <span className="opacity-30">—</span>
            <span className="opacity-90">{SECTION_LABELS[activeSlide]}</span>
          </div>
        </div>
      </div>

    </div>
  );
}