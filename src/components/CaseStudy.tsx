'use client';

import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Feather, HeadphonesIcon } from 'lucide-react';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  slideFromStart,
  slideFromEnd,
  viewportOnce,
} from '@/lib/animations';

// ─── Value Cards Data ─────────────────────────────────────────────────────────
const values = [
  {
    icon: ShieldCheck,
    title: 'פרטיות מוחלטת',
    body: 'נתוני המטופלים שלכם מוגנים בהתאם לתקנות הפרטיות המחמירות ביותר. פרטיות היא לא תכונה - היא עמוד השדרה של המוצר.',
    accent: 'bg-sanctuary-sage/8 border-sanctuary-sage-light',
    iconBg: 'bg-sanctuary-sage/12',
    iconColor: 'text-sanctuary-sage-dark',
  },
  {
    icon: Feather,
    title: 'עיצוב מרגיע מבוסס מחקר',
    body: 'כל פרט - מרווח, צבע, פונט - נבחר על בסיס מחקר פסיכולוגי. המטרה: להפחית חרדה לפני שהמטופל כותב מילה אחת.',
    accent: 'bg-sanctuary-warm/60 border-sanctuary-warm',
    iconBg: 'bg-sanctuary-warm',
    iconColor: 'text-sanctuary-brown-mid',
  },
  {
    icon: HeadphonesIcon,
    title: 'ליווי אישי לאורך הדרך',
    body: 'אנחנו לא נעלמים אחרי ההשקה. אנחנו שותפים לטווח ארוך - עם תמיכה, עדכונים, ושיפורים שמשאירים אתכם ממוקדים בקשר הטיפולי.',
    accent: 'bg-sanctuary-clay/8 border-sanctuary-clay/30',
    iconBg: 'bg-sanctuary-clay/12',
    iconColor: 'text-sanctuary-clay',
  },
];

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
      heading: 'לתרגם חזון - לא רק לכתוב קוד',
      body: 'א׳ ידעה בדיוק מה היא רוצה להעניק לנשים שמגיעות אליה. האתגר היה למצוא מישהו שיבין את העולם הרגשי שלה ויתרגם אותו לשפה דיגיטלית - מבלי לאבד את הנשמה בדרך.',
    },
    {
      label: 'הגישה שלנו',
      number: '02',
      heading: 'ליווי אישי שהפך פחד לתהליך יצירתי',
      body: 'שיחות וידאו, אפיון משותף, וחילוץ ערכים - שקט פנימי, מרחב נשי, השראה - לשפת עיצוב. הפחד מטכנולוגיה הפך לתהליך יצירתי ורגוע שבו א׳ הרגישה בבית בכל שלב.',
    },
    {
      label: 'התוצאות',
      number: '03',
      heading: 'בית דיגיטלי שמחבר נשים אל עצמן',
      body: 'אתר שמרגיש כמו מרחב בטוח - כזה שמחבר נשים אל עצמן עוד לפני הפגישה הראשונה עם א׳. לא סתם אתר, אלא הזמנה.',
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
            סיפור לקוחה
          </motion.span>
          <motion.h2
            id="case-study-heading"
            variants={fadeUp}
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-3xl"
          >
            תרגום ריפוי רגשי לשפה דיגיטלית: הליווי של א&apos;
          </motion.h2>
          <motion.div variants={fadeIn} className="divider-sanctuary" aria-hidden="true" />
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl"
          >
            א&apos; מלווה נשים בתהליכי שחרור רגשי, תנועה ובניית ביטחון עצמי.
            הסיפור שלה הוא הסיפור של כל מטפלת שיודעת בדיוק מה היא רוצה להעניק -
            ורק צריכה מישהו שיתרגם זאת לשפה שהדיגיטל מבין.
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

        {/* ─── Values ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-14 sm:mb-16"
        >
          <motion.p
            variants={fadeIn}
            className="label-tag text-sanctuary-sage text-center mb-8"
          >
            הערכים שמנחים כל החלטה
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className={`
                    flex flex-col gap-4 p-7 sm:p-8
                    rounded-3xl border ${v.accent}
                  `}
                >
                  <div
                    className={`
                      inline-flex items-center justify-center
                      w-11 h-11 rounded-2xl ${v.iconBg}
                    `}
                    aria-hidden="true"
                  >
                    <Icon size={20} className={v.iconColor} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-lg text-sanctuary-brown font-normal">
                      {v.title}
                    </h3>
                    <p className="body-balanced text-sm text-sanctuary-brown-mid leading-relaxed">
                      {v.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Testimonial ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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
              &ldquo;חיפשתי מישהו שיוביל אותי יד ביד דרך הפחד מטכנולוגיה. הליווי האישי
              והדיוק של The Digital Sanctuary גרמו לי להרגיש בטוחה לקפוץ למים.
              היום יש לי אתר שמייצג אותי באמת ועוזר לי להגיע לנשים שזקוקות לי.&rdquo;
            </p>
            <footer className="mt-6 flex flex-col items-center gap-1">
              <cite className="font-sans text-sm font-medium text-sanctuary-brown not-italic">
                א&apos;
              </cite>
              <span className="label-tag text-sanctuary-sage text-[10px]">
                מרחב לריפוי רגשי וליווי נשים
              </span>
            </footer>
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
