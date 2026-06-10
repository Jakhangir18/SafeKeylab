#!/usr/bin/env node
/**
 * setup-frames.js
 * Reads all WebP frames from Video-Animation2.0/ (recursively),
 * sorts them numerically (subdirectory number, then frame number within each subdir),
 * copies them into public/frames/ renamed sequentially as frame-0001.webp, frame-0002.webp, etc.
 */

import { readdir, mkdir, copyFile } from 'fs/promises';
import { join, relative, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, '..');
const INPUT_DIR = join(ROOT, 'Video-Animation2.0');
const OUTPUT_DIR = join(ROOT, 'public', 'frames');

/**
 * Recursively find all .webp files, returning objects with:
 *   { fullPath, subdirNum, frameNum }
 * For loose files at the top level (e.g. 6.webp, 7.webp, 8.webp),
 * subdirNum is the numeric part of the filename itself and frameNum is 0.
 */
async function findWebpFiles(dir, parentSubdirNum = null) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subdirNum = parseInt(entry.name, 10);
      const nested = await findWebpFiles(fullPath, isNaN(subdirNum) ? 9999 : subdirNum);
      results.push(...nested);
    } else if (/\.webp$/i.test(entry.name)) {
      // Extract numeric frame number from filename like "ezgif-frame-001.webp" or "6.webp"
      const match = entry.name.match(/(\d+)\.webp$/i);
      const frameNum = match ? parseInt(match[1], 10) : 0;
      // subdirNum: if we're at root level use the file's own number as subdirNum
      const subdirNum = parentSubdirNum !== null ? parentSubdirNum : frameNum;
      results.push({ fullPath, subdirNum, frameNum });
    }
  }
  return results;
}

async function main() {
  console.log(`Reading from: ${INPUT_DIR}`);
  console.log(`Writing to:   ${OUTPUT_DIR}`);

  const files = await findWebpFiles(INPUT_DIR);

  // Sort: by subdirNum ascending, then frameNum ascending
  files.sort((a, b) => {
    if (a.subdirNum !== b.subdirNum) return a.subdirNum - b.subdirNum;
    return a.frameNum - b.frameNum;
  });

  console.log(`Total frames to copy: ${files.length}`);

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (let i = 0; i < files.length; i++) {
    const seq = (i + 1).toString().padStart(4, '0');
    const destName = `frame-${seq}.webp`;
    const dest = join(OUTPUT_DIR, destName);
    await copyFile(files[i].fullPath, dest);
    if ((i + 1) % 100 === 0) {
      console.log(`  Copied ${i + 1}/${files.length}...`);
    }
  }

  console.log(`\nDone. ${files.length} frames copied to public/frames/`);
  console.log(`Frame range: frame-0001.webp → frame-${files.length.toString().padStart(4, '0')}.webp`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
