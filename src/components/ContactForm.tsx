'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from '@/lib/animations';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  role: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Form Field Component ─────────────────────────────────────────────────────
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
      <label
        htmlFor={id}
        className="font-sans text-sm font-medium text-sanctuary-brown"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-sans text-xs text-red-500/80"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
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

// ─── Section Component ────────────────────────────────────────────────────────
export default function ContactForm() {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const roleId = `${uid}-role`;
  const messageId = `${uid}-message`;

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    role: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'נא להזין שם מלא';
    if (!form.email.trim()) next.email = 'נא להזין כתובת אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'כתובת אימייל אינה תקינה';
    if (!form.message.trim()) next.message = 'נא לכתוב הודעה קצרה';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    // Simulate async submission — replace with your actual API call
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
  };

  return (
    <section
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
        {/* ─── Header ───────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center gap-5 mb-12 sm:mb-14"
        >
          <motion.span variants={fadeIn} className="label-tag text-sanctuary-sage">
            דברו איתנו
          </motion.span>
          <motion.h2
            id="contact-heading"
            variants={fadeUp}
            className="heading-section text-3xl sm:text-4xl lg:text-5xl
              text-sanctuary-brown"
          >
            בואו נבנה ביחד
          </motion.h2>
          <motion.div variants={fadeIn} className="divider-sanctuary" aria-hidden="true" />
          <motion.p
            variants={fadeUp}
            className="body-balanced text-base sm:text-lg text-sanctuary-brown-mid max-w-md"
          >
            שיחה חופשית, ללא מחויבות וללא לחץ. ספרו לנו על הפרקטיקה שלכם ונחשוב
            ביחד איך אנחנו יכולים לעזור.
          </motion.p>
        </motion.div>

        {/* ─── Form Card ────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-white rounded-3xl border border-sanctuary-sage-light
            shadow-sanctuary-md p-8 sm:p-12"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              /* ─── Success State ─────────────────────────────────────────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center gap-6 py-10"
                role="status"
                aria-live="polite"
              >
                <div className="w-16 h-16 rounded-full bg-sanctuary-sage/15 flex items-center justify-center">
                  <CheckCircle2
                    size={32}
                    className="text-sanctuary-sage-dark"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-2xl text-sanctuary-brown font-normal">
                    ההודעה נשלחה בהצלחה
                  </h3>
                  <p className="body-balanced text-sanctuary-brown-mid text-sm sm:text-base">
                    תודה על פנייתכם. נחזור אליכם בתוך 24 שעות עסקיות.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* ─── Form State ────────────────────────────────────────────── */
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6"
                aria-label="טופס יצירת קשר"
              >
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
                      className={`${inputClass} ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${nameId}-error` : undefined}
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
                      className={`${inputClass} ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
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
                    className={`${inputClass} cursor-pointer`}
                    aria-label="בחרו סוג פרקטיקה"
                  >
                    <option value="" disabled>
                      בחרו סוג פרקטיקה...
                    </option>
                    <option value="psychologist">פסיכולוג/ית קלינית</option>
                    <option value="therapist">מטפל/ת בהבעה ויצירה</option>
                    <option value="social-worker">עובד/ת סוציאלי/ת</option>
                    <option value="psychiatrist">פסיכיאטר/ית</option>
                    <option value="clinic">מרפאה / מרכז טיפולי</option>
                    <option value="other">אחר</option>
                  </select>
                </Field>

                {/* Message */}
                <Field label="ספרו לנו קצת על עצמכם" id={messageId} error={errors.message}>
                  <textarea
                    id={messageId}
                    name="message"
                    rows={5}
                    placeholder="אנחנו מרפאה קטנה בתל אביב, יש לנו אתר ישן שלא משקף את הערכים שלנו..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none ${errors.message ? 'border-red-300 focus:border-red-400 focus:ring-red-200' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                </Field>

                {/* Privacy note */}
                <p className="font-sans text-xs text-sanctuary-brown-light leading-relaxed">
                  הפרטים שלכם מוגנים ולא יועברו לשום גורם שלישי. אנחנו מאמינים
                  בפרטיות — גם בשלכם.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary self-center sm:self-start min-w-[180px]
                    justify-center disabled:opacity-70 disabled:cursor-not-allowed
                    disabled:hover:translate-y-0"
                  aria-label="שליחת הפנייה"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      <span>שולח...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={1.5} aria-hidden="true" />
                      <span>שלחו הודעה</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── Alternative Contact ──────────────────────────────────────────── */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mt-8 font-sans text-sm text-sanctuary-brown-light"
        >
          מעדיפים לדבר?{' '}
          <a
            href="tel:+972500000000"
            className="text-sanctuary-sage-dark underline underline-offset-2
              hover:text-sanctuary-sage transition-colors duration-200"
          >
            050-000-0000
          </a>
        </motion.p>
      </div>
    </section>
  );
}
