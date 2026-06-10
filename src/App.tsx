import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { LoadingScreen } from './components/LoadingScreen';
import { CanvasSequence } from './components/CanvasSequence';
import { BeatOverlay } from './components/BeatOverlay';
import { PostSequence } from './components/PostSequence';
import { useFramePreloader } from './hooks/useFramePreloader';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './global.css';

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function App() {
  const { images, progress, loaded } = useFramePreloader();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setVisible(true);

    return () => {
      lenis.off('scroll', onScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, [loaded]);

  const lastFrame = images.length > 0 ? images[images.length - 1] : null;

  return (
    <>
      {!loaded && <LoadingScreen progress={progress} />}
      {loaded && (
        <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
          <Nav />
          <div style={{ position: 'relative' }}>
            <CanvasSequence images={images} reducedMotion={reducedMotion} />
            <BeatOverlay />
          </div>
          <PostSequence lastFrame={lastFrame} />
        </div>
      )}
    </>
  );
}
