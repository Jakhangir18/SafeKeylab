import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { SceneConfig } from '@/types';
import { buildFramePaths } from '@/utils/framePaths';
import { preloadImages } from '@/utils/preload';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CrossfadeScene } from './CrossfadeScene';

interface SceneProps {
  scene: SceneConfig;
  progress: number;
  reducedMotion: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawFrame(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const { width, height } = canvas;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;

  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) / 2;
  } else {
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  }

  context.clearRect(0, 0, width, height);
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function FrameSequenceScene({ scene, progress, reducedMotion }: SceneProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const preloadSentinelRef = useRef<HTMLDivElement | null>(null);
  const cacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [framesReady, setFramesReady] = useState(false);

  const frameUrls = useMemo(() => {
    if (!scene.assets.framesDir || !scene.assets.frameCount) {
      return [];
    }

    return buildFramePaths(scene.assets.framesDir, scene.assets.frameCount);
  }, [scene.assets.frameCount, scene.assets.framesDir]);

  if (!frameUrls.length) {
    return <CrossfadeScene scene={scene} progress={progress} reducedMotion={reducedMotion} />;
  }

  if (isMobile) {
    return (
      <CrossfadeScene
        scene={{
          ...scene,
          assets: {
            start: frameUrls[0],
            end: frameUrls[frameUrls.length - 1],
          },
        }}
        progress={progress}
        reducedMotion={reducedMotion}
      />
    );
  }

  useEffect(() => {
    const sentinel = preloadSentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry || !entry.isIntersecting) {
          return;
        }

        preloadImages(frameUrls).then(() => {
          setFramesReady(true);
        });

        observer.disconnect();
      },
      { rootMargin: '180% 0px' },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [frameUrls]);

  useEffect(() => {
    if (!framesReady || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));

    const frameIndex = reducedMotion
      ? frameUrls.length - 1
      : Math.round(clamp(progress, 0, 1) * (frameUrls.length - 1));

    const frameUrl = frameUrls[frameIndex];
    const cachedImage = cacheRef.current.get(frameUrl);

    if (cachedImage) {
      drawFrame(canvas, cachedImage);
      return;
    }

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      cacheRef.current.set(frameUrl, image);
      drawFrame(canvas, image);
    };
    image.src = frameUrl;
  }, [frameUrls, framesReady, progress, reducedMotion]);

  const canvasStyle = {
    opacity: framesReady ? 1 : 0,
  } as CSSProperties;

  return (
    <div className="scene-media scene-media--sequence">
      <div ref={preloadSentinelRef} className="scene-media__preload-sentinel" aria-hidden="true" />
      <canvas ref={canvasRef} className="scene-media__canvas" style={canvasStyle} />
      <div className="scene-media__static-gradient" />
      <div className="scene-media__vignette" />
    </div>
  );
}
