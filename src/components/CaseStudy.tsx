'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingDown, TrendingUp, Star, Quote } from 'lucide-react';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  slideFromStart,
  slideFromEnd,
  viewportOnce,
} from '@/lib/animations';

// ─── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  {
    value: 64,
    suffix: '%',
    prefix: 'עד ',
    label: 'שיפור פוטנציאלי בשיעור הנטישה',
    icon: TrendingDown,
    color: 'text-sanctuary-sage-dark',
    bg: 'bg-sanctuary-sage/10',
  },
  {
    value: 180,
    suffix: '%',
    prefix: 'עד ',
    label: 'שיפור פוטנציאלי בפניות דרך האתר',
    icon: TrendingUp,
    color: 'text-sanctuary-brown-mid',
    bg: 'bg-sanctuary-warm',
  },
  {
    value: 4.9,
    suffix: '/5',
    prefix: '',
    label: 'ציון שביעות רצון מטופלים',
    icon: Star,
    color: 'text-sanctuary-clay',
    bg: 'bg-sanctuary-clay/10',
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setCount(current);
      if (current >= value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = isDecimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
interface StepCardProps {
  step: { label: string; number: string; heading: string; body: string };
  variants: typeof slideFromStart;
  color: string;
  borderColor: string;
}

function StepCard({ step, variants, color, borderColor }: StepCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`
        flex flex-col gap-5 p-8 lg:p-10
        rounded-3xl bg-white border ${borderColor} shadow-sanctuary
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`label-tag text-[10px] px-3 py-1.5 rounded-full ${color}`}
        >
          {step.label}
        </span>
        <span className="font-serif text-3xl text-sanctuary-sage-light font-light">
          {step.number}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-xl sm:text-2xl text-sanctuary-brown font-normal">
          {step.heading}
        </h3>
        <p className="body-balanced text-sm sm:text-base text-sanctuary-brown-mid">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────
export default function CaseStudy() {
  const steps = [
    {
      label: 'האתגר',
      number: '01',
      heading: 'אתר שיצר יותר חרדה מאשר פתרה',
      body: 'מרפאה פסיכולוגית בתל אביב עם רשימת המתנה ארוכה — אך אתר ישן, עמוס ולא מרגיע שגרם למטופלים פוטנציאליים לנטוש לפני שיצרו קשר.',
    },
    {
      label: 'הגישה שלנו',
      number: '02',
      heading: 'חשיבה מחדש מהיסוד',
      body: 'בנינו חוויה דיגיטלית חדשה לגמרי — ארכיטקטורת מידע, עיצוב, קופי ומערכת תורים. כל החלטה התקבלה לאחר ייעוץ עם הצוות הטיפולי ומחקר על חוויית המטופל הדיגיטלית.',
    },
    {
      label: 'התוצאות',
      number: '03',
      heading: 'פוטנציאל שינוי מוכח',
      body: 'חוויה דיגיטלית נכונה יכולה להפוך אתר נטוש לאפיק הפניות המוביל של הפרקטיקה — ולאפשר למטפל להתמקד במה שחשוב באמת: הקשר עם המטופל.',
    },
  ];

  const stepConfig = [
    {
      variants: slideFromStart,
      color: 'bg-sanctuary-sage/10 text-sanctuary-sage-dark',
      borderColor: 'border-sanctuary-sage-light',
    },
    {
      variants: fadeUp,
      color: 'bg-sanctuary-warm text-sanctuary-brown-mid',
      borderColor: 'border-sanctuary-warm',
    },
    {
      variants: slideFromEnd,
      color: 'bg-sanctuary-clay/10 text-sanctuary-brown-mid',
      borderColor: 'border-sanctuary-clay/30',
    },
  ];

  return (
    <section
      id="case-study"
      className="py-28 sm:py-36 bg-sanctuary-warm relative overflow-hidden"
      aria-labelledby="case-study-heading"
    >
      {/* Decorative blob */}
      <div
        className="absolute bottom-0 end-0 w-80 h-80 rounded-full
          bg-sanctuary-sage/10 blur-3xl translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      />

      <div className="section-wrapper max-w-7xl mx-auto relative z-10">
        {/* ─── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-5 mb-14 sm:mb-16"
        >
          <motion.span variants={fadeIn} className="label-tag text-sanctuary-brown-mid">
            מקרה לקוח
          </motion.span>
          <motion.h2
            id="case-study-heading"
            variants={fadeUp}
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-3xl"
          >
            מרפאה פסיכולוגית בתל אביב
          </motion.h2>
          <motion.div variants={fadeIn} className="divider-sanctuary" aria-hidden="true" />
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl"
          >
            כיצד הפיכת הנוכחות הדיגיטלית לחוויה מרגיעה הפכה אתר נטוש לאפיק
            הפניות המוביל של המרפאה.
          </motion.p>
        </motion.div>

        {/* ─── Step Cards ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-14 sm:mb-16"
        >
          {steps.map((step, i) => (
            <StepCard
              key={step.label}
              step={step}
              variants={stepConfig[i].variants}
              color={stepConfig[i].color}
              borderColor={stepConfig[i].borderColor}
            />
          ))}
        </motion.div>

        {/* ─── Stats Bar ────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6"
          role="list"
          aria-label="השפעה פוטנציאלית"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                role="listitem"
                className={`
                  flex flex-col items-center text-center gap-4
                  ${stat.bg} rounded-3xl p-8 border border-white/60
                `}
              >
                <div
                  className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon size={18} className={stat.color} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`font-serif text-4xl sm:text-5xl font-light ${stat.color}`}
                    aria-live="polite"
                  >
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="font-sans text-sm text-sanctuary-brown-mid font-light">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Testimonial ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 sm:mt-16"
        >
          <blockquote
            className="relative bg-white rounded-3xl p-8 sm:p-12
              border border-sanctuary-sage-light shadow-sanctuary text-center
              max-w-3xl mx-auto"
          >
            <Quote
              size={32}
              className="text-sanctuary-sage-light mx-auto mb-6 rotate-180"
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="font-serif text-lg sm:text-xl text-sanctuary-brown font-light italic leading-relaxed">
              &ldquo;לפני שיצרנו קשר עם The Digital Sanctuary, לא הבנו כמה האתר שלנו
              היה מכשול עבור המטופלים שלנו. עכשיו, הרבה מהם אומרים שהאתר הוא מה
              שגרם להם לפנות אלינו ולא לאחרים.&rdquo;
            </p>
            <footer className="mt-6 flex flex-col items-center gap-1">
              <cite className="font-sans text-sm font-medium text-sanctuary-brown not-italic">
                ד&quot;ר מיכל לוי, פסיכולוגית קלינית
              </cite>
              <span className="label-tag text-sanctuary-sage text-[10px]">
                מרפאה פסיכולוגית, תל אביב
              </span>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
