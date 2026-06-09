import { useEffect, useRef } from 'react';
import type { SceneConfig } from '@/types';

interface SceneProps {
  scene: SceneConfig;
  progress: number;
  reducedMotion: boolean;
}

export function VideoScene({ scene, progress, reducedMotion }: SceneProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !scene.assets.video) {
      return;
    }

    const syncPlayback = () => {
      if (reducedMotion) {
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (!duration) {
        return;
      }

      const targetTime = duration * progress;
      targetTimeRef.current = targetTime;

      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
      }
    };

    const handleLoadedMetadata = () => {
      syncPlayback();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    syncPlayback();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [progress, reducedMotion, scene.assets.video]);

  return (
    <div className="scene-media scene-media--video">
      {scene.assets.video ? (
        <video
          ref={videoRef}
          className="scene-media__video"
          src={scene.assets.video}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={false}
        />
      ) : null}
      <div className="scene-media__static-gradient" />
      <div className="scene-media__vignette" />
    </div>
  );
}
