import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'תנאי שימוש | The Digital Sanctuary',
  description: 'תנאי השימוש של The Digital Sanctuary — התנאים המסדירים את השימוש בשירות.',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
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
            תנאי שימוש
          </h1>
          <div className="w-12 h-px bg-sanctuary-sage-mid" />
          <p className="font-sans text-sm text-sanctuary-brown-light">
            עודכן לאחרונה: מרץ 2025
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 font-sans text-sanctuary-brown-mid leading-relaxed">

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">1. קבלת התנאים</h2>
            <p className="text-sm sm:text-base">
              השימוש באתר The Digital Sanctuary מהווה הסכמה לתנאים אלו. אם אינכם מסכימים לתנאים,
              אנא הפסיקו את השימוש באתר.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">2. תיאור השירות</h2>
            <p className="text-sm sm:text-base">
              The Digital Sanctuary מציע שירותי עיצוב ופיתוח אתרים, ייעוץ דיגיטלי, ומערכות קביעת
              תורים לפרקטיקות טיפוליות. תנאי כל פרויקט יסוכמו בהסכם נפרד בכתב.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">3. קניין רוחני</h2>
            <p className="text-sm sm:text-base">
              כל התכנים, העיצובים, והקוד שפותחו על ידי The Digital Sanctuary מוגנים בזכויות יוצרים.
              עם השלמת התשלום המלא, הלקוח מקבל רישיון שימוש מלא בתוצרים שנבנו עבורו.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">4. אחריות</h2>
            <p className="text-sm sm:text-base">
              The Digital Sanctuary אינו אחראי לנזקים עקיפים הנובעים מהשימוש באתר או בשירותים.
              האחריות המקסימלית שלנו מוגבלת לסכום ששולם עבור השירות הספציפי.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">5. ביטול ושינויים</h2>
            <p className="text-sm sm:text-base">
              תנאי ביטול ושינויים לכל פרויקט יפורטו בהסכם הפרויקט. פנייה דרך טופס הקשר
              אינה מהווה התחייבות חוזית.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">6. דין ושיפוט</h2>
            <p className="text-sm sm:text-base">
              תנאים אלו כפופים לחוק הישראלי. כל מחלוקת תידון בבתי המשפט המוסמכים בישראל.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-sanctuary-brown font-normal">7. יצירת קשר</h2>
            <p className="text-sm sm:text-base">
              לשאלות לגבי תנאים אלו:{' '}
              <a href="mailto:krollkimdev@gmail.com" className="text-sanctuary-sage-dark underline underline-offset-2">
                krollkimdev@gmail.com
              </a>
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
