'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

// ─── Constants ────────────────────────────────────────────────────────────────
const CX = 500; // SVG centre x  (viewBox 0 0 1000 600)
const CY = 300; // SVG centre y

// Rotation angle sets
const A8  = [0, 45, 90, 135, 180, 225, 270, 315] as const;
const A12 = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as const;
const A16 = Array.from({ length: 16 }, (_, i) => i * 22.5);

// ─── Pre-computed SVG paths ───────────────────────────────────────────────────
const PATH = {
  innerPetal:  'M 550,300 C 554,277 582,272 591,300 C 582,328 554,323 550,300 Z',
  innerVein:   'M 554,300 L 589,300',
  innerBridge: 'M 591,300 Q 600,341 564,364',
  innerStar:   'M 591,300 Q 574,374 500,391',
  midPetal:    'M 610,300 C 616,249 672,242 691,300 C 672,358 616,351 610,300 Z',
  midVein:     'M 615,300 L 689,300',
  midBridge:   'M 691,300 Q 703,384 635,435',
  outerPetal:  'M 740,300 C 748,229 833,218 850,300 C 833,382 748,371 740,300 Z',
  outerRose:   'M 785,300 Q 805,382 747,443',
} as const;

// ─── Dot ring helper ──────────────────────────────────────────────────────────
function DotRing({
  angles, r, dotR, opacity,
}: {
  angles: readonly number[] | number[];
  r: number;
  dotR: number;
  opacity: number;
}) {
  return (
    <>
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <circle
            key={a}
            cx={CX + r * Math.cos(rad)}
            cy={CY + r * Math.sin(rad)}
            r={dotR}
            opacity={opacity}
          />
        );
      })}
    </>
  );
}

// ─── Mobile detection ─────────────────────────────────────────────────────────
// Used only to skip GSAP — the element itself is hidden via CSS on mobile.
// Initialises false for SSR safety (no window on server).
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── Component ────────────────────────────────────────────────────────────────
// Visible only on sm+ (≥ 640px) via `hidden sm:block`.
// GSAP tweens are skipped entirely on mobile — no CPU/GPU cost.
export function HeroVisuals() {
  const isMobile = useIsMobile();
  const breathRef = useRef<SVGGElement>(null);
  const rotRef    = useRef<SVGGElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const breathEl = breathRef.current;
    const rotEl    = rotRef.current;
    if (!breathEl || !rotEl) return;

    const rotTween = gsap.to(rotEl, {
      rotation: 360,
      svgOrigin: `${CX} ${CY}`,
      duration: 150,
      repeat: -1,
      ease: 'none',
      force3D: true,
    });

    const breathTween = gsap.to(breathEl, {
      scale: 1.032,
      svgOrigin: `${CX} ${CY}`,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      force3D: true,
    });

    return () => { rotTween.kill(); breathTween.kill(); };
  }, [isMobile]);

  return (
    // Colour comes from `currentColor` so the mandala follows the palette
    // token rather than a hard-coded hex — which also means it responds to
    // the high-contrast accessibility mode, something the old #b3ac88 never did.
    <div
      className="hidden sm:block absolute inset-0 z-0 pointer-events-none text-sanctuary-action"
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Donut shape: faint at centre (text zone), peaks at mid-ring, dissolves at edge */}
          <radialGradient
            id="mfade"
            cx={CX} cy={CY} r="450"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
            <stop offset="45%"  stopColor="white" stopOpacity="0.68" />
            <stop offset="75%"  stopColor="white" stopOpacity="0.60" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="mmask">
            <rect x="0" y="0" width="1000" height="600" fill="url(#mfade)" />
          </mask>
        </defs>

        {/* Breathe wrapper (scale) */}
        <g ref={breathRef} mask="url(#mmask)" style={{ willChange: 'transform' }}>

          {/* Rotation wrapper */}
          <g
            ref={rotRef}
            stroke="currentColor"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ willChange: 'transform' }}
          >

            {/* ══ RING 1 — Inner petals  r 50 → 91 ════════════════════════════ */}
            {A8.map(a => (
              <g key={`ip${a}`} transform={`rotate(${a},${CX},${CY})`}>
                <path d={PATH.innerPetal} fill="none" strokeWidth="1"    opacity="0.54" />
                <path d={PATH.innerVein}  fill="none" strokeWidth="0.45" opacity="0.28" />
              </g>
            ))}

            {/* Inner bridge arcs — outward rosette between adjacent tips */}
            {A8.map(a => (
              <path
                key={`ib${a}`}
                d={PATH.innerBridge}
                fill="none" strokeWidth="0.85" opacity="0.36"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Inner star arcs — forms curved octagram */}
            {A8.map(a => (
              <path
                key={`is${a}`}
                d={PATH.innerStar}
                fill="none" strokeWidth="0.7" opacity="0.22"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Dots at inner petal tips (r=94) */}
            {A8.map(a => (
              <circle
                key={`idt${a}`}
                cx="594" cy="300" r="2.2" opacity="0.60"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Spacer ring r=102 with 16 accent dots */}
            <circle
              cx={CX} cy={CY} r="102"
              fill="none" strokeWidth="0.5" opacity="0.20" strokeDasharray="2 6"
            />
            <DotRing angles={A16} r={102} dotR={1.7} opacity={0.36} />


            {/* ══ RING 2 — Middle petals  r 110 → 191 ═════════════════════════ */}
            {A8.map(a => (
              <g key={`mp${a}`} transform={`rotate(${a},${CX},${CY})`}>
                <path d={PATH.midPetal} fill="none" strokeWidth="1.1"  opacity="0.45" />
                <path d={PATH.midVein}  fill="none" strokeWidth="0.45" opacity="0.18" />
              </g>
            ))}

            {/* Middle bridge arcs */}
            {A8.map(a => (
              <path
                key={`mb${a}`}
                d={PATH.midBridge}
                fill="none" strokeWidth="0.9" opacity="0.28"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Dots at mid petal tips */}
            {A8.map(a => (
              <circle
                key={`mdt${a}`}
                cx="695" cy="300" r="2.8" opacity="0.50"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Spacer ring r=200 with 8 accent dots */}
            <circle
              cx={CX} cy={CY} r="200"
              fill="none" strokeWidth="0.65" opacity="0.18" strokeDasharray="3 8"
            />
            <DotRing angles={A8} r={200} dotR={2.3} opacity={0.32} />


            {/* ══ RING 3 — Outer petals  r 240 → 350 ══════════════════════════ */}
            {A8.map(a => (
              <path
                key={`op${a}`}
                d={PATH.outerPetal}
                fill="none" strokeWidth="1.2" opacity="0.24"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* Dots at outer petal tips */}
            {A8.map(a => (
              <circle
                key={`odt${a}`}
                cx="854" cy="300" r="3.0" opacity="0.28"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}

            {/* 12-fold outer rose arcs — weave at r=285 */}
            {A12.map(a => (
              <path
                key={`or${a}`}
                d={PATH.outerRose}
                fill="none" strokeWidth="0.85" opacity="0.18"
                transform={`rotate(${a},${CX},${CY})`}
              />
            ))}


            {/* ══ HALO — Dissolving outer rings ════════════════════════════════ */}
            <circle cx={CX} cy={CY} r="315" fill="none" strokeWidth="0.65" opacity="0.15" />
            <circle cx={CX} cy={CY} r="347" fill="none" strokeWidth="0.5"  opacity="0.11"
              strokeDasharray="4 9" />
            <circle cx={CX} cy={CY} r="380" fill="none" strokeWidth="0.5"  opacity="0.08" />
            <circle cx={CX} cy={CY} r="415" fill="none" strokeWidth="0.5"  opacity="0.06" />

            {/* 12 dots on innermost halo ring */}
            <DotRing angles={A12} r={315} dotR={2.4} opacity={0.20} />

          </g>
        </g>
      </svg>
    </div>
  );
}
