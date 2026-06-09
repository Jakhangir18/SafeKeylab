import type { SceneConfig } from '@/types';
import { usePinnedProgress } from '@/hooks/usePinnedProgress';
import { SceneText } from './SceneText';
import { CrossfadeScene } from '@/scenes/CrossfadeScene';
import { FrameSequenceScene } from '@/scenes/FrameSequenceScene';
import { VideoScene } from '@/scenes/VideoScene';
import { StaticScene } from '@/scenes/StaticScene';

interface SceneProps {
  scene: SceneConfig;
}

const sceneComponents = {
  crossfade: CrossfadeScene,
  frameSequence: FrameSequenceScene,
  video: VideoScene,
  static: StaticScene,
} as const;

export function Scene({ scene }: SceneProps) {
  const { sectionRef, progress, isReducedMotion } = usePinnedProgress(scene.scrollLength);
  const Media = sceneComponents[scene.kind];

  return (
    <section
      ref={sectionRef}
      id={scene.id}
      className={`scene scene--${scene.kind} scene--${scene.theme}`}
      data-kind={scene.kind}
      data-theme={scene.theme}
    >
      <div className="scene__stage">
        <Media scene={scene} progress={progress} reducedMotion={isReducedMotion} />
        <div className="scene__shade" />
        <SceneText
          copy={scene.copy}
          position={scene.textPosition}
          theme={scene.theme}
          progress={progress}
          reducedMotion={isReducedMotion}
        />
      </div>
    </section>
  );
}
