'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Feather, Palette, MessageSquareHeart } from 'lucide-react';

// ─── Philosophy Cards Data ────────────────────────────────────────────────────
const cards = [
  {
    icon: Feather,
    title: 'פחות = יותר ביטחון',
    body: 'אתר עמוס עם אלמנטים מתחרים יוצר חרדה. מרחב נקי, אוורירי ומסודר שולח מסר ברור: "אתה בטוח כאן." ביטחון הוא הצעד הראשון לפנייה לעזרה.',
    accent: 'bg-sanctuary-sage/10 border-sanctuary-sage-light',
    iconBg: 'bg-sanctuary-sage/15',
    iconColor: 'text-sanctuary-sage-dark',
  },
  {
    icon: Palette,
    title: 'צבעים שמרגיעים',
    body: 'פלטת הגוונים החמים והאדמתיים שלנו אינה אסתטיקה בלבד - היא מבוססת על מחקר פסיכולוגי. גוונים אלו מפעילים את מערכת העצבים הפאראסימפתטית ומאפשרים נשימה.',
    accent: 'bg-sanctuary-clay/10 border-sanctuary-clay/30',
    iconBg: 'bg-sanctuary-clay/15',
    iconColor: 'text-sanctuary-brown-mid',
  },
  {
    icon: MessageSquareHeart,
    title: 'מילים שמחבקות',
    body: 'כל משפט, כל כפתור, כל כותרת - נכתבו בשפה שמפחיתה חרדה ומגבירה את הנכונות לפנות לעזרה. כי "צרו קשר" מרגיש אחרת מ"בואו נדבר."',
    accent: 'bg-sanctuary-warm/60 border-sanctuary-warm',
    iconBg: 'bg-sanctuary-sage-light/40',
    iconColor: 'text-sanctuary-sage-dark',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current!;
    const trigger = { trigger: el, start: 'top 78%' };

    // Section header
    gsap.from(el.querySelectorAll('.phil-header > *'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: trigger,
    });

    // Cards — per-element trigger via batch
    ScrollTrigger.batch(el.querySelectorAll('.phil-card'), {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          force3D: true,
        });
      },
      start: 'top 88%',
      once: true,
    });

    // Blockquote
    gsap.from(el.querySelector('.phil-quote'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.phil-quote'), start: 'top 88%' },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-28 sm:py-36 bg-sanctuary-beige relative overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      {/* ─── Decorative Shape ──────────────────────────────────────────────── */}
      <div
        className="absolute top-0 start-0 w-64 h-64 rounded-full
          bg-sanctuary-sage/8 blur-3xl -translate-y-1/2 -translate-x-1/4"
        aria-hidden="true"
      />

      <div className="section-wrapper max-w-7xl mx-auto relative z-10">
        {/* ─── Section Header ─────────────────────────────────────────────── */}
        <div className="phil-header flex flex-col items-center text-center gap-5 mb-16 sm:mb-20">
          <span className="label-tag text-sanctuary-sage">הפילוסופיה שלנו</span>

          <h2
            id="philosophy-heading"
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-2xl"
          >
            כשהעיצוב מרגיש כמו נשימה עמוקה
          </h2>

          <div className="divider-sanctuary" aria-hidden="true" />

          <p className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl">
            המטופל שלכם מגיע לאתר שלכם ברגע פגיע. כל החלטת עיצוב שלנו
            מבוססת על שאלה אחת:{' '}
            <em className="font-normal not-italic text-sanctuary-brown">
              &quot;האם זה גורם לו להרגיש בטוח?&quot;
            </em>
          </p>
        </div>

        {/* ─── Cards Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`
                  phil-card
                  relative flex flex-col gap-5 p-8 lg:p-10
                  rounded-3xl border ${card.accent}
                  transition-transform duration-300 hover:-translate-y-1
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    inline-flex items-center justify-center
                    w-12 h-12 rounded-2xl ${card.iconBg}
                  `}
                  aria-hidden="true"
                >
                  <Icon size={22} className={card.iconColor} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-xl text-sanctuary-brown font-normal">
                    {card.title}
                  </h3>
                  <p className="body-balanced text-sm sm:text-base text-sanctuary-brown-mid leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ─── Bottom Quote ────────────────────────────────────────────────── */}
        <blockquote className="phil-quote mt-20 text-center">
          <p
            className="font-serif text-xl sm:text-2xl text-sanctuary-brown-mid
              font-light italic max-w-2xl mx-auto leading-relaxed"
          >
            &ldquo;האתר שלך הוא חדר ההמתנה הדיגיטלי שלך - וכמו בחדר ההמתנה האמיתי,
            כל פרט קטן שולח מסר למטופל.&rdquo;
          </p>
          <footer className="mt-4">
            <cite className="label-tag text-sanctuary-sage not-italic">
              - הצוות שלנו, The Digital Sanctuary
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
