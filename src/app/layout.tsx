import type { Metadata } from 'next';
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank-ruhl',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-heebo',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'The Digital Sanctuary | פתרונות דיגיטליים למטפלים',
  description:
    'מרחב דיגיטלי שקט ובטוח למטפלים ומטופלים. פתרונות טכנולוגיים מותאמים לפרקטיקות טיפוליות שמאפשרים לכם להתמקד בקשר האנושי.',
  keywords:
    'מטפלים, פסיכולוגיה, אתר למטפל, קביעת תורים, בריאות הנפש, דיגיטל, טיפול נפשי',
  openGraph: {
    title: 'The Digital Sanctuary | פתרונות דיגיטליים למטפלים',
    description: 'מרחב דיגיטלי שקט ובטוח — כי כל מטופל ראוי לחוויה מרגיעה.',
    type: 'website',
    locale: 'he_IL',
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhl.variable} ${heebo.variable}`}
    >
      <body className="font-sans bg-sanctuary-off-white text-sanctuary-brown antialiased">
        {children}
      </body>
    </html>
  );
}
