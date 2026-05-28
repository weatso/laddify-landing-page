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
    // Scroll and swipe navigation removed to keep it as a single static page
  }, []);

  return {
    activeSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    totalSlides: TOTAL_SLIDES,
  };
}
