// Renderiza la animación de entrada a public/video/ (horizontal y vertical).
// Uso: npm run render   (opcional: CHROME_PATH=/ruta/al/chrome npm run render)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'public', 'video');
const browserExecutable = process.env.CHROME_PATH || null;

const serveUrl = await bundle({ entryPoint: path.join(here, 'src', 'index.ts') });

for (const [id, file] of [
  ['IntroLandscape', 'intro-landscape.mp4'],
  ['IntroPortrait', 'intro-portrait.mp4'],
]) {
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    crf: 24,
    pixelFormat: 'yuv420p',
    outputLocation: path.join(outDir, file),
    browserExecutable,
    onProgress: ({ progress }) => process.stdout.write(`\r${id}: ${Math.round(progress * 100)}%`),
  });
  process.stdout.write(`\n${file} listo\n`);
}
