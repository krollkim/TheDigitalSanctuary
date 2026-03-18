'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Accessibility, X, ZoomIn, Contrast, Wind, ExternalLink } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Prefs = {
  largeText: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
};

const STORAGE_KEY = 'tds-a11y-prefs';

const defaultPrefs: Prefs = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
};

// ─── Apply prefs to <html> via CSS classes ────────────────────────────────────
function applyPrefs(p: Prefs) {
  const cl = document.documentElement.classList;
  cl.toggle('a11y-large-text', p.largeText);
  cl.toggle('a11y-high-contrast', p.highContrast);
  cl.toggle('a11y-reduce-motion', p.reduceMotion);
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function ToggleRow({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className={`
        flex items-center justify-between w-full
        px-4 py-3 rounded-xl
        font-sans text-sm
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        focus-visible:ring-[#7B2D3E]
        ${active
          ? 'border border-[#7B2D3E]/20'
          : 'hover:bg-sanctuary-beige border border-transparent'
        }
      `}
      style={active ? { backgroundColor: 'rgba(123,45,62,0.06)' } : undefined}
    >
      {/* Icon + Label */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          style={{ color: active ? '#7B2D3E' : '#9A8A80' }}
          className="transition-colors duration-200"
        >
          {icon}
        </span>
        <span
          className="transition-colors duration-200"
          style={{ color: active ? '#7B2D3E' : '#6B5D55' }}
        >
          {label}
        </span>
      </div>

      {/* Toggle pill — dir="ltr" so left/right always means left/right */}
      <div
        dir="ltr"
        aria-hidden="true"
        className="relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-300"
        style={{ backgroundColor: active ? '#7B2D3E' : '#D4D4B8' }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
          style={{ left: active ? '22px' : '2px' }}
        />
      </div>
    </button>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────
export default function AccessibilityWidget() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefs, setPrefs]     = useState<Prefs>(defaultPrefs);

  const panelRef   = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ── Hydrate from localStorage ──────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Prefs;
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, []);

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // ── Close on outside click ─────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // ── Toggle individual pref ─────────────────────────────────────────────────
  const toggle = useCallback((key: keyof Prefs) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      applyPrefs(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/*
        Both elements use isolation: isolate so they form their own stacking
        context. More importantly, they are rendered as direct children of
        <body> — as a DOM sibling of <main> — which means the high-contrast
        filter applied to `main` in globals.css never reaches them.
      */}

      {/* ── Floating trigger button ──────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות'}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="
          fixed bottom-6 end-6 z-50
          w-14 h-14 rounded-full
          flex items-center justify-center
          shadow-sanctuary-lg
          transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          focus-visible:ring-[#7B2D3E]
          hover:-translate-y-0.5 hover:shadow-lg
        "
        style={{
          backgroundColor: open ? '#6A2435' : '#7B2D3E',
          isolation: 'isolate',
        }}
      >
        {open
          ? <X size={22} strokeWidth={1.5} className="text-white" aria-hidden="true" />
          : <Accessibility size={22} strokeWidth={1.5} className="text-white" aria-hidden="true" />
        }
      </button>

      {/* ── Panel ───────────────────────────────────────────────────────────── */}
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="region"
          aria-label="אפשרויות נגישות"
          className="
            fixed bottom-24 end-6 z-50
            w-72
            rounded-2xl
            border border-sanctuary-sage-light
            shadow-sanctuary-lg
            overflow-hidden
          "
          style={{
            backgroundColor: '#ffffff',  /* explicit — never transparent */
            isolation: 'isolate',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ backgroundColor: '#7B2D3E' }}
          >
            <Accessibility
              size={16}
              strokeWidth={1.5}
              className="text-white/80 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="font-sans text-sm font-medium text-white tracking-wide">
              אפשרויות נגישות
            </span>
          </div>

          {/* Toggle rows */}
          <div className="p-3 flex flex-col gap-1">
            <ToggleRow
              icon={<ZoomIn size={17} strokeWidth={1.5} />}
              label="הגדלת טקסט"
              active={prefs.largeText}
              onToggle={() => toggle('largeText')}
            />
            <ToggleRow
              icon={<Contrast size={17} strokeWidth={1.5} />}
              label="ניגודיות גבוהה"
              active={prefs.highContrast}
              onToggle={() => toggle('highContrast')}
            />
            <ToggleRow
              icon={<Wind size={17} strokeWidth={1.5} />}
              label="הפחתת תנועה"
              active={prefs.reduceMotion}
              onToggle={() => toggle('reduceMotion')}
            />
          </div>

          {/* Accessibility statement link */}
          <div className="px-3 pb-3">
            <a
              href="/accessibility"
              className="
                flex items-center justify-between w-full
                px-4 py-3 rounded-xl
                border border-sanctuary-sage-light/70
                font-sans text-sm text-sanctuary-brown-mid
                hover:bg-sanctuary-beige hover:text-sanctuary-brown
                transition-colors duration-200
              "
            >
              <span>הצהרת נגישות</span>
              <ExternalLink
                size={13}
                strokeWidth={1.5}
                className="text-sanctuary-brown-light flex-shrink-0"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
