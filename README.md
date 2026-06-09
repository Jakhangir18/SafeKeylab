# SafeKey Lab

Cinematic, scroll-driven single-page marketing scaffold for SafeKey Lab.

## Stack

- Vite
- React
- TypeScript
- GSAP + ScrollTrigger
- Lenis
- Global CSS variables, no Tailwind

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Scene architecture

All scenes are defined in `src/scenes.config.ts` as an ordered array. Each scene declares its `id`, `kind`, `assets`, `copy`, `scrollLength`, `theme`, and `textPosition`.

The dispatcher in `src/components/Scene.tsx` selects the right reusable scene component and passes a normalized 0 to 1 scroll progress value from `usePinnedProgress`.

## Add a new scene

1. Add a new entry to `src/scenes.config.ts`.
2. Drop assets into `public/scenes/<scene-id>/`.
3. Pick the scene kind:
   - `crossfade` for start/end images
   - `frameSequence` for scrubbable frame playback
   - `video` for background video
   - `static` for one image or a pure gradient
4. Set `scrollLength` in viewport heights.
5. Add or update the scene copy and theme.

## Replace placeholder assets

- Crossfade scenes use `assets.start` and `assets.end`.
- Static scenes can use `assets.start` as a single hero image or rely on the built-in gradient fallback.
- Video scenes use `assets.video` with muted, looped, playsInline playback.

Replace the placeholder files under `public/scenes/<scene-id>/` with your generated WebP or MP4 files while keeping the same filenames, or update the config paths if you prefer new names.

## Frame sequences

The robotics scene uses frame scrubbing through `assets.framesDir` and `assets.frameCount`.

- Frame files are resolved with `frame_0001.webp` style naming.
- `src/utils/framePaths.ts` builds the frame list from the folder path and frame count.
- The sequence scene preloads frames when the section approaches the viewport.
- On mobile, frame sequences automatically fall back to a crossfade using the first and last frames.
- With reduced motion enabled, the end frame is shown without scrubbing.

## Design tokens

Theme colors and typography are defined in `src/styles/global.css` using CSS variables so you can retune the entire site from one place.
