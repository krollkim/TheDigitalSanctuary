'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { fadeUp, fadeIn, staggerContainer, scaleFade, viewportOnce } from '@/lib/animations';

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
  {
    size: 'w-3 h-3 sm:w-4 sm:h-4',
    pos: 'top-1/3 end-[12%] sm:end-[18%]',
    delay: '0s',
    opacity: 'opacity-40',
  },
  {
    size: 'w-2 h-2',
    pos: 'top-2/3 start-[15%]',
    delay: '1.2s',
    opacity: 'opacity-30',
  },
  {
    size: 'w-5 h-5 sm:w-6 sm:h-6',
    pos: 'bottom-1/3 end-[22%] sm:end-[30%]',
    delay: '2.4s',
    opacity: 'opacity-20',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const handleScrollDown = () => {
    const next = document.querySelector('#philosophy');
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden
        bg-sanctuary-off-white bg-dot-pattern"
      aria-label="אזור ראשי"
    >
      {/* ─── Background Blobs ──────────────────────────────────────────────── */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          variants={scaleFade}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.3, duration: 1.4, ease: 'easeOut' }}
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-8"
        >
          {/* ─── Label Tag ───────────────────────────────────────────────────── */}
          <motion.div variants={fadeIn}>
            <span
              className="inline-flex items-center gap-2 label-tag text-sanctuary-sage
              bg-sanctuary-sage/10 border border-sanctuary-sage-light
              px-4 py-2 rounded-full"
            >
              <Sparkles size={11} strokeWidth={2} aria-hidden="true" />
              <span>פתרונות דיגיטלי לפרקטיקות טיפוליות</span>
            </span>
          </motion.div>

          {/* ─── Main Headline ────────────────────────────────────────────────── */}
          <motion.h1
            variants={fadeUp}
            className="heading-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl
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
          </motion.h1>

          {/* ─── Subheadline ──────────────────────────────────────────────────── */}
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg lg:text-xl
              text-sanctuary-brown-mid max-w-2xl"
          >
            הפתרון הדיגיטלי שמטפלים בוחרים כשהם רוצים שהמטופל שלהם ירגיש בטוח
            עוד לפני שנכנס לחדר — כי נוכחות דיגיטלית שקטה היא חלק מהטיפול.
          </motion.p>

          {/* ─── CTA Buttons ──────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              <span>בואו נדבר</span>
            </a>
            <a
              href="#philosophy"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#philosophy')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ghost"
            >
              <span>גלו עוד</span>
            </a>
          </motion.div>

          {/* ─── Trust Indicators ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10
              pt-4 text-sanctuary-brown-light"
          >
            {[
              { value: '+120', label: 'מטפלים פעילים' },
              { value: '98%', label: 'שביעות רצון' },
              { value: '48h', label: 'זמן השקה' },
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
          </motion.div>
        </motion.div>
      </div>

      {/* ─── Scroll Indicator ──────────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-2 text-sanctuary-brown-light
          hover:text-sanctuary-sage transition-colors duration-300 group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sanctuary-sage
          rounded-lg p-2"
        aria-label="גלול למטה"
      >
        <span className="label-tag text-[10px]">גלילה</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="group-hover:text-sanctuary-sage"
        >
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
