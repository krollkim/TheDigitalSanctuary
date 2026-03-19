'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

// ─── Decorative Blobs ─────────────────────────────────────────────────────────
const blobs = [
  {
    className:
      'absolute top-16 start-8 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-sanctuary-sage/10 blur-3xl animate-breathe',
    style: { animationDelay: '0s' },
  },
  {
    className:
      'absolute bottom-24 end-4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-sanctuary-clay/10 blur-3xl animate-breathe',
    style: { animationDelay: '1.8s' },
  },
  {
    className:
      'absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[36rem] sm:h-[36rem] rounded-full bg-sanctuary-warm/40 blur-3xl animate-breathe',
    style: { animationDelay: '0.9s' },
  },
];

// ─── Floating Abstract Shapes ─────────────────────────────────────────────────
const floatingShapes = [
  { size: 'w-3 h-3 sm:w-4 sm:h-4', pos: 'top-1/3 end-[12%] sm:end-[18%]', delay: '0s',   opacity: 'opacity-40' },
  { size: 'w-2 h-2',               pos: 'top-2/3 start-[15%]',             delay: '1.2s', opacity: 'opacity-30' },
  { size: 'w-5 h-5 sm:w-6 sm:h-6', pos: 'bottom-1/3 end-[22%] sm:end-[30%]', delay: '2.4s', opacity: 'opacity-20' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollBtnRef = useRef<HTMLButtonElement>(null);

  const handleScrollDown = () => {
    document.querySelector('#philosophy')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Mount entrance — no ScrollTrigger (above the fold)
  useGSAP(() => {
    const el = heroRef.current!;

    // Stagger all content items in sequence
    gsap.from(el.querySelectorAll('.hero-item'), {
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
    });

    // Scroll arrow — delayed fade in
    gsap.from(scrollBtnRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
      ease: 'power2.out',
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
        bg-sanctuary-off-white bg-dot-pattern"
      aria-label="אזור ראשי"
    >
      {/* ─── Background Blobs ──────────────────────────────────────────────── */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={blob.className}
          style={blob.style}
          aria-hidden="true"
        />
      ))}

      {/* ─── Floating Dots ─────────────────────────────────────────────────── */}
      {floatingShapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute ${shape.pos} ${shape.size} ${shape.opacity}
            rounded-full bg-sanctuary-sage animate-float`}
          style={{ animationDelay: shape.delay }}
          aria-hidden="true"
        />
      ))}

      {/* ─── Main Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 section-wrapper max-w-6xl mx-auto py-32 sm:py-40">
        <div className="flex flex-col items-center text-center gap-8">

          {/* ─── Label Tag ───────────────────────────────────────────────────── */}
          <div className="hero-item">
            <span
              className="inline-flex items-center gap-2 label-tag text-sanctuary-sage
              bg-sanctuary-sage/10 border border-sanctuary-sage-light
              px-4 py-2 rounded-full"
            >
              <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
              <span>פתרונות דיגיטלי לפרקטיקות טיפוליות</span>
            </span>
          </div>

          {/* ─── Main Headline ────────────────────────────────────────────────── */}
          <h1
            className="hero-item heading-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl
              text-sanctuary-brown max-w-4xl"
          >
            מרחב דיגיטלי.{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-sanctuary-sage-dark">שקט</span>
              <span
                className="absolute bottom-1 sm:bottom-2 start-0 end-0 h-2 sm:h-3
                  bg-sanctuary-sage-light/50 rounded-sm -z-0"
                aria-hidden="true"
              />
            </span>{' '}
            אמיתי.
          </h1>

          {/* ─── Subheadline ──────────────────────────────────────────────────── */}
          <p
            className="hero-item body-balanced text-base sm:text-lg lg:text-xl
              text-sanctuary-brown-mid max-w-2xl"
          >
            הפתרון הדיגיטלי שמטפלים בוחרים כשהם רוצים שהמטופל שלהם ירגיש בטוח
            עוד לפני שנכנס לחדר - כי נוכחות דיגיטלית שקטה היא חלק מהטיפול.
          </p>

          {/* ─── CTA Buttons ──────────────────────────────────────────────────── */}
          <div className="hero-item flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              <span>בואו נדבר</span>
            </a>
            <a
              href="#philosophy"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#philosophy')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ghost"
            >
              <span>גלו עוד</span>
            </a>
          </div>

          {/* ─── Trust Indicators ─────────────────────────────────────────────── */}
          <div
            className="hero-item flex flex-col sm:flex-row items-center gap-6 sm:gap-10
              pt-4 text-sanctuary-brown-light"
          >
            {[
              { value: 'התאמה', label: 'אישית מלאה' },
              { value: 'ליווי', label: 'צמוד מקצה לקצה' },
              { value: 'פיתוח', label: 'מהיר ומדויק' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="font-serif text-2xl text-sanctuary-brown font-normal">
                  {stat.value}
                </span>
                <span className="font-sans text-xs font-light tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator ──────────────────────────────────────────────────── */}
      <button
        ref={scrollBtnRef}
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-2 text-sanctuary-brown-light
          hover:text-sanctuary-sage transition-colors duration-300 group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuary-sage
          rounded-lg p-2"
        aria-label="גלול למטה"
      >
        <span className="label-tag text-[10px]">גלילה</span>
        <div className="animate-bounce group-hover:text-sanctuary-sage">
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </button>
    </section>
  );
}
