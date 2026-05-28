'use client';

import dynamic from 'next/dynamic';
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

// Dynamically load WebGL to avoid SSR issues with Three.js
const AetherFlow = dynamic(() => import('@/components/aether-flow'), {
  ssr: false,
});

export default function Home() {
  const { activeSlide, goToSlide, totalSlides } = useSlideNavigation();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* WebGL Background */}
      <AetherFlow />

      {/* Navbar */}
      <Navbar activeSlide={activeSlide} goToSlide={goToSlide} />

      {/* Slide System */}
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
  );
}
