// Custom smooth scroll implementation using requestAnimationFrame for buttery smooth easing
// that behaves consistently across all browsers (bypassing native CSS/browser limitations).

export function smoothScrollTo(elementId: string | null, targetPosition?: number, duration: number = 800) {
  const container = document.getElementById('mobile-scroll-container');
  if (!container) return;

  const start = container.scrollTop;
  let to = 0;

  if (targetPosition !== undefined) {
    to = targetPosition;
  } else if (elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      // Offset by 80px to account for the navbar height
      to = targetElement.offsetTop - 80;
    } else {
      return;
    }
  }

  const change = to - start;
  let startTime: number | null = null;

  // Easing function: easeInOutCubic
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const run = easeInOutCubic(timeElapsed, start, change, duration);
    container.scrollTop = run;

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      container.scrollTop = to; // Ensure it reaches exact position
    }
  };

  requestAnimationFrame(animateScroll);
}
