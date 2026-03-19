'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Quote, ShieldCheck, Feather, HeadphonesIcon } from 'lucide-react';

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

// ─── Section Component ────────────────────────────────────────────────────────
export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      label: 'האתגר',
      number: '01',
      heading: 'לתרגם חזון - לא רק לכתוב קוד',
      body: 'א׳ ידעה בדיוק מה היא רוצה להעניק לנשים שמגיעות אליה. האתגר היה למצוא מישהו שיבין את העולם הרגשי שלה ויתרגם אותו לשפה דיגיטלית - מבלי לאבד את הנשמה בדרך.',
      color: 'bg-sanctuary-sage/10 text-sanctuary-sage-dark',
      borderColor: 'border-sanctuary-sage-light',
    },
    {
      label: 'הגישה שלנו',
      number: '02',
      heading: 'ליווי אישי שהפך פחד לתהליך יצירתי',
      body: 'שיחות וידאו, אפיון משותף, וחילוץ ערכים - שקט פנימי, מרחב נשי, השראה - לשפת עיצוב. הפחד מטכנולוגיה הפך לתהליך יצירתי ורגוע שבו א׳ הרגישה בבית בכל שלב.',
      color: 'bg-sanctuary-warm text-sanctuary-brown-mid',
      borderColor: 'border-sanctuary-warm',
    },
    {
      label: 'התוצאות',
      number: '03',
      heading: 'בית דיגיטלי שמחבר נשים אל עצמן',
      body: 'אתר שמרגיש כמו מרחב בטוח - כזה שמחבר נשים אל עצמן עוד לפני הפגישה הראשונה עם א׳. לא סתם אתר, אלא הזמנה.',
      color: 'bg-sanctuary-clay/10 text-sanctuary-brown-mid',
      borderColor: 'border-sanctuary-clay/30',
    },
  ];

  useGSAP(() => {
    const el = sectionRef.current!;
    const headerTrigger = { trigger: el, start: 'top 78%' };

    // Section header
    gsap.from(el.querySelectorAll('.cs-header > *'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: headerTrigger,
    });

    // Step cards — slide from start / fade up / slide from end
    const cards = el.querySelectorAll('.cs-step-card');
    const cardTrigger = { trigger: el.querySelector('.cs-step-card'), start: 'top 85%' };

    gsap.from(cards[0], { opacity: 0, x: 32, duration: 0.75, ease: 'power3.out', force3D: true, scrollTrigger: cardTrigger });
    gsap.from(cards[1], { opacity: 0, y: 24, duration: 0.75, ease: 'power3.out', force3D: true, scrollTrigger: cardTrigger, delay: 0.1 });
    gsap.from(cards[2], { opacity: 0, x: -32, duration: 0.75, ease: 'power3.out', force3D: true, scrollTrigger: cardTrigger, delay: 0.2 });

    // Values — per-element trigger via batch
    ScrollTrigger.batch(el.querySelectorAll('.cs-value'), {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          force3D: true,
        });
      },
      start: 'top 88%',
      once: true,
    });

    // Testimonial
    gsap.from(el.querySelector('.cs-testimonial'), {
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.cs-testimonial'), start: 'top 88%' },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
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
        <div className="cs-header flex flex-col items-center text-center gap-5 mb-14 sm:mb-16">
          <span className="label-tag text-sanctuary-brown-mid">סיפור לקוחה</span>
          <h2
            id="case-study-heading"
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-3xl"
          >
            תרגום ריפוי רגשי לשפה דיגיטלית: הליווי של א&apos;
          </h2>
          <div className="divider-sanctuary" aria-hidden="true" />
          <p className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl">
            א&apos; מלווה נשים בתהליכי שחרור רגשי, תנועה ובניית ביטחון עצמי.
            הסיפור שלה הוא הסיפור של כל מטפלת שיודעת בדיוק מה היא רוצה להעניק -
            ורק צריכה מישהו שיתרגם זאת לשפה שהדיגיטל מבין.
          </p>
        </div>

        {/* ─── Step Cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-14 sm:mb-16">
          {steps.map((step) => (
            <div
              key={step.label}
              className={`
                cs-step-card
                flex flex-col gap-5 p-8 lg:p-10
                rounded-3xl bg-white border ${step.borderColor} shadow-sanctuary
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`label-tag text-[10px] px-3 py-1.5 rounded-full ${step.color}`}>
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
            </div>
          ))}
        </div>

        {/* ─── Values ───────────────────────────────────────────────────────── */}
        <div className="cs-values-section mb-14 sm:mb-16">
          <p className="label-tag text-sanctuary-sage text-center mb-8">
            הערכים שמנחים כל החלטה
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className={`
                    cs-value
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
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Testimonial ──────────────────────────────────────────────────── */}
        <div className="cs-testimonial">
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
        </div>

      </div>
    </section>
  );
}
