'use client';

import { motion } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer } from '@/lib/animations';

// ─── Footer Links ─────────────────────────────────────────────────────────────
const footerLinks = {
  service: {
    title: 'השירות',
    items: [
      { label: 'הפילוסופיה שלנו', href: '#philosophy' },
      { label: 'כלים ותכונות', href: '#features' },
      { label: 'מקרי לקוח', href: '#case-study' },
    ],
  },
  contact: {
    title: 'צרו קשר',
    items: [
      { label: 'טופס פנייה', href: '#contact' },
      { label: 'krollkimdev@gmail.com', href: 'mailto:krollkimdev@gmail.com' },
      { label: '052-589-0252', href: 'tel:+972525890252' },
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="bg-sanctuary-brown text-sanctuary-beige/70"
      role="contentinfo"
    >
      <div className="section-wrapper max-w-7xl mx-auto py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"
        >
          {/* ─── Brand Column ────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <span className="font-serif text-xl text-sanctuary-beige tracking-wider">
                The Digital Sanctuary
              </span>
              <span className="label-tag text-sanctuary-sage-light/60 text-[10px]">
                by Smiley Solution
              </span>
            </div>
            <p className="body-balanced text-sm text-sanctuary-beige/50 max-w-sm leading-relaxed">
              פתרונות דיגיטליים לפרקטיקות טיפוליות שמאמינות שהחוויה הדיגיטלית
              היא חלק בלתי נפרד מהחוויה הטיפולית.
            </p>
            {/* Small divider */}
            <div className="w-10 h-px bg-sanctuary-sage/30" aria-hidden="true" />
            <p className="font-sans text-xs text-sanctuary-beige/30">
              עיצוב שנולד מתוך הקשבה.
            </p>
          </motion.div>

          {/* ─── Service Links ───────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-sans text-xs font-medium text-sanctuary-sage-light/70 tracking-widest uppercase">
              {footerLinks.service.title}
            </h3>
            <nav
              aria-label="קישורי שירות"
              className="flex flex-col gap-3"
            >
              {footerLinks.service.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-sm text-sanctuary-beige/50
                    hover:text-sanctuary-beige/90 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ─── Contact Links ───────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5">
            <h3 className="font-sans text-xs font-medium text-sanctuary-sage-light/70 tracking-widest uppercase">
              {footerLinks.contact.title}
            </h3>
            <nav
              aria-label="קישורי יצירת קשר"
              className="flex flex-col gap-3"
            >
              {footerLinks.contact.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-sm text-sanctuary-beige/50
                    hover:text-sanctuary-beige/90 transition-colors duration-200
                    break-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* ─── Bottom Bar ──────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 pt-8 border-t border-sanctuary-beige/10
            flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-sans text-xs text-sanctuary-beige/30">
            © {year} The Digital Sanctuary by Smiley Solution. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="font-sans text-xs text-sanctuary-beige/30
                hover:text-sanctuary-beige/60 transition-colors duration-200"
            >
              מדיניות פרטיות
            </a>
            <a
              href="/terms"
              className="font-sans text-xs text-sanctuary-beige/30
                hover:text-sanctuary-beige/60 transition-colors duration-200"
            >
              תנאי שימוש
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
