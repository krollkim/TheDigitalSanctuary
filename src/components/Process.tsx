'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MessageCircle, Palette, Rocket } from 'lucide-react';

// ─── Steps Data ───────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    icon: MessageCircle,
    label: 'שיחת גילוי',
    title: 'מכירים אתכם לפני שמתחילים',
    body: 'שיחה קצרה ללא מחויבות. אנחנו שואלים, מקשיבים, ומבינים את הפרקטיקה, הערכים, והמטופלים שלכם - לפני שמזיזים פיקסל אחד.',
    accent: 'bg-white border-sanctuary-sage-light',
    iconBg: 'bg-sanctuary-sage/12',
    iconColor: 'text-sanctuary-sage-dark',
    numberColor: 'text-sanctuary-sage-light',
    labelColor: 'bg-sanctuary-sage/10 text-sanctuary-sage-dark',
    size: 'md:col-span-1',
  },
  {
    number: '02',
    icon: Palette,
    label: 'עיצוב מותאם אישית',
    title: 'בונים את המרחב שלכם מאפס',
    body: 'אין תבניות. אין קיצורי דרך. כל החלטת עיצוב, כותרת, ומבנה עמוד מתקבלת דרך שאלה אחת: "האם זה גורם למטופל להרגיש בטוח?" אנחנו בונים חוויה דיגיטלית שמשקפת אתכם בדיוק - את הערכים, הגישה הטיפולית, והאנשים שאתם עוזרים להם.',
    accent: 'bg-white border-sanctuary-warm',
    iconBg: 'bg-sanctuary-warm',
    iconColor: 'text-sanctuary-brown-mid',
    numberColor: 'text-sanctuary-clay/40',
    labelColor: 'bg-sanctuary-warm text-sanctuary-brown-mid',
    size: 'md:col-span-2',
  },
];

// ─── Section Component ────────────────────────────────────────────────────────
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current!;
    const headerTrigger = { trigger: el, start: 'top 78%' };

    // Section header
    gsap.from(el.querySelectorAll('.proc-header > *'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: headerTrigger,
    });

    // Step 01 — slide from start (right in RTL)
    gsap.from(el.querySelector('.proc-step-01'), {
      opacity: 0,
      x: 32,
      duration: 0.75,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.proc-steps-row'), start: 'top 85%' },
    });

    // Step 02 — fade up
    gsap.from(el.querySelector('.proc-step-02'), {
      opacity: 0,
      y: 24,
      duration: 0.75,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.proc-steps-row'), start: 'top 85%' },
      delay: 0.1,
    });

    // Step 03 dark card — slide from end (left in RTL)
    gsap.from(el.querySelector('.proc-step-03'), {
      opacity: 0,
      x: -32,
      duration: 0.75,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.proc-step-03'), start: 'top 88%' },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-28 sm:py-36 bg-sanctuary-beige relative overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 end-0 w-72 h-72 rounded-full
          bg-sanctuary-clay/10 blur-3xl translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 start-0 w-64 h-64 rounded-full
          bg-sanctuary-sage/8 blur-3xl -translate-x-1/4 translate-y-1/4"
        aria-hidden="true"
      />

      <div className="section-wrapper max-w-7xl mx-auto relative z-10">

        {/* ─── Header ───────────────────────────────────────────────────────── */}
        <div className="proc-header flex flex-col items-center text-center gap-5 mb-14 sm:mb-16">
          <span className="label-tag text-sanctuary-sage">התהליך שלנו</span>
          <h2
            id="process-heading"
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-2xl"
          >
            שלושה שלבים. בלי הפתעות.
          </h2>
          <div className="divider-sanctuary" aria-hidden="true" />
          <p className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl">
            אחת הסיבות העיקריות שמטפלים מהססים לפנות לעזרה דיגיטלית היא הפחד
            מהלא-נודע. אז הנה בדיוק מה שקורה.
          </p>
        </div>

        {/* ─── Top Row: Steps 01 + 02 ───────────────────────────────────────── */}
        <div className="proc-steps-row grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className={`
                  ${i === 0 ? 'proc-step-01' : 'proc-step-02'}
                  ${step.size}
                  flex flex-col gap-5 p-8 lg:p-10
                  rounded-3xl border ${step.accent} shadow-sanctuary
                `}
              >
                {/* Top row: label + number */}
                <div className="flex items-center justify-between">
                  <span className={`label-tag text-[10px] px-3 py-1.5 rounded-full ${step.labelColor}`}>
                    {step.label}
                  </span>
                  <span className={`font-serif text-3xl font-light ${step.numberColor}`}>
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`
                    inline-flex items-center justify-center
                    w-12 h-12 rounded-2xl ${step.iconBg}
                  `}
                  aria-hidden="true"
                >
                  <Icon size={22} className={step.iconColor} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-sanctuary-brown font-normal">
                    {step.title}
                  </h3>
                  <p className="body-balanced text-sm sm:text-base text-sanctuary-brown-mid leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ─── Step 03 - Full-width Launch card ────────────────────────────── */}
        <article
          className="proc-step-03
            relative overflow-hidden
            bg-sanctuary-brown rounded-3xl border border-sanctuary-brown
            shadow-sanctuary-lg p-8 sm:p-10 lg:p-12
          "
        >
          {/* Decorative glow */}
          <div
            className="absolute bottom-0 start-0 w-64 h-64 rounded-full
              bg-sanctuary-sage/15 blur-3xl -translate-x-1/3 translate-y-1/3"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            {/* Left: label + number */}
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
              <span className="label-tag text-[10px] px-3 py-1.5 rounded-full bg-sanctuary-sage/20 text-sanctuary-sage-light">
                שלב שלישי
              </span>
              <span className="font-serif text-4xl font-light text-sanctuary-sage/30">
                03
              </span>
            </div>

            {/* Center: icon + text */}
            <div className="flex-1 flex flex-col gap-4 md:px-10">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sanctuary-sage/15"
                aria-hidden="true"
              >
                <Rocket size={22} className="text-sanctuary-sage-light" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-sanctuary-beige font-normal">
                  השקה וליווי - ואנחנו לא נעלמים
                </h3>
                <p className="body-balanced text-sm sm:text-base text-sanctuary-beige/60 leading-relaxed max-w-lg">
                  מקבלים אתר חי, מהיר ומוכן לאפיק פניות. אחרי ההשקה - אנחנו
                  שותפים לדרך: תמיכה שוטפת, עדכונים, ושיפורים שנבנים עם הפרקטיקה שלכם.
                </p>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="md:flex-shrink-0">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="
                  inline-flex items-center gap-3
                  bg-sanctuary-sage text-sanctuary-off-white
                  px-8 py-4 rounded-full
                  font-sans font-medium text-sm tracking-wide
                  transition-all duration-300 ease-sanctuary
                  hover:bg-sanctuary-sage-dark hover:shadow-sanctuary-md hover:-translate-y-0.5
                  focus-visible:ring-2 focus-visible:ring-sanctuary-sage focus-visible:ring-offset-2
                  whitespace-nowrap
                "
              >
                בואו נתחיל
              </a>
            </div>

          </div>
        </article>

      </div>
    </section>
  );
}
