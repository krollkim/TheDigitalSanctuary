'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

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
  const footerRef = useRef<HTMLElement>(null);
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

  useGSAP(() => {
    const el = footerRef.current!;

    // Columns stagger
    gsap.from(el.querySelectorAll('.footer-col'), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });

    // Bottom bar
    gsap.from(el.querySelector('.footer-bottom'), {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el.querySelector('.footer-bottom'), start: 'top 95%' },
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="bg-sanctuary-brown text-sanctuary-beige/70"
      role="contentinfo"
    >
      <div className="section-wrapper max-w-7xl mx-auto py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* ─── Brand Column ────────────────────────────────────────────────── */}
          <div className="footer-col col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-5">
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
            <div className="w-10 h-px bg-sanctuary-sage/30" aria-hidden="true" />
            <p className="font-sans text-xs text-sanctuary-beige/30">
              עיצוב שנולד מתוך הקשבה.
            </p>
          </div>

          {/* ─── Service Links ───────────────────────────────────────────────── */}
          <div className="footer-col flex flex-col gap-5">
            <h3 className="font-sans text-xs font-medium text-sanctuary-sage-light/70 tracking-widest uppercase">
              {footerLinks.service.title}
            </h3>
            <nav aria-label="קישורי שירות" className="flex flex-col gap-3">
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
          </div>

          {/* ─── Contact Links ───────────────────────────────────────────────── */}
          <div className="footer-col flex flex-col gap-5">
            <h3 className="font-sans text-xs font-medium text-sanctuary-sage-light/70 tracking-widest uppercase">
              {footerLinks.contact.title}
            </h3>
            <nav aria-label="קישורי יצירת קשר" className="flex flex-col gap-3">
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
          </div>
        </div>

        {/* ─── Bottom Bar ──────────────────────────────────────────────────────── */}
        <div
          className="footer-bottom mt-14 pt-8 border-t border-sanctuary-beige/10
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
        </div>
      </div>
    </footer>
  );
}
