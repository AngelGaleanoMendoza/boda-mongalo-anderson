import React from 'react';
import { Composition } from 'remotion';
import { Intro, INTRO_DURATION, INTRO_FPS } from './Intro';

/** Dos versiones: horizontal (computadora) y vertical (celular). */
export const Root: React.FC = () => (
  <>
    <Composition
      id="IntroLandscape"
      component={Intro}
      durationInFrames={INTRO_DURATION}
      fps={INTRO_FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="IntroPortrait"
      component={Intro}
      durationInFrames={INTRO_DURATION}
      fps={INTRO_FPS}
      width={1080}
      height={1920}
    />
  </>
);
