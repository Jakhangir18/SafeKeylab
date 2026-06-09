export type SceneKind = 'crossfade' | 'frameSequence' | 'video' | 'static';

export type SceneTheme = 'red' | 'blue' | 'neutral';

export type TextPosition = 'left' | 'center' | 'right';

export interface SceneCopy {
  eyebrow?: string;
  headline: string;
  sub?: string;
  cta?: string;
}

export interface SceneAssets {
  start?: string;
  end?: string;
  framesDir?: string;
  frameCount?: number;
  video?: string;
}

export interface SceneConfig {
  id: string;
  kind: SceneKind;
  assets: SceneAssets;
  copy: SceneCopy;
  scrollLength: number;
  theme: SceneTheme;
  textPosition: TextPosition;
}

export interface PinnedProgress {
  progress: number;
  isReducedMotion: boolean;
}
