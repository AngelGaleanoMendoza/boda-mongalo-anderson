import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { sans, script, serif } from './fonts';

const serifItalic = serif;

export const INTRO_FPS = 30;
export const INTRO_DURATION = 8 * INTRO_FPS;

// Colores de la página (src/styles.css)
const NIGHT = '#3f4b35';
const NIGHT_DEEP = '#2c3525';
const CREAM = '#ece4d2';
const GOLD = '#c9a76a';

export interface IntroProps extends Record<string, unknown> {
  quote: string;
  texasSub: string;
  managuaSub: string;
}

export const INTRO_EN: IntroProps = {
  quote: 'Not even distance could separate what God had destined to unite.',
  texasSub: 'United States',
  managuaSub: 'Nicaragua',
};

export const INTRO_ES: IntroProps = {
  quote: 'Ni siquiera la distancia pudo separar lo que Dios había destinado a unir.',
  texasSub: 'Estados Unidos',
  managuaSub: 'Nicaragua',
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.bezier(0.22, 0.61, 0.36, 1);

/** Punto de una curva cuadrática de Bézier. */
function bezier(t: number, p0: number, p1: number, p2: number): number {
  return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

export const Intro: React.FC<IntroProps> = ({ quote, texasSub, managuaSub }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const portrait = height > width;
  const unit = Math.min(width, height) / 1080; // escala tipográfica

  // ---------- Escena 1: Texas  ⟶  Managua ----------
  const y = height * (portrait ? 0.52 : 0.6);
  const x1 = width * (portrait ? 0.18 : 0.22);
  const x2 = width * (portrait ? 0.82 : 0.78);
  const cx = width / 2;
  const cy = y - (x2 - x1) * (portrait ? 0.7 : 0.5); // altura del arco

  const placesIn = interpolate(frame, [8, 34], [0, 1], { ...clamp, easing: ease });
  const draw = interpolate(frame, [30, 105], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const sceneOut = interpolate(frame, [112, 132], [1, 0], { ...clamp, easing: ease });

  const hx = bezier(draw, x1, cx, x2);
  const hy = bezier(draw, y, cy, y);
  const heartIn = interpolate(frame, [30, 40], [0, 1], clamp);
  const heartBeat = 1 + 0.08 * Math.sin((frame / fps) * Math.PI * 4);

  // ---------- Escena 2: J y M se encuentran ----------
  const meet = spring({ frame: frame - 120, fps, config: { damping: 200 }, durationInFrames: 50 });
  const lettersIn = interpolate(frame, [118, 140], [0, 1], clamp);
  const gap = interpolate(meet, [0, 1], [width * 0.32, 0]);
  const ampIn = interpolate(frame, [150, 172], [0, 1], { ...clamp, easing: ease });
  const ampScale = interpolate(frame, [150, 172], [0.7, 1], { ...clamp, easing: ease });

  // ---------- Escena 3: la frase, palabra por palabra ----------
  const words = quote.split(' ');
  const quoteStart = 168;
  const perWord = 3.2;

  const ruleIn = interpolate(frame, [160, 190], [0, 1], { ...clamp, easing: ease });
  const outro = interpolate(frame, [INTRO_DURATION - 14, INTRO_DURATION], [1, 0], clamp);

  const monoSize = (portrait ? 260 : 230) * unit;
  const monoY = height * (portrait ? 0.4 : 0.36);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${NIGHT} 0%, ${NIGHT_DEEP} 100%)`,
        color: CREAM,
        opacity: outro,
      }}
    >
      {/* Escena 1 */}
      <AbsoluteFill style={{ opacity: sceneOut }}>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          <path
            d={`M ${x1} ${y} Q ${cx} ${cy} ${x2} ${y}`}
            fill="none"
            stroke={GOLD}
            strokeWidth={2.4 * unit}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - draw}
            opacity={0.9}
          />
          {[x1, x2].map((x, i) => (
            <g key={i} opacity={placesIn}>
              <circle cx={x} cy={y} r={9 * unit} fill={GOLD} />
              <circle
                cx={x}
                cy={y}
                r={9 * unit + 16 * unit * ((frame / fps) % 1.5) / 1.5}
                fill="none"
                stroke={GOLD}
                strokeWidth={1.5 * unit}
                opacity={1 - ((frame / fps) % 1.5) / 1.5}
              />
            </g>
          ))}
          <path
            transform={`translate(${hx} ${hy}) scale(${unit * 1.6 * heartBeat}) translate(-12 -13)`}
            d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.9 1.2 5.4 3 1.5-1.8 3.3-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21z"
            fill={CREAM}
            opacity={heartIn}
          />
        </svg>
        {[
          { x: x1, label: 'Texas', sub: texasSub },
          { x: x2, label: 'Managua', sub: managuaSub },
        ].map((p) => (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: p.x,
              top: y + 34 * unit,
              transform: `translate(-50%, ${(1 - placesIn) * 20}px)`,
              opacity: placesIn,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontFamily: serif, fontWeight: 300, fontSize: (portrait ? 72 : 64) * unit, letterSpacing: '0.06em' }}>
              {p.label}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontWeight: 500,
                fontSize: 20 * unit,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: GOLD,
                marginTop: 6 * unit,
              }}
            >
              {p.sub}
            </div>
          </div>
        ))}
      </AbsoluteFill>

      {/* Escena 2: monograma */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: monoY,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-50%)',
          fontFamily: serif,
          fontWeight: 300,
          fontSize: monoSize,
          lineHeight: 1,
          opacity: lettersIn,
        }}
      >
        <span style={{ transform: `translate(${-gap}px, ${-0.18 * monoSize}px)` }}>J</span>
        <span
          style={{
            fontFamily: script,
            fontSize: monoSize * 1.05,
            color: GOLD,
            margin: `0 ${-0.1 * monoSize}px`,
            opacity: ampIn,
            transform: `scale(${ampScale})`,
          }}
        >
          &amp;
        </span>
        <span style={{ transform: `translate(${gap}px, ${0.18 * monoSize}px)` }}>M</span>
      </div>

      {/* Escena 3: frase */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: monoY + monoSize * 0.9,
          width: portrait ? width * 0.82 : width * 0.62,
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 120 * unit * ruleIn,
            height: 1.5 * unit,
            background: GOLD,
            margin: `0 auto ${40 * unit}px`,
          }}
        />
        <div style={{ fontFamily: serifItalic, fontStyle: 'italic', fontSize: (portrait ? 68 : 60) * unit, lineHeight: 1.35 }}>
          {words.map((w, i) => {
            const t = interpolate(frame, [quoteStart + i * perWord, quoteStart + i * perWord + 14], [0, 1], {
              ...clamp,
              easing: ease,
            });
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: t,
                  transform: `translateY(${(1 - t) * 14 * unit}px)`,
                  marginRight: '0.28em',
                }}
              >
                {i === 0 ? '“' : ''}
                {w}
                {i === words.length - 1 ? '”' : ''}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
