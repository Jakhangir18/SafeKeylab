#!/usr/bin/env node
/**
 * convert-frames.js
 * Recursively converts all .jpg/.jpeg/.png files under Video-Animation/
 * to WebP (quality 90) and writes them to Video-Animation2.0/
 * preserving the same relative paths, only changing the extension to .webp
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, relative, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const INPUT_DIR = join(ROOT, 'Video-Animation');
const OUTPUT_DIR = join(ROOT, 'Video-Animation2.0');

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findImages(fullPath);
      files.push(...nested);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log(`Input:  ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);

  const images = await findImages(INPUT_DIR);
  console.log(`Found ${images.length} image(s) to convert.`);

  let converted = 0;
  let failed = 0;

  for (const src of images) {
    const rel = relative(INPUT_DIR, src);
    const webpRel = rel.replace(/\.(jpe?g|png)$/i, '.webp');
    const dest = join(OUTPUT_DIR, webpRel);

    await mkdir(dirname(dest), { recursive: true });

    try {
      await sharp(src).webp({ quality: 90 }).toFile(dest);
      converted++;
      if (converted % 100 === 0) {
        console.log(`  Converted ${converted}/${images.length}...`);
      }
    } catch (err) {
      console.error(`  FAILED: ${rel} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Converted: ${converted}, Failed: ${failed}, Total: ${images.length}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
