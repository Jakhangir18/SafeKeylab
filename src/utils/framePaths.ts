export function buildFramePaths(
  framesDir: string,
  frameCount: number,
  extension = 'webp',
) {
  return Array.from({ length: frameCount }, (_, index) => {
    const frameNumber = String(index + 1).padStart(4, '0');
    return `${framesDir}/frame_${frameNumber}.${extension}`;
  });
}
