import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function usePinnedProgress(scrollLength: number) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: () => `+=${Math.max(scrollLength, 1) * window.innerHeight}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
      onRefresh: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion, scrollLength]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
    }
  }, [prefersReducedMotion]);

  return {
    sectionRef,
    progress,
    isReducedMotion: prefersReducedMotion,
  };
}
