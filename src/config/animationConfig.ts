export interface AnimationConfig {
  framesPath: string;        // e.g. "/frames/frame-"
  frameCount: number;        // derived from actual file count
  frameExtension: string;    // ".webp"
  frameIndexPadding: number; // 4 for "0001"
  scrollMultiplier: number;  // scroll height = frameCount * scrollMultiplier px
}

export interface BeatConfig {
  id: string;
  scrollProgress: number;  // 0-1, when during the sequence this beat appears
  duration: number;        // how long it stays (in scroll-progress units)
}

export const ANIMATION_CONFIG: AnimationConfig = {
  framesPath: '/frames/frame-',
  frameCount: 1443,
  frameExtension: '.webp',
  frameIndexPadding: 4,
  scrollMultiplier: 3,
};

export const BEATS: BeatConfig[] = [
  { id: 'hero',     scrollProgress: 0.00, duration: 0.20 },
  { id: 'redteam',  scrollProgress: 0.25, duration: 0.20 },
  { id: 'blueteam', scrollProgress: 0.55, duration: 0.20 },
  { id: 'platform', scrollProgress: 0.75, duration: 0.18 },
];
