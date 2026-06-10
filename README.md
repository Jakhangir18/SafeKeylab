# SafeKey Lab

Cinematic, scroll-driven marketing website for SafeKey Lab — cybersecurity for satellites.

## Stack

- Vite + React + TypeScript
- GSAP + ScrollTrigger (canvas frame scrubbing, scroll-reveal)
- Lenis (smooth scroll)
- Global CSS design tokens, no Tailwind

---

## Frame pipeline

The site plays a WebP frame sequence driven by scroll position.

### Where frames come from

```
Video-Animation/          ← original JPG frames (subdirs 1-5, 9 + loose 6.jpg 7.jpg 8.jpg)
  └─ converted by scripts/convert-frames.js
Video-Animation2.0/       ← WebP output (quality 90), same relative paths
  └─ sorted + renamed by scripts/setup-frames.js
public/frames/            ← frame-0001.webp … frame-NNNN.webp (served by Vite)
```

### Run the conversion (one-time setup)

```bash
npm install               # installs sharp (dev dep) plus all runtime deps
node scripts/convert-frames.js   # JPG → WebP into Video-Animation2.0/
node scripts/setup-frames.js     # copy + rename into public/frames/
```

### Changing the frame count or path

Edit `src/config/animationConfig.ts`:

```typescript
export const ANIMATION_CONFIG: AnimationConfig = {
  framesPath: '/frames/frame-',   // must match public/frames/ naming
  frameCount: 1443,               // set to actual number of files in public/frames/
  frameExtension: '.webp',
  frameIndexPadding: 4,           // "0001" → 4 digits
  scrollMultiplier: 3,            // total scroll height = frameCount * scrollMultiplier px
};
```

---

## Scroll beat points

Text overlays ("beats") appear at specific scroll-progress positions during the animation.
Edit the `BEATS` array in `src/config/animationConfig.ts`:

```typescript
export const BEATS: BeatConfig[] = [
  { id: 'hero',     scrollProgress: 0.00, duration: 0.20 },
  { id: 'redteam',  scrollProgress: 0.25, duration: 0.20 },
  { id: 'blueteam', scrollProgress: 0.55, duration: 0.20 },
  { id: 'platform', scrollProgress: 0.75, duration: 0.18 },
];
```

`scrollProgress` is 0–1 (0 = top of animation, 1 = bottom).

---

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

## Production build

```bash
npm run build     # TypeScript check + Vite bundle → dist/
npm run preview   # preview the built output locally
```

---

## Design tokens

All colours, spacing, and typography are defined as CSS variables in `src/global.css`.
