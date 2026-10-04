import type { ImageMetadata } from 'astro';
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photography/*.png', { eager: true });
export const photography = Object.fromEntries(Object.entries(images).map(([path, value]) => [path.split('/').pop()!.replace('.png', ''), value.default]));
