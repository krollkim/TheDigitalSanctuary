'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Palette, Rocket } from 'lucide-react';
import { fadeUp, fadeIn, staggerContainer, slideFromStart, slideFromEnd, viewportOnce } from '@/lib/animations';

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
    variants: slideFromStart,
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
    variants: fadeUp,
    size: 'md:col-span-2',
  },
];

// ─── Section Component ────────────────────────────────────────────────────────
export default function Process() {
  return (
    <section
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-5 mb-14 sm:mb-16"
        >
          <motion.span variants={fadeIn} className="label-tag text-sanctuary-sage">
            התהליך שלנו
          </motion.span>
          <motion.h2
            id="process-heading"
            variants={fadeUp}
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-2xl"
          >
            שלושה שלבים. בלי הפתעות.
          </motion.h2>
          <motion.div variants={fadeIn} className="divider-sanctuary" aria-hidden="true" />
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl"
          >
            אחת הסיבות העיקריות שמטפלים מהססים לפנות לעזרה דיגיטלית היא הפחד
            מהלא-נודע. אז הנה בדיוק מה שקורה.
          </motion.p>
        </motion.div>

        {/* ─── Top Row: Steps 01 + 02 ───────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                variants={step.variants}
                className={`
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
              </motion.article>
            );
          })}
        </motion.div>

        {/* ─── Step 03 - Full-width Launch card ────────────────────────────── */}
        <motion.article
          variants={slideFromEnd}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="
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
        </motion.article>

      </div>
    </section>
  );
}
