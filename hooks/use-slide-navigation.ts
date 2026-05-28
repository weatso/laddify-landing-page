'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TOTAL_SLIDES = 7;
const THROTTLE_MS = 800;

export function useSlideNavigation() {
  const [activeSlide, setActiveSlide] = useState(0);
  const lastTransition = useRef(0);
  const touchStartY = useRef(0);

  const canTransition = useCallback(() => {
    const now = Date.now();
    if (now - lastTransition.current < THROTTLE_MS) return false;
    lastTransition.current = now;
    return true;
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < TOTAL_SLIDES) {
        lastTransition.current = Date.now();
        setActiveSlide(index);
      }
    },
    []
  );

  const nextSlide = useCallback(() => {
    if (!canTransition()) return;
    setActiveSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  }, [canTransition]);

  const prevSlide = useCallback(() => {
    if (!canTransition()) return;
    setActiveSlide((prev) => Math.max(prev - 1, 0));
  }, [canTransition]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) nextSlide();
      else prevSlide();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      if (deltaY > 0) nextSlide();
      else prevSlide();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return {
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    totalSlides: TOTAL_SLIDES,
  };
}
