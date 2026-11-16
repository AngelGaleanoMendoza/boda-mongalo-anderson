import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * Tipografías de la página (Google Fonts, licencia OFL) guardadas en public/fonts,
 * para que el render no dependa de internet.
 */
const FACES: { family: string; file: string; style?: string; weight?: string }[] = [
  { family: 'Cormorant Garamond', file: 'cormorant.woff2', weight: '300 700' },
  { family: 'Cormorant Garamond', file: 'cormorant-italic.woff2', style: 'italic', weight: '300 700' },
  { family: 'Pinyon Script', file: 'pinyon-script.woff2' },
  { family: 'Montserrat', file: 'montserrat-500.woff2', weight: '500' },
];

const handle = delayRender('Cargando tipografías');
Promise.all(
  FACES.map((f) => {
    const face = new FontFace(f.family, `url(${staticFile(`fonts/${f.file}`)}) format('woff2')`, {
      style: f.style ?? 'normal',
      weight: f.weight ?? '400',
    });
    document.fonts.add(face);
    return face.load();
  }),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    console.error(err);
    continueRender(handle);
  });

export const serif = "'Cormorant Garamond', 'Times New Roman', serif";
export const script = "'Pinyon Script', cursive";
export const sans = "'Montserrat', sans-serif";
