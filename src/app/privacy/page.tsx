import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | The Digital Sanctuary',
  description: 'מדיניות הפרטיות של The Digital Sanctuary — כיצד אנו מגנים על המידע שלכם.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-sanctuary-off-white py-24 sm:py-32">
      <div className="px-6 sm:px-10 lg:px-16 max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm text-sanctuary-brown-light
            hover:text-sanctuary-sage-dark transition-colors duration-200 mb-12"
        >
          ← חזרה לעמוד הבית
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <span className="font-sans text-xs font-medium tracking-widest uppercase text-sanctuary-sage">
            מסמך משפטי
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-sanctuary-brown font-light tracking-wide">
            מדיניות פרטיות
          </h1>
          <div className="w-12 h-px bg-sanctuary-sage-mid" />
          <p className="font-sans text-sm text-sanctuary-brown-light">
            עודכן לאחרונה: מרץ 2025
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 font-sans text-sanctuary-brown-mid leading-relaxed">

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">1. מי אנחנו</h2>
            <p className="text-sm sm:text-base">
              The Digital Sanctuary, המופעל על ידי Smiley Solution, הוא שירות לבניית נוכחות דיגיטלית
              לפרקטיקות טיפוליות. כתובת: ישראל. ליצירת קשר:{' '}
              <a href="mailto:krollkimdev@gmail.com" className="text-sanctuary-sage-dark underline underline-offset-2">
                krollkimdev@gmail.com
              </a>
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">2. מידע שאנו אוספים</h2>
            <p className="text-sm sm:text-base">
              כאשר אתם ממלאים את טופס הפנייה באתר, אנו אוספים: שם, כתובת אימייל, סוג הפרקטיקה,
              ותוכן ההודעה. אנו לא אוספים מידע עודף ולא שומרים מידע מעבר למה שנדרש לטיפול בפנייה.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">3. כיצד אנו משתמשים במידע</h2>
            <p className="text-sm sm:text-base">
              המידע משמש אך ורק לצורך מענה לפנייתכם וניהול ההתקשרות העסקית. אנו לא מוכרים,
              משתפים, או מעבירים את המידע שלכם לצדדים שלישיים לכל מטרה שיווקית.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">4. אחסון ואבטחה</h2>
            <p className="text-sm sm:text-base">
              הפניות מעובדות דרך Netlify Forms עם הצפנה מלאה בעברת נתונים (HTTPS/TLS).
              אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלכם.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">5. זכויותיכם</h2>
            <p className="text-sm sm:text-base">
              בהתאם לחוק הגנת הפרטיות הישראלי ולתקנות GDPR (ככל שחלות), יש לכם זכות לעיין,
              לתקן, או לבקש מחיקה של המידע שלכם. לכל פנייה:{' '}
              <a href="mailto:krollkimdev@gmail.com" className="text-sanctuary-sage-dark underline underline-offset-2">
                krollkimdev@gmail.com
              </a>
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">6. עוגיות (Cookies)</h2>
            <p className="text-sm sm:text-base">
              האתר לא משתמש בעוגיות שיווקיות או מעקב. אנחנו לא מטמיעים כלי אנליטיקס של צד שלישי
              ללא הסכמתכם.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">7. שינויים במדיניות</h2>
            <p className="text-sm sm:text-base">
              אנו עשויים לעדכן מדיניות זו מעת לעת. תאריך העדכון האחרון מופיע בראש העמוד.
              המשך השימוש באתר לאחר שינויים מהווה הסכמה למדיניות המעודכנת.
            </p>
          </section>

        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-sanctuary-sage-light">
          <p className="font-sans text-xs text-sanctuary-brown-light">
            © {new Date().getFullYear()} The Digital Sanctuary by Smiley Solution
          </p>
        </div>

      </div>
    </main>
  );
}
