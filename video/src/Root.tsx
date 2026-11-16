import React from 'react';
import { Composition } from 'remotion';
import { INTRO_DURATION, INTRO_EN, INTRO_ES, INTRO_FPS, Intro } from './Intro';

/** Horizontal (computadora) y vertical (celular), en inglés y en español. */
const SIZES = [
  { name: 'Landscape', width: 1920, height: 1080 },
  { name: 'Portrait', width: 1080, height: 1920 },
];

export const Root: React.FC = () => (
  <>
    {SIZES.flatMap((size) => [
      <Composition
        key={`en-${size.name}`}
        id={`Intro${size.name}`}
        component={Intro}
        durationInFrames={INTRO_DURATION}
        fps={INTRO_FPS}
        width={size.width}
        height={size.height}
        defaultProps={INTRO_EN}
      />,
      <Composition
        key={`es-${size.name}`}
        id={`Intro${size.name}Es`}
        component={Intro}
        durationInFrames={INTRO_DURATION}
        fps={INTRO_FPS}
        width={size.width}
        height={size.height}
        defaultProps={INTRO_ES}
      />,
    ])}
  </>
);
