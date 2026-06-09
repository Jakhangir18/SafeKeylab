import type { CSSProperties } from 'react';
import type { SceneConfig } from '@/types';

interface SceneProps {
  scene: SceneConfig;
  progress: number;
  reducedMotion: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CrossfadeScene({ scene, progress, reducedMotion }: SceneProps) {
  const reveal = reducedMotion ? 1 : progress;
  const startOpacity = 1 - reveal;
  const endOpacity = reveal;
  const zoomOut = 1 + (1 - reveal) * 0.06;
  const zoomIn = 1.04 - reveal * 0.04;
  const drift = clamp((reveal - 0.5) * 26, -13, 13);

  const sharedStyle = {
    '--scene-drift': `${drift}px`,
  } as CSSProperties;

  return (
    <div className="scene-media scene-media--crossfade" style={sharedStyle}>
      <div className="scene-media__layer scene-media__layer--base" style={{ opacity: startOpacity, transform: `scale(${zoomOut}) translate3d(${-drift}px, ${drift * 0.3}px, 0)` }}>
        <img src={scene.assets.start} alt="" loading="eager" decoding="async" />
      </div>
      <div className="scene-media__layer scene-media__layer--top" style={{ opacity: endOpacity, transform: `scale(${zoomIn}) translate3d(${drift}px, ${-drift * 0.2}px, 0)` }}>
        <img src={scene.assets.end} alt="" loading="eager" decoding="async" />
      </div>
      <div className="scene-media__vignette" />
    </div>
  );
}
