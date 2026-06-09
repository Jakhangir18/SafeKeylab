import type { CSSProperties } from 'react';
import type { SceneCopy, SceneTheme, TextPosition } from '@/types';

interface SceneTextProps {
  copy: SceneCopy;
  theme: SceneTheme;
  position: TextPosition;
  progress: number;
  reducedMotion: boolean;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SceneText({ copy, theme, position, progress, reducedMotion }: SceneTextProps) {
  const reveal = reducedMotion ? 1 : clamp((progress - 0.08) / 0.36, 0, 1);
  const offset = reducedMotion ? 0 : (1 - reveal) * 24;

  const style = {
    '--scene-accent': `var(--${theme})`,
    '--text-offset': `${offset}px`,
    opacity: reveal,
    transform: `translateY(${offset}px)`,
  } as CSSProperties;

  return (
    <div className="scene-text" data-position={position} style={style}>
      {copy.eyebrow ? <p className="scene-text__eyebrow">{copy.eyebrow}</p> : null}
      <h1 className="scene-text__headline">{copy.headline}</h1>
      {copy.sub ? <p className="scene-text__sub">{copy.sub}</p> : null}
      {copy.cta ? (
        <a className="scene-text__cta" href="#cta">
          <span>{copy.cta}</span>
          <span aria-hidden="true">→</span>
        </a>
      ) : null}
    </div>
  );
}
