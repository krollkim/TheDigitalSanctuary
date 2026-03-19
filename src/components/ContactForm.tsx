'use client';

import { useState, useId, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Send, CheckCircle2, Loader2, AlertCircle, Lock } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  role: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Form Field Wrapper ───────────────────────────────────────────────────────
function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-sm font-medium text-sanctuary-brown">
        {label}
      </label>
      {children}
      {error && (
        <p className="anim-fade-in font-sans text-xs text-red-500/80" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared Input Classes ─────────────────────────────────────────────────────
const inputClass = `
  w-full bg-white border border-sanctuary-sage-light rounded-2xl
  px-5 py-3.5 font-sans text-sm text-sanctuary-brown
  placeholder:text-sanctuary-brown-light
  focus:outline-none focus:ring-2 focus:ring-sanctuary-sage/40 focus:border-sanctuary-sage
  transition-all duration-300
`;

// ─── Success State Panel ──────────────────────────────────────────────────────
function SuccessPanel() {
  return (
    <div
      className="anim-panel-in flex flex-col items-center text-center gap-6 py-12"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-16 h-16 rounded-full bg-sanctuary-sage/12
          border border-sanctuary-sage-light flex items-center justify-center"
      >
        <CheckCircle2
          size={28}
          className="text-sanctuary-sage-dark"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-2xl text-sanctuary-brown font-normal">
          ההודעה הגיעה אלינו בשלום
        </h3>
        <p className="body-balanced text-sanctuary-brown-mid text-sm sm:text-base max-w-xs mx-auto">
          קראנו, שמענו, ונחזור אליכם בשקט - בדרך כלל תוך יום עסקי אחד.
        </p>
      </div>
    </div>
  );
}

// ─── Error State Panel ────────────────────────────────────────────────────────
function ErrorPanel({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      className="anim-panel-in flex flex-col items-center text-center gap-6 py-12"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="w-16 h-16 rounded-full bg-sanctuary-warm border border-sanctuary-sage-light
          flex items-center justify-center"
      >
        <AlertCircle
          size={28}
          className="text-sanctuary-brown-light"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-2xl text-sanctuary-brown font-normal">
          משהו לא הלך כשורה
        </h3>
        <p className="body-balanced text-sanctuary-brown-mid text-sm sm:text-base max-w-xs mx-auto">
          ההודעה לא נשלחה הפעם. ניתן לנסות שוב, או לפנות אלינו ישירות בטלפון.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="btn-ghost text-sm px-6 py-3"
        aria-label="נסו לשלוח שוב"
      >
        נסו שוב
      </button>
    </div>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────
export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const uid = useId();
  const nameId    = `${uid}-name`;
  const emailId   = `${uid}-email`;
  const roleId    = `${uid}-role`;
  const messageId = `${uid}-message`;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    role: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  useGSAP(() => {
    const el = sectionRef.current!;
    const trigger = { trigger: el, start: 'top 78%' };

    gsap.from(el.querySelectorAll('.cf-header > *'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: trigger,
    });

    gsap.from(el.querySelector('.cf-card'), {
      opacity: 0,
      y: 24,
      duration: 0.75,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el.querySelector('.cf-card'), start: 'top 85%' },
    });

    gsap.from(el.querySelector('.cf-alt-contact'), {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el.querySelector('.cf-alt-contact'), start: 'top 92%' },
    });
  }, { scope: sectionRef });

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim())    next.name    = 'נא להזין שם מלא';
    if (!form.email.trim())   next.email   = 'נא להזין כתובת אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'כתובת אימייל אינה תקינה';
    if (!form.message.trim()) next.message = 'נא לכתוב הודעה קצרה';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ─── Field Change ────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          role:        form.role,
          message:     form.message,
          'bot-field': '',
        }),
      });

      if (!res.ok) throw new Error(`Contact API returned ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error('[ContactForm] submission failed:', err);
      setStatus('error');
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 sm:py-36 bg-sanctuary-beige relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 end-0 w-72 h-72 rounded-full
          bg-sanctuary-sage/8 blur-3xl translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 start-0 w-64 h-64 rounded-full
          bg-sanctuary-warm/80 blur-3xl -translate-x-1/4 translate-y-1/4"
        aria-hidden="true"
      />

      <div className="section-wrapper max-w-3xl mx-auto relative z-10">

        {/* ─── Header ─────────────────────────────────────────────────────────── */}
        <div className="cf-header flex flex-col items-center text-center gap-5 mb-12 sm:mb-14">
          <span className="label-tag text-sanctuary-sage">דברו איתנו</span>
          <h2
            id="contact-heading"
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown"
          >
            בואו נבנה ביחד
          </h2>
          <div className="divider-sanctuary" aria-hidden="true" />
          <p className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-md">
            שיחה חופשית, ללא מחויבות וללא לחץ. ספרו לנו על הפרקטיקה שלכם
            ונחשוב ביחד איך אנחנו יכולים לעזור.
          </p>

          {/* Trust signal */}
          <div
            className="flex items-center gap-1.5 text-sanctuary-sage-dark"
            aria-label="אבטחת מידע"
          >
            <Lock size={12} strokeWidth={2} aria-hidden="true" />
            <span className="font-sans text-xs tracking-wide">
              כל הפרטים מוצפנים ומאובטחים
            </span>
          </div>
        </div>

        {/* ─── Form Card ──────────────────────────────────────────────────────── */}
        <div
          className="cf-card bg-white rounded-3xl border border-sanctuary-sage-light
            shadow-sanctuary-md p-8 sm:p-12"
        >
          {status === 'success' && <SuccessPanel />}
          {status === 'error'   && <ErrorPanel onRetry={() => setStatus('idle')} />}

          {(status === 'idle' || status === 'loading') && (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
              aria-label="טופס יצירת קשר"
            >
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  שדה זה אינו למילוי:
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="שם מלא" id={nameId} error={errors.name}>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="ד״ר ישראלי"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className={`${inputClass} ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''} disabled:opacity-60`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="כתובת אימייל" id={emailId} error={errors.email}>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="doctor@clinic.co.il"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className={`${inputClass} ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''} disabled:opacity-60`}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>

              {/* Role */}
              <Field label="סוג הפרקטיקה / תפקיד" id={roleId}>
                <select
                  id={roleId}
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className={`${inputClass} cursor-pointer disabled:opacity-60`}
                  aria-label="בחרו סוג פרקטיקה"
                >
                  <option value="" disabled>בחרו סוג פרקטיקה...</option>
                  <option value="psychologist">פסיכולוג/ית קלינית</option>
                  <option value="therapist">מטפל/ת בהבעה ויצירה</option>
                  <option value="social-worker">עובד/ת סוציאלי/ת</option>
                  <option value="psychiatrist">פסיכיאטר/ית</option>
                  <option value="clinic">מרפאה / מרכז טיפולי</option>
                  <option value="other">אחר</option>
                </select>
              </Field>

              {/* Message */}
              <Field
                label="ספרו לנו קצת על עצמכם"
                id={messageId}
                error={errors.message}
              >
                <textarea
                  id={messageId}
                  name="message"
                  rows={5}
                  placeholder="אנחנו מרפאה קטנה בתל אביב, יש לנו אתר ישן שלא משקף את הערכים שלנו..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className={`${inputClass} resize-none ${errors.message ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''} disabled:opacity-60`}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
              </Field>

              {/* Privacy note */}
              <p className="font-sans text-xs text-sanctuary-brown-light leading-relaxed">
                הפרטים שלכם מוגנים ולא יועברו לשום גורם שלישי. אנחנו מאמינים
                בפרטיות - גם בשלכם.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary self-center sm:self-start min-w-[200px]
                  justify-center disabled:opacity-70 disabled:cursor-not-allowed
                  disabled:hover:translate-y-0"
                aria-label={status === 'loading' ? 'שולח הודעה, נא להמתין' : 'שליחת הפנייה'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    <span>שולח בשקט...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} strokeWidth={1.5} aria-hidden="true" />
                    <span>שלחו הודעה</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ─── Alternative Contact ────────────────────────────────────────────── */}
        <p
          className="cf-alt-contact text-center mt-8 font-sans text-sm text-sanctuary-brown-light"
        >
          מעדיפים לדבר?{' '}
          <a
            href="tel:+972525890252"
            className="text-sanctuary-sage-dark underline underline-offset-2
              hover:text-sanctuary-sage transition-colors duration-200"
          >
            052-589-0252
          </a>
          {' '}או{' '}
          <a
            href="https://wa.me/972525890252"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sanctuary-sage-dark underline underline-offset-2
              hover:text-sanctuary-sage transition-colors duration-200"
          >
            WhatsApp
          </a>
        </p>

      </div>
    </section>
  );
}
