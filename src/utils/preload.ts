export function preloadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function preloadImages(sources: string[]) {
  return Promise.allSettled(sources.map(preloadImage));
}
