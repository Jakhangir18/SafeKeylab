import type { SceneConfig } from '@/types';

interface SceneProps {
  scene: SceneConfig;
  progress: number;
  reducedMotion: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function StaticScene({ scene, progress, reducedMotion }: SceneProps) {
  const drift = reducedMotion ? 0 : clamp(progress * 16 - 8, -8, 8);
  const zoom = reducedMotion ? 1 : 1.04 + progress * 0.03;
  const image = scene.assets.start;

  return (
    <div className="scene-media scene-media--static">
      {image ? (
        <div className="scene-media__layer scene-media__layer--base" style={{ transform: `scale(${zoom}) translate3d(0, ${drift * 0.25}px, 0)` }}>
          <img src={image} alt="" loading="lazy" decoding="async" />
        </div>
      ) : null}
      <div className="scene-media__static-gradient" />
      <div className="scene-media__vignette" />
    </div>
  );
}
