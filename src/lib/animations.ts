// Shared scroll-entrance helpers (GSAP + ScrollTrigger).
// See src/lib/gsap.ts for the GSAP setup.

import { gsap } from './gsap';

interface RevealCardsOptions {
  /** Grid columns — the stagger delay resets each row, so there is no long tail. */
  columns?: number;
  /** Delay between cards within a row, in seconds. */
  stagger?: number;
  /** Vertical travel, in px. */
  y?: number;
  /** Tween duration, in seconds. */
  duration?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * True when the visitor has asked for less motion — either at the OS level or
 * via the on-site accessibility widget, which toggles `.a11y-reduce-motion`.
 *
 * The reduce-motion CSS in globals.css only neutralises CSS animations and
 * transitions; GSAP writes inline styles per frame and is unaffected by it.
 * Without this check, the one control on the page that promises less movement
 * would leave every scroll reveal running.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-reduce-motion')
  );
}

/**
 * Card "wave" reveal: one ScrollTrigger per card, so each card stays glued to
 * the scroll position instead of firing as a group.
 *
 * Two things here are deliberate, and both were bugs before:
 *
 * 1. `ScrollTrigger.batch` + a single `gsap.from` over the whole set could
 *    strand cards mid-tween — they kept the from-state transform forever and
 *    sat offset below their neighbours, which read as a broken grid.
 *
 * 2. The cards carry a CSS `transition` for their hover lift. That transition
 *    interpolates the very transform/opacity GSAP rewrites each frame, which
 *    stalls the tween. The transition is therefore suspended for the duration
 *    of the entrance and restored on completion, so hover still works.
 *
 * `fromTo` (rather than `from`) states both ends explicitly, so a half-applied
 * transition can never be mistaken for the intended end state. `clearProps`
 * then removes the inline styles entirely, leaving the card in its CSS state.
 */
export function revealCards(
  cards: HTMLElement[],
  options: RevealCardsOptions = {},
): void {
  const {
    columns = 3,
    stagger = 0.12,
    y = 24,
    duration = 0.7,
    start = 'top 88%',
  } = options;

  if (prefersReducedMotion()) return;

  cards.forEach((card, i) => {
    const inlineTransition = card.style.transition;
    card.style.transition = 'none';

    gsap.fromTo(
      card,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power2.out',
        delay: (i % columns) * stagger,
        force3D: true,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: card,
          start,
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          card.style.transition = inlineTransition;
          gsap.set(card, { clearProps: 'transform,opacity' });
        },
      },
    );
  });
}
