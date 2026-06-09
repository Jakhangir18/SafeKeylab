import type { SceneConfig } from './types';

export const scenes: SceneConfig[] = [
  {
    id: 'hero',
    kind: 'crossfade',
    assets: {
      start: '/scenes/hero/start.webp',
      end: '/scenes/hero/end.webp',
    },
    copy: {
      eyebrow: 'SafeKey Lab',
      headline: 'Secure the edge where critical systems meet the real world.',
      sub: 'Cinematic narrative architecture for defense technology, autonomy, and mission-critical operations.',
      cta: 'Explore the platform',
    },
    scrollLength: 1.4,
    theme: 'neutral',
    textPosition: 'center',
  },
  {
    id: 'red-team',
    kind: 'crossfade',
    assets: {
      start: '/scenes/red-team/start.webp',
      end: '/scenes/red-team/end.webp',
    },
    copy: {
      eyebrow: 'Red Team',
      headline: 'Pressure-test assumptions before the field does.',
      sub: 'Simulate hostile conditions, expose weak points, and harden the stack with speed.',
      cta: 'See adversarial coverage',
    },
    scrollLength: 1.25,
    theme: 'red',
    textPosition: 'left',
  },
  {
    id: 'blue-team',
    kind: 'crossfade',
    assets: {
      start: '/scenes/blue-team/start.webp',
      end: '/scenes/blue-team/end.webp',
    },
    copy: {
      eyebrow: 'Blue Team',
      headline: 'Operational confidence built on defensive clarity.',
      sub: 'Trace every dependency, monitor the mission surface, and respond with disciplined control.',
      cta: 'Review defensive systems',
    },
    scrollLength: 1.25,
    theme: 'blue',
    textPosition: 'right',
  },
  {
    id: 'one-platform',
    kind: 'static',
    assets: {
      start: '/scenes/one-platform/scene.webp',
    },
    copy: {
      eyebrow: 'One Platform',
      headline: 'A single operating layer for mission media, telemetry, and delivery.',
      sub: 'Replace isolated demos with a coherent story stack that ships across every channel.',
      cta: 'See the architecture',
    },
    scrollLength: 1,
    theme: 'neutral',
    textPosition: 'center',
  },
  {
    id: 'robotics',
    kind: 'frameSequence',
    assets: {
      framesDir: '/scenes/robotics/frames',
      frameCount: 120,
    },
    copy: {
      eyebrow: 'Autonomy',
      headline: 'Scroll through the system as it assembles itself.',
      sub: 'Frame sequences stay crisp, scrub cleanly, and fall back gracefully on mobile.',
      cta: 'Inspect the motion system',
    },
    scrollLength: 1.75,
    theme: 'blue',
    textPosition: 'left',
  },
  {
    id: 'cta',
    kind: 'static',
    assets: {
      start: '/scenes/cta/scene.webp',
    },
    copy: {
      eyebrow: 'Ready to launch',
      headline: 'Bring your next defense narrative into focus.',
      sub: 'Swap in your own images, sequences, and video without changing the scene structure.',
      cta: 'Start a build',
    },
    scrollLength: 0.9,
    theme: 'red',
    textPosition: 'center',
  },
];
