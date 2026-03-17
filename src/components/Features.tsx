'use client';

import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Smartphone,
  ShieldCheck,
  Brain,
  HeadphonesIcon,
  BarChart3,
} from 'lucide-react';
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from '@/lib/animations';

// ─── Feature Data ─────────────────────────────────────────────────────────────
const features = [
  {
    id: 'booking',
    icon: CalendarCheck,
    title: 'תיאום תורים חלק',
    body: 'מערכת קביעת תורים אוטומטית שמפחיתה חיכוך ומאפשרת למטופל לפנות לעזרה בדיוק ברגע שהוא מוכן - ללא שיחת טלפון, ללא אי-נוחות.',
    size: 'md:col-span-2 md:row-span-2',
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
    size: 'md:col-span-1',
    variant: 'medium',
    iconSize: 22,
  },
];

// ─── Single Feature Card ──────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const Icon = feature.icon;
  const isLarge = feature.variant === 'large';

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className={`
        ${feature.size}
        relative group
        bg-white border border-sanctuary-sage-light
        rounded-3xl p-7 sm:p-8 lg:p-10
        shadow-sanctuary hover:shadow-sanctuary-md
        transition-all duration-500 overflow-hidden
        flex flex-col
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
    </motion.article>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section
      id="features"
      className="py-28 sm:py-36 bg-sanctuary-off-white"
      aria-labelledby="features-heading"
    >
      <div className="section-wrapper max-w-7xl mx-auto">
        {/* ─── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-5 mb-14 sm:mb-16"
        >
          <motion.span variants={fadeIn} className="label-tag text-sanctuary-sage">
            כלים ותכונות
          </motion.span>
          <motion.h2
            id="features-heading"
            variants={fadeUp}
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown max-w-2xl"
          >
            טכנולוגיה שנעלמת ברקע
          </motion.h2>
          <motion.div variants={fadeIn} className="divider-sanctuary" aria-hidden="true" />
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-xl"
          >
            כלים חכמים שמשרתים אתכם מאחורי הקלעים - ומשאירים את הבמה לקשר
            האנושי האמיתי.
          </motion.p>
        </motion.div>

        {/* ─── Bento Grid ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6
            auto-rows-[minmax(0,auto)]"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
