'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import SlideContainer from '@/components/slide-container';
import { useSlideNavigation } from '@/hooks/use-slide-navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { smoothScrollTo } from '@/lib/scroll';

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
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle CTA button in mobile that normally uses goToSlide
  const handleMobileScroll = (index: number) => {
    smoothScrollTo(`section-${index}`, undefined, 900); // 900ms duration for super smooth feel
  };

  if (!mounted) {
    return <div className="w-full h-screen bg-[#fafafa]" />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fafafa]">
      {/* Background Flow */}
      <AetherFlow />

      <div className="relative z-10 w-full h-full flex flex-col">
        <Navbar activeSlide={activeSlide} goToSlide={goToSlide} />

        {isDesktop ? (
          <>
            {/* Desktop: Slide Presentation Layout */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <ChibiPooScene activeSlide={activeSlide} />
            </div>

            <div className="relative z-10 w-full flex-1">
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
            </div>

            {/* Bottom Bar: Section Indicator */}
            <div className="absolute bottom-4 left-4 sm:left-6 z-50 pointer-events-none">
              <div className="text-xs sm:text-sm font-bold text-[#1A1A2E] uppercase tracking-widest whitespace-nowrap flex items-center justify-start gap-2">
                <span className="opacity-50">Section</span>
                <span className="opacity-30">—</span>
                <span className="opacity-90">{SECTION_LABELS[activeSlide]}</span>
              </div>
            </div>
          </>
        ) : (
          /* Mobile/Tablet: Vertical Scrollable Layout */
          <div id="mobile-scroll-container" className="flex-1 w-full overflow-y-auto scroll-smooth pt-20 pb-12 px-4 sm:px-6">
            
            <section id="section-0" className="min-h-[85vh] flex flex-col items-center justify-center relative mb-16">
               {/* 3D Model specifically for Mobile Hero */}
               <div className="absolute inset-0 z-0 pointer-events-none h-full w-full">
                  <ChibiPooScene activeSlide={0} />
               </div>
               <div className="relative z-10 w-full">
                 <SlideHero goToSlide={handleMobileScroll} />
               </div>
            </section>

            <section id="section-1" className="py-16 w-full mb-10"><SlideProblems /></section>
            <section id="section-2" className="py-16 w-full mb-10"><SlideServices /></section>
            <section id="section-3" className="py-16 w-full mb-10"><SlidePackages goToSlide={handleMobileScroll} /></section>
            <section id="section-4" className="py-16 w-full mb-10"><SlideStudio /></section>
            <section id="section-5" className="py-16 w-full mb-10"><SlideAuthority /></section>
            <section id="section-6" className="py-16 w-full"><SlideContact /></section>
            
          </div>
        )}
      </div>
    </div>
  );
}