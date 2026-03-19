'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import {
  MapPin,
  Sparkles,
  ArrowDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

// ─── Pain Points ──────────────────────────────────────────────────────────────
const painPoints = [
  { emoji: '🌿', text: 'יש לי אתר - אבל הוא לא מביא לי מטופלים חדשים' },
  { emoji: '🗺️', text: 'אני יודע/ת שמגיע לי נוכחות דיגיטלית טובה יותר, אבל לא יודע/ת מאיפה להתחיל' },
  { emoji: '💻', text: 'הטכנולוגיה מרגישה רחוקה מהעולם הטיפולי שלי' },
  { emoji: '🤝', text: 'רוב המטופלים שלי מגיעים מפה לאוזן - ורציתי שהדיגיטל יעשה את העבודה הזו' },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    label: 'שיחת גילוי',
    heading: 'מכירים אתכם לפני הכל',
    body: 'שיחה קצרה של 30 דקות, בחינם ובלי מחויבות. אנחנו שואלים, מקשיבים, ומבינים את הפרקטיקה, הערכים, והמטופלים שלכם.',
  },
  {
    number: '02',
    label: 'מפת הדרכים האישית',
    heading: 'ממפים את המסע שלכם — ביחד',
    body: 'במהלך השיחה נמפה את הפערים ונבנה יחד את תוכנית הפעולה האישית שלך. בסוף השיחה תצאי עם בהירות מלאה לגבי הצעדים הבאים שלך.',
  },
  {
    number: '03',
    label: 'בוחרים ביחד',
    heading: 'אתם מחליטים מה הצעד הבא',
    body: 'מפת הדרכים היא שלכם - בין אם תמשיכו לעבוד איתנו ובין אם לא. אנחנו מאמינים שמטפלים ראויים לשקיפות מלאה.',
  },
];

// ─── Shared Input Class ───────────────────────────────────────────────────────
const inputClass = `
  w-full bg-white border border-sanctuary-sage-light/70 rounded-2xl
  px-5 py-3.5 font-sans text-sm text-sanctuary-brown
  placeholder:text-sanctuary-brown-light
  focus:outline-none focus:ring-2 focus:ring-sanctuary-sage/30 focus:border-sanctuary-sage
  transition-all duration-300
`;

// ─── Lead Form ────────────────────────────────────────────────────────────────
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
}

function LeadForm() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', role: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<Pick<FormState, 'name' | 'email'>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim())  next.name  = 'נא להזין שם';
    if (!form.email.trim()) next.email = 'נא להזין אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'אימייל לא תקין';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          email:       form.email,
          phone:       form.phone,
          role:        form.role,
          message:     form.message,
          source:      'roadmap',
          'bot-field': '',
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="anim-panel-in flex flex-col items-center text-center gap-6 py-14">
        <div className="w-16 h-16 rounded-full bg-sanctuary-sage/12 border border-sanctuary-sage-light flex items-center justify-center">
          <CheckCircle2 size={28} className="text-sanctuary-sage-dark" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-3 max-w-xs">
          <h3 className="font-serif text-2xl text-sanctuary-brown font-normal">הבקשה נשלחה</h3>
          <p className="font-sans text-sm text-sanctuary-brown-mid leading-relaxed">
            ניצור קשר תוך יום עסקי אחד לתיאום שיחת הגילוי ולשליחת מפת הדרכים האישית שלכם.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-sanctuary-brown">שם מלא *</label>
          <input
            name="name" type="text" placeholder="שם מלא"
            value={form.name} onChange={handleChange} disabled={status === 'loading'}
            className={`${inputClass} ${errors.name ? 'border-red-300' : ''} disabled:opacity-60`}
          />
          {errors.name && <p className="anim-fade-in font-sans text-xs text-red-500/80">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-sanctuary-brown">אימייל *</label>
          <input
            name="email" type="email" placeholder="your@email.com"
            value={form.email} onChange={handleChange} disabled={status === 'loading'}
            className={`${inputClass} ${errors.email ? 'border-red-300' : ''} disabled:opacity-60`}
          />
          {errors.email && <p className="anim-fade-in font-sans text-xs text-red-500/80">{errors.email}</p>}
        </div>
      </div>

      {/* Phone + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-sanctuary-brown">
            טלפון{' '}
            <span className="text-sanctuary-brown-light font-normal">(אופציונלי)</span>
          </label>
          <input
            name="phone" type="tel" placeholder="05X-XXX-XXXX"
            value={form.phone} onChange={handleChange} disabled={status === 'loading'}
            className={`${inputClass} disabled:opacity-60`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-sanctuary-brown">סוג הפרקטיקה</label>
          <select
            name="role" value={form.role} onChange={handleChange} disabled={status === 'loading'}
            className={`${inputClass} cursor-pointer disabled:opacity-60`}
          >
            <option value="" disabled>בחרו...</option>
            <option value="psychologist">פסיכולוג/ית קלינית</option>
            <option value="therapist">מטפל/ת בהבעה ויצירה</option>
            <option value="social-worker">עובד/ת סוציאלי/ת</option>
            <option value="psychiatrist">פסיכיאטר/ית</option>
            <option value="clinic">מרפאה / מרכז טיפולי</option>
            <option value="other">אחר</option>
          </select>
        </div>
      </div>

      {/* Optional message */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-sm font-medium text-sanctuary-brown">
          מה הכי מציק לכם עכשיו?{' '}
          <span className="text-sanctuary-brown-light font-normal">(אופציונלי)</span>
        </label>
        <textarea
          name="message" rows={3}
          placeholder="למשל: האתר לא מייצג אותי, לא מגיעים אלי מטופלים חדשים..."
          value={form.message} onChange={handleChange} disabled={status === 'loading'}
          className={`${inputClass} resize-none disabled:opacity-60`}
        />
      </div>

      <p className="font-sans text-xs text-sanctuary-brown-light leading-relaxed">
        הפרטים שלכם מוגנים לחלוטין ולא יועברו לאף גורם חיצוני.
      </p>

      <button
        type="submit" disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-4 text-base
          disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /><span>שולח...</span></>
        ) : (
          <><MapPin size={16} strokeWidth={1.5} /><span>אני רוצה לתאם שיחת אבחון ומפה</span></>
        )}
      </button>

      {status === 'error' && (
        <p className="anim-fade-in flex items-center justify-center gap-2 font-sans text-sm text-red-500/80">
          <AlertCircle size={14} />
          משהו השתבש. נסו שוב או פנו אלינו ישירות.
        </p>
      )}
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RoadmapPage() {
  const formRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const validationRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Show floating CTA after 600px scroll
  useEffect(() => {
    const onScroll = () => setShowFloating(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero mount entrance
  useGSAP(() => {
    const el = heroRef.current!;
    gsap.from(el.querySelectorAll('.hero-item'), {
      opacity: 0,
      y: 20,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
    });
  }, { scope: heroRef });

  // Validation section
  useGSAP(() => {
    const el = validationRef.current!;
    gsap.from(el.querySelectorAll('.val-item'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  }, { scope: validationRef });

  // Process section
  useGSAP(() => {
    const el = processRef.current!;
    gsap.from(el.querySelectorAll('.proc-item'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  }, { scope: processRef });

  // Form section
  useGSAP(() => {
    const el = formSectionRef.current!;
    gsap.from(el.querySelectorAll('.form-item'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  }, { scope: formSectionRef });

  // Floating CTA — GSAP in/out
  useEffect(() => {
    const el = floatingRef.current;
    if (!el) return;
    gsap.killTweensOf(el);

    if (showFloating) {
      gsap.set(el, { display: 'flex' });
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', force3D: true }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 40,
        duration: 0.3,
        ease: 'power2.in',
        force3D: true,
        onComplete: () => { gsap.set(el, { display: 'none' }); },
      });
    }
  }, [showFloating]);

  return (
    <div className="min-h-screen bg-sanctuary-off-white" dir="rtl">

      {/* ── Minimal Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-sanctuary-off-white/90 backdrop-blur-sm
        border-b border-sanctuary-sage-light/30"
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-base text-sanctuary-brown tracking-wide">
              The Digital Sanctuary
            </span>
            <span className="font-sans text-[10px] text-sanctuary-brown-light tracking-wider">
              by Smiley Solution
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 font-sans text-xs text-sanctuary-brown-light
              hover:text-sanctuary-sage-dark transition-colors duration-200"
          >
            <span>חזרה לאתר</span>
            <ExternalLink size={11} strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      <main>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden py-24 sm:py-36">
          {/* Background glow */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-[700px] h-[700px] rounded-full bg-sanctuary-sage/6 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col items-center text-center gap-7">
              <span
                className="hero-item inline-flex items-center gap-2 label-tag text-sanctuary-sage
                  bg-sanctuary-sage/10 border border-sanctuary-sage-light px-4 py-2 rounded-full"
              >
                <Sparkles size={11} aria-hidden="true" />
                שיחת Roadmap — בחינם
              </span>

              <h1
                className="hero-item font-serif text-4xl sm:text-5xl lg:text-6xl text-sanctuary-brown
                  font-light leading-tight tracking-wide"
              >
                הפרקטיקה שלך ראויה לנוכחות דיגיטלית שתביא מטופלים -
                <span className="relative inline-block mx-2">
                  <span className="relative z-10"> לא תסכול</span>
                  <span
                    className="absolute bottom-1 start-0 end-0 h-2 bg-sanctuary-sage-light/50
                      rounded-sm -z-0"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              <p
                className="hero-item font-sans text-base sm:text-lg text-sanctuary-brown-mid
                  leading-relaxed max-w-lg"
              >
                שיחת ייעוץ של 20 דקות שבסופה תצאי עם תוכנית פעולה ברורה לנוכחות
                הדיגיטלית שלך — שנבנית ביחד, לא מתוך קובץ.
              </p>

              <div className="hero-item flex flex-col items-center gap-3">
                <button
                  onClick={scrollToForm}
                  className="btn-primary text-base px-8 py-4"
                >
                  <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
                  <span>תיאום שיחת Roadmap במתנה</span>
                </button>
                <span className="font-sans text-xs text-sanctuary-brown-light">
                  ללא עלות · ללא מחויבות · ללא ז׳רגון טכנולוגי
                </span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center mt-16" aria-hidden="true">
              <ArrowDown size={18} className="text-sanctuary-brown-light/50 animate-bounce" />
            </div>
          </div>
        </section>

        {/* ── Mirror / Validation ────────────────────────────────────────────── */}
        <section ref={validationRef} className="py-20 sm:py-28 bg-sanctuary-beige">
          <div className="max-w-2xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col gap-10">
              <div className="val-item flex flex-col items-center text-center gap-4">
                <span className="label-tag text-sanctuary-sage">אם זה נשמע מוכר</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-sanctuary-brown font-light">
                  אתם לא לבד.
                </h2>
                <div className="divider-sanctuary" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-4">
                {painPoints.map((point, i) => (
                  <div
                    key={i}
                    className="val-item flex items-start gap-4 p-6 bg-white rounded-2xl
                      border border-sanctuary-sage-light/50 shadow-sanctuary"
                  >
                    <span className="text-xl mt-0.5 flex-shrink-0" aria-hidden="true">
                      {point.emoji}
                    </span>
                    <p className="font-sans text-sm sm:text-base text-sanctuary-brown-mid leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                ))}
              </div>

              <blockquote
                className="val-item font-serif text-lg sm:text-xl text-sanctuary-brown font-light
                  italic text-center leading-relaxed border-s-2 border-sanctuary-sage-light
                  ps-6 py-2"
              >
                "מטפלים טובים לא צריכים להיות גם מומחי שיווק דיגיטלי.
                זו בדיוק הסיבה שאנחנו כאן."
              </blockquote>
            </div>
          </div>
        </section>

        {/* ── Process ────────────────────────────────────────────────────────── */}
        <section ref={processRef} className="py-20 sm:py-28 bg-sanctuary-off-white">
          <div className="max-w-2xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col gap-12">
              <div className="proc-item flex flex-col items-center text-center gap-4">
                <span className="label-tag text-sanctuary-sage">תהליך פשוט</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-sanctuary-brown font-light">
                  שלושה שלבים. ללא הפתעות.
                </h2>
                <div className="divider-sanctuary" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-10">
                {steps.map((step, i) => (
                  <div key={step.number} className="proc-item flex gap-6 items-start">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="font-serif text-3xl text-sanctuary-sage-light font-light leading-none">
                        {step.number}
                      </span>
                      {i < steps.length - 1 && (
                        <div className="w-px h-12 mt-3 bg-sanctuary-sage-light/40" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <span className="label-tag text-sanctuary-sage text-[10px]">{step.label}</span>
                      <h3 className="font-serif text-xl sm:text-2xl text-sanctuary-brown font-normal">
                        {step.heading}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-sanctuary-brown-mid leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Lead Form ──────────────────────────────────────────────────────── */}
        <section
          ref={(el) => {
            (formRef as React.MutableRefObject<HTMLElement | null>).current = el;
            (formSectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
          }}
          id="form"
          className="py-20 sm:py-28 bg-sanctuary-warm"
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10">
            <div className="flex flex-col gap-10">
              <div className="form-item flex flex-col items-center text-center gap-4">
                <span className="label-tag text-sanctuary-sage">הצעד הראשון</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-sanctuary-brown font-light">
                  בואי נשרטט את מפת הדרכים שלך —
                  <span className="relative inline-block mx-1">
                    <span className="relative z-10">בחינם</span>
                    <span
                      className="absolute bottom-1 start-0 end-0 h-2 bg-sanctuary-sage-light/50
                        rounded-sm -z-0"
                      aria-hidden="true"
                    />
                  </span>
                </h2>
                <div className="divider-sanctuary" aria-hidden="true" />
                <p className="font-sans text-base text-sanctuary-brown-mid max-w-sm leading-relaxed">
                  שיחת ייעוץ קצרה (20 דק׳) שבסופה תצאי עם תוכנית פעולה ברורה לנוכחות
                  הדיגיטלית שלך. בלי התחייבות, בלי ז׳רגון טכנולוגי.
                </p>
              </div>

              <div
                className="form-item bg-white rounded-3xl border border-sanctuary-sage-light
                  shadow-sanctuary-md p-8 sm:p-12"
              >
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-sanctuary-off-white border-t border-sanctuary-sage-light/30">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row
          items-center justify-between gap-4"
        >
          <p className="font-sans text-xs text-sanctuary-brown-light">
            © {new Date().getFullYear()} The Digital Sanctuary by Smiley Solution
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-sanctuary-brown-light
                hover:text-sanctuary-sage-dark transition-colors duration-200"
            >
              מדיניות פרטיות
            </Link>
            <Link
              href="/"
              className="font-sans text-xs text-sanctuary-brown-light
                hover:text-sanctuary-sage-dark transition-colors duration-200"
            >
              האתר הראשי
            </Link>
          </div>
        </div>
      </footer>

      {/* ── Floating CTA ───────────────────────────────────────────────────── */}
      <div
        ref={floatingRef}
        style={{ display: 'none' }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center justify-center"
      >
        <button
          onClick={scrollToForm}
          className="btn-primary shadow-sanctuary-md px-7 py-3.5 text-sm whitespace-nowrap"
        >
          <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
          <span>תיאום שיחת Roadmap במתנה</span>
        </button>
      </div>

    </div>
  );
}
