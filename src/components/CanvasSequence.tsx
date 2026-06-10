import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  images: HTMLImageElement[];
  reducedMotion: boolean;
}

function drawFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx || !img.complete || img.naturalWidth === 0) return;
  const { width: cw, height: ch } = canvas;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh);
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
}

export function CanvasSequence({ images, reducedMotion }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({ current: 0, target: 0 });
  const { frameCount, scrollMultiplier } = ANIMATION_CONFIG;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    resizeCanvas(canvas);
    const handleResize = () => {
      resizeCanvas(canvas);
      drawFrame(canvas, images[Math.round(stateRef.current.current)]);
    };
    window.addEventListener('resize', handleResize);

    if (reducedMotion) {
      drawFrame(canvas, images[Math.floor(frameCount / 2)]);
      return () => window.removeEventListener('resize', handleResize);
    }

    // Draw first frame immediately
    drawFrame(canvas, images[0]);

    const st = ScrollTrigger.create({
      trigger: '#sequence-scroll',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        stateRef.current.target = self.progress * (frameCount - 1);
      },
    });

    let lastFrameIdx = -1;
    function tick() {
      const s = stateRef.current;
      s.current += (s.target - s.current) * 0.12;
      const idx = Math.round(s.current);
      if (idx !== lastFrameIdx && images[idx]) {
        drawFrame(canvas!, images[idx]);
        lastFrameIdx = idx;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      st.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [images, reducedMotion, frameCount]);

  const scrollHeight = frameCount * scrollMultiplier;

  return (
    <>
      {/* Fixed canvas — always covers the viewport */}
      <div
        id="canvas-container"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 0,
        }}
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Tall scroll driver — ScrollTrigger watches this for progress */}
      <div
        id="sequence-scroll"
        style={{
          position: 'relative',
          height: `${scrollHeight}px`,
          zIndex: 1,
        }}
      />
    </>
  );
}
