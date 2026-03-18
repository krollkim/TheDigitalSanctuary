import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | The Digital Sanctuary',
  description:
    'הצהרת הנגישות של The Digital Sanctuary — האתר עומד בדרישות תקן ישראלי 5568 ברמת AA.',
  robots: { index: true, follow: true },
};

// ─── Small section block ──────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif text-xl text-sanctuary-brown font-normal">{title}</h2>
      <div className="flex flex-col gap-2 font-sans text-sm sm:text-base text-sanctuary-brown-mid leading-relaxed">
        {children}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AccessibilityPage() {
  return (
    <main
      className="min-h-screen bg-sanctuary-off-white py-24 sm:py-32"
      id="main-content"
    >
      <div className="px-6 sm:px-10 lg:px-16 max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            font-sans text-sm text-sanctuary-brown-light
            hover:text-sanctuary-sage-dark transition-colors duration-200
            mb-12
          "
        >
          ← חזרה לעמוד הבית
        </Link>

        {/* Page header */}
        <div className="flex flex-col gap-4 mb-14">
          <span className="font-sans text-xs font-medium tracking-widest uppercase text-sanctuary-sage">
            מסמך נגישות
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-sanctuary-brown font-light tracking-wide leading-tight">
            הצהרת נגישות
          </h1>
          <div className="w-12 h-px bg-sanctuary-sage-mid" aria-hidden="true" />
          <p className="font-sans text-sm text-sanctuary-brown-light">
            עודכן לאחרונה: מרץ 2025
          </p>
        </div>

        {/* Compliance badge */}
        <div
          className="
            flex items-center gap-4 p-5
            rounded-2xl border border-sanctuary-sage-light
            bg-sanctuary-sage/8 mb-12
          "
          role="note"
          aria-label="רמת עמידה בתקן"
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#7B2D3E' }}
            aria-hidden="true"
          >
            <span className="font-sans text-white font-bold text-xs">AA</span>
          </div>
          <p className="font-sans text-sm text-sanctuary-brown-mid leading-relaxed">
            אתר זה עומד בדרישות{' '}
            <strong className="font-medium text-sanctuary-brown">תקן ישראלי 5568</strong>{' '}
            (המבוסס על{' '}
            <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
            {' '}2.1) ברמת{' '}
            <strong className="font-medium text-sanctuary-brown">AA</strong>.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">

          <Section title="1. מה זו נגישות דיגיטלית?">
            <p>
              נגישות דיגיטלית פירושה שאנשים עם מוגבלויות — לרבות לקויות ראייה, שמיעה,
              מוטוריקה, וקוגניציה — יכולים להשתמש באתר באופן מלא ועצמאי.
              אנו מחויבים לכך לא רק מבחינה חוקית, אלא מתוך ערך עמוק של הכלה.
            </p>
          </Section>

          <Section title="2. עמידה בתקן">
            <p>
              אתר זה נבנה בהתאם לדרישות{' '}
              <strong className="font-medium">תקן ישראלי 5568</strong>{' '}
              ברמת AA, הכולל את ההנחיות הבאות:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-1.5 pe-2">
              <li>תפיסה — תכנים ניתנים להצגה בדרכים שונות ללא אובדן מידע</li>
              <li>תפעול — ניתן להשתמש באתר באמצעות מקלדת בלבד</li>
              <li>הבנה — התכנים ברורים וצפויים להתנהגות</li>
              <li>עמידות — האתר תואם לטכנולוגיות סיוע מובילות</li>
            </ul>
          </Section>

          <Section title="3. ההתאמות שביצענו">
            <ul className="list-disc list-inside flex flex-col gap-2 pe-2">
              <li>
                <strong className="font-medium">ניווט מקלדת מלא</strong> — כל האלמנטים
                האינטראקטיביים נגישים דרך Tab / Enter / Escape. סדר ה-Tab עוקב אחר
                המבנה הלוגי של הדף.
              </li>
              <li>
                <strong className="font-medium">תפריט נגישות צף</strong> — כפתור הנגישות
                בפינת המסך מאפשר הגדלת טקסט, ניגודיות גבוהה, והפחתת אנימציות.
                ההעדפות נשמרות לביקור הבא.
              </li>
              <li>
                <strong className="font-medium">חלופות טקסטואליות</strong> — לכל תמונה
                ואייקון מצורף תיאור טקסטואלי (alt / aria-label) לשימוש עם קוראי מסך.
              </li>
              <li>
                <strong className="font-medium">יחסי ניגודיות</strong> — כל הצבעים עומדים
                ביחס ניגודיות מינימלי של 4.5:1 לטקסט רגיל ו-3:1 לטקסט גדול.
              </li>
              <li>
                <strong className="font-medium">מבנה סמנטי</strong> — כל הכותרות, הכפתורים,
                הטפסים, והאזורים מוגדרים בתגיות HTML סמנטיות ותפקידי ARIA.
              </li>
              <li>
                <strong className="font-medium">תמיכה ב-RTL</strong> — האתר בנוי מלכתחילה
                כאתר עברי מימין לשמאל, כולל כיוון קריאה, סדר Tab, ופריסה.
              </li>
              <li>
                <strong className="font-medium">הפחתת תנועה</strong> — האתר מכבד את הגדרת
                מערכת ההפעלה{' '}
                <code className="font-mono text-xs bg-sanctuary-beige px-1.5 py-0.5 rounded">
                  prefers-reduced-motion
                </code>
                {' '}ומציע בנוסף כפתור ידני בתפריט הנגישות.
              </li>
            </ul>
          </Section>

          <Section title="4. טכנולוגיות סיוע נתמכות">
            <p>האתר נבדק ומיועד לעבוד עם:</p>
            <ul className="list-disc list-inside flex flex-col gap-1.5 pe-2">
              <li>NVDA + Firefox (Windows)</li>
              <li>VoiceOver + Safari (macOS / iOS)</li>
              <li>TalkBack (Android)</li>
              <li>ניווט מקלדת בלבד — Chrome, Firefox, Safari, Edge</li>
            </ul>
          </Section>

          <Section title="5. מגבלות ידועות">
            <p>
              אנו שואפים לנגישות מלאה ומשקיעים בשיפור מתמיד. ייתכן שתכנים שנוצרו
              על ידי צדדים שלישיים (כגון טפסים חיצוניים) עדיין אינם עומדים בכל
              דרישות התקן. אנו פועלים לתיקון ממצאים אלה בהקדם.
            </p>
          </Section>

          <Section title="6. פנייה לרכז הנגישות">
            <p>
              גילינו בעיית נגישות? יש לכם שאלה או בקשה? נשמח לשמוע ולתקן במהירות.
            </p>
            <div className="flex flex-col gap-1 mt-1">
              <p>
                <strong className="font-medium text-sanctuary-brown">רכז הנגישות:</strong>{' '}
                The Digital Sanctuary
              </p>
              <p>
                <strong className="font-medium text-sanctuary-brown">אימייל:</strong>{' '}
                <a
                  href="mailto:krollkimdev@gmail.com"
                  className="text-sanctuary-sage-dark underline underline-offset-2
                    hover:text-sanctuary-sage transition-colors duration-200"
                >
                  krollkimdev@gmail.com
                </a>
              </p>
              <p className="text-xs text-sanctuary-brown-light mt-1">
                אנו מתחייבים להגיב לכל פנייה בתוך 5 ימי עסקים.
              </p>
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-sanctuary-sage-light">
          <p className="font-sans text-xs text-sanctuary-brown-light">
            © {new Date().getFullYear()} The Digital Sanctuary by Smiley Solution
          </p>
        </div>

      </div>
    </main>
  );
}
