import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '../config/animationConfig';

export interface PreloadState {
  images: HTMLImageElement[];
  progress: number;   // 0-1
  loaded: boolean;
}

export function useFramePreloader(): PreloadState {
  const [state, setState] = useState<PreloadState>({
    images: [],
    progress: 0,
    loaded: false,
  });

  useEffect(() => {
    const { framesPath, frameCount, frameExtension, frameIndexPadding } = ANIMATION_CONFIG;
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    function onLoad() {
      loadedCount++;
      const progress = loadedCount / frameCount;
      setState(prev => ({
        ...prev,
        progress,
        loaded: loadedCount === frameCount,
        images: loadedCount === frameCount ? images : prev.images,
      }));
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const idx = (i + 1).toString().padStart(frameIndexPadding, '0');
      img.src = `${framesPath}${idx}${frameExtension}`;
      img.onload = onLoad;
      img.onerror = onLoad; // don't stall on missing frames
      images[i] = img;
    }
  }, []);

  return state;
}
