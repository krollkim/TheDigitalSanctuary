'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import {
  CalendarCheck,
  Smartphone,
  ShieldCheck,
  Brain,
  HeadphonesIcon,
  BarChart3,
} from 'lucide-react';

// ─── Feature Data ─────────────────────────────────────────────────────────────
const features = [
  {
    id: 'booking',
    icon: CalendarCheck,
    title: 'תיאום תורים חלק',
    body: 'מערכת קביעת תורים אוטומטית שמפחיתה חיכוך ומאפשרת למטופל לפנות לעזרה בדיוק ברגע שהוא מוכן - ללא שיחת טלפון, ללא אי-נוחות.',
    size: 'md:col-span-2',
    variant: 'large',
    iconSize: 28,
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'בהיר בכל מסך',
    body: 'עיצוב שנראה מושלם בטלפון, בטאבלט ובמחשב. כי המטופל שלכם לא תמיד ליד המחשב ברגע שהוא מחליט לפנות לעזרה.',
    size: 'md:col-span-1',
    variant: 'medium',
    iconSize: 22,
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'אבטחה מלאה',
    body: 'הגנה מקסימלית על נתוני המטופלים בהתאם לתקני האבטחה המחמירים ביותר. פרטיות היא לא אופציה - היא מחויבות.',
    size: 'md:col-span-1',
    variant: 'medium',
    iconSize: 22,
  },
  {
    id: 'ux',
    icon: Brain,
    title: 'ממשק מרגיע',
    body: 'חווית משתמש שתוכננה על ידי מומחים לבריאות הנפש - כל אלמנט, כל מרווח, כל צבע נבחר כדי להפחית חרדה.',
    size: 'md:col-span-1',
    variant: 'medium',
    iconSize: 22,
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: 'תמיכה טכנית 24/6',
    body: 'אנחנו לצדכם בכל שלב - מהשקה, דרך עדכונים ועד לתחזוקה שוטפת.',
    size: 'md:col-span-1',
    variant: 'medium',
    iconSize: 22,
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'תובנות ואנליטיקס',
    body: 'הבינו מי מבקר באתר שלכם ומה גורם להם לפנות - בדאשבורד פשוט ואינטואיטיבי.',
    size: 'md:col-span-3',
    variant: 'large',
    iconSize: 28,
  },
];

// ─── Single Feature Card ──────────────────────────────────────────────────────
function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  const Icon = feature.icon;
  const isLarge = feature.variant === 'large';

  return (
    <article
      className={`
        feat-card
        ${feature.size}
        relative group
        bg-white border border-sanctuary-sage-light
        rounded-3xl p-7 sm:p-8 lg:p-10
        shadow-sanctuary hover:shadow-sanctuary-md
        transition-all duration-500 overflow-hidden
        flex flex-col
        hover:-translate-y-1
        ${isLarge ? 'min-h-[280px] sm:min-h-[320px]' : 'min-h-[180px] sm:min-h-[200px]'}
      `}
      aria-label={feature.title}
    >
      {/* Hover Accent */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sanctuary-sage/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        aria-hidden="true"
      />

      {/* Decorative corner shape */}
      {isLarge && (
        <div
          className="absolute bottom-0 start-0 w-48 h-48 rounded-full
            bg-sanctuary-sage-light/20 blur-2xl -translate-x-1/3 translate-y-1/3"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center
            w-11 h-11 rounded-2xl bg-sanctuary-warm border border-sanctuary-sage-light/50"
          aria-hidden="true"
        >
          <Icon
            size={feature.iconSize}
            className="text-sanctuary-sage-dark"
            strokeWidth={1.5}
          />
        </div>

        {/* Text */}
        <div className={`flex flex-col gap-2 ${isLarge ? 'max-w-sm' : ''}`}>
          <h3
            className={`font-serif text-sanctuary-brown font-normal leading-snug
              ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}
          >
            {feature.title}
          </h3>
          <p
            className={`body-balanced text-sanctuary-brown-mid
              ${isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}`}
          >
            {feature.body}
          </p>
        </div>
      </div>
    </article>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current!;

    // Section header — single trigger for the whole header block
    gsap.from(el.querySelectorAll('.feat-header > *'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 78%' },
    });

    // Bento cards — per-element trigger via batch so each row animates
    // when it individually enters the viewport (matches Framer whileInView)
    ScrollTrigger.batch(el.querySelectorAll('.feat-card'), {
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          force3D: true,
        });
      },
      start: 'top 88%',
      once: true,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-28 sm:py-36 bg-sanctuary-off-white"
      aria-labelledby="features-heading"
    >
      <div className="section-wrapper max-w-7xl mx-auto">
        {/* ─── Header ───────────────────────────────────────────────────────── */}
        <div className="feat-header flex flex-col items-center text-center gap-5 mb-14 sm:mb-16">
          <span className="label-tag text-sanctuary-sage">כלים ותכונות</span>
          <h2
            id="features-heading"
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-2xl"
          >
            טכנולוגיה שנעלמת ברקע
          </h2>
          <div className="divider-sanctuary" aria-hidden="true" />
          <p className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl">
            כלים חכמים שמשרתים אתכם מאחורי הקלעים - ומשאירים את הבמה לקשר
            האנושי האמיתי.
          </p>
        </div>

        {/* ─── Bento Grid ───────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6
            auto-rows-[minmax(0,auto)]"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
