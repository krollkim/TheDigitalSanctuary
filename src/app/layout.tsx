import type { Metadata } from 'next';
import { Noto_Serif_Hebrew, Assistant } from 'next/font/google';
import './globals.css';
import AccessibilityWidget from '@/components/AccessibilityWidget';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const notoSerifHebrew = Noto_Serif_Hebrew({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-assistant',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://thedigitalsanctuary.netlify.app'),
  title: 'The Digital Sanctuary | פתרונות דיגיטליים למטפלים',
  description:
    'מרחב דיגיטלי שקט ובטוח למטפלים ומטופלים. פתרונות טכנולוגיים מותאמים לפרקטיקות טיפוליות שמאפשרים לכם להתמקד בקשר האנושי.',
  keywords:
    'בניית אתר לפסיכולוג, אתר למטפל, דיגיטל לפרקטיקה טיפולית, עיצוב אתר בריאות הנפש, אתר לפסיכיאטר, נוכחות דיגיטלית מטפלים, The Digital Sanctuary',
  verification: {
    google: 'google725ec242f2808f6f',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://thedigitalsanctuary.netlify.app',
  },
  openGraph: {
    title: 'The Digital Sanctuary | פתרונות דיגיטליים למטפלים',
    description: 'מרחב דיגיטלי שקט ובטוח - כי כל מטופל ראוי לחוויה מרגיעה.',
    type: 'website',
    locale: 'he_IL',
    url: 'https://thedigitalsanctuary.netlify.app',
    siteName: 'The Digital Sanctuary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Digital Sanctuary | פתרונות דיגיטליים למטפלים',
    description: 'מרחב דיגיטלי שקט ובטוח - כי כל מטופל ראוי לחוויה מרגיעה.',
  },
  // ── Favicons & app icons ───────────────────────────────────────────────────
  // Drop the matching files into /public/favicons/ and they resolve automatically.
  // favicon.svg is the live placeholder — replace with your final brand mark.
  icons: {
    icon: [
      { url: '/favicons/favicon-32x32.png',  sizes: '32x32',  type: 'image/png' },
      { url: '/favicons/favicon-16x16.png',  sizes: '16x16',  type: 'image/png' },
    ],
    shortcut: '/favicons/favicon.ico',
    apple:    { url: '/favicons/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'mask-icon', url: '/favicons/safari-pinned-tab.svg', color: '#3D3530' },
    ],
  },
  manifest: '/favicons/site.webmanifest',
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'The Digital Sanctuary',
  alternateName: 'The Digital Sanctuary by Smiley Solution',
  description:
    'פתרונות דיגיטליים לפרקטיקות טיפוליות — עיצוב אתרים, מערכות קביעת תורים, וליווי דיגיטלי מלא למטפלים.',
  url: 'https://thedigitalsanctuary.netlify.app',
  telephone: '+972-52-589-0252',
  email: 'krollkimdev@gmail.com',
  inLanguage: 'he',
  areaServed: {
    '@type': 'Country',
    name: 'Israel',
  },
  serviceType: [
    'Web Design for Therapists',
    'Digital Presence for Mental Health Professionals',
    'Appointment Booking Systems',
  ],
  provider: {
    '@type': 'Organization',
    name: 'Smiley Solution',
  },
  offers: {
    '@type': 'Offer',
    description: 'עיצוב ופיתוח אתרים מותאמים לפרקטיקות טיפוליות',
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
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
      className={`${notoSerifHebrew.variable} ${assistant.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-sanctuary-off-white text-sanctuary-brown antialiased">
        {children}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
