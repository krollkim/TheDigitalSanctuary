'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Menu, X } from 'lucide-react';

// ─── Navigation Items ─────────────────────────────────────────────────────────
const navItems = [
  { label: 'הפילוסופיה שלנו', href: '#philosophy' },
  { label: 'כלים ותכונות', href: '#features' },
  { label: 'מקרי לקוח', href: '#case-study' },
  { label: 'התהליך שלנו', href: '#process' },
  { label: 'בואו נדבר', href: '#contact' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header entrance on mount
  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.7,
      ease: 'power3.out',
      force3D: true,
    });
  }, { scope: headerRef });

  // Mobile menu: open / close
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    gsap.killTweensOf(el);

    if (mobileOpen) {
      gsap.set(el, { display: 'block' });
      gsap.fromTo(
        el,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', force3D: true }
      );
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: 'power2.in',
        force3D: true,
        onComplete: () => { gsap.set(el, { display: 'none' }); },
      });
    }
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-sanctuary-off-white/90 backdrop-blur-md shadow-sanctuary border-b border-sanctuary-sage-light/40'
            : 'bg-transparent'
          }
        `}
        role="banner"
      >
        <div className="section-wrapper max-w-7xl mx-auto">
          <nav
            className="flex items-center justify-between h-18 lg:h-20"
            aria-label="ניווט ראשי"
          >
            {/* ─── Logo ─────────────────────────────────────────────────────── */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-end gap-0.5 group focus-visible:outline-none"
              aria-label="The Digital Sanctuary - עמוד הבית"
            >
              <span className="font-serif text-lg text-sanctuary-brown tracking-wider group-hover:text-sanctuary-sage-dark transition-colors duration-300">
                The Digital Sanctuary
              </span>
              <span className="label-tag text-sanctuary-brown-light text-[10px] group-hover:text-sanctuary-sage transition-colors duration-300">
                by Smiley Solution
              </span>
            </a>

            {/* ─── Desktop Nav ──────────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-sans text-sm font-light text-sanctuary-brown-mid
                    relative after:absolute after:bottom-0 after:end-0 after:h-px after:w-0
                    after:bg-sanctuary-sage after:transition-all after:duration-300
                    hover:after:w-full hover:text-sanctuary-brown
                    transition-colors duration-200 py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* ─── Desktop CTA ──────────────────────────────────────────────── */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary text-sm px-6 py-3"
              >
                <span>בואו נדבר</span>
              </a>
            </div>

            {/* ─── Mobile Menu Toggle ────────────────────────────────────────── */}
            <button
              className="lg:hidden p-2 text-sanctuary-brown-mid hover:text-sanctuary-brown
                transition-colors duration-200 rounded-lg focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-sanctuary-sage"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ──────────────────────────────────────────────── */}
      <div
        ref={menuRef}
        id="mobile-menu"
        style={{ display: 'none' }}
        className="fixed top-18 inset-x-0 z-40 bg-sanctuary-off-white/95 backdrop-blur-md
          border-b border-sanctuary-sage-light shadow-sanctuary-md lg:hidden"
        role="navigation"
        aria-label="תפריט נייד"
      >
        <div className="section-wrapper py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-sans text-base font-light text-sanctuary-brown-mid
                hover:text-sanctuary-brown hover:bg-sanctuary-beige/60
                py-3 px-4 rounded-xl transition-all duration-200 block"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-sanctuary-sage-light mt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary w-full justify-center"
            >
              בואו נדבר
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
