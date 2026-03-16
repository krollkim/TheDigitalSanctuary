import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Features from '@/components/Features';
import CaseStudy from '@/components/CaseStudy';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

/**
 * The Digital Sanctuary — Landing Page
 *
 * Section order:
 *  1. Navbar       — Sticky navigation, minimal
 *  2. Hero         — Safety & peace of mind, full viewport
 *  3. Philosophy   — Patient-first design psychology
 *  4. Features     — Bento grid of support tools
 *  5. CaseStudy    — Problem → Solution → Result
 *  6. ContactForm  — Soft, non-intimidating CTA
 *  7. Footer       — Brand, links, copyright
 */
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Philosophy />
      <Features />
      <CaseStudy />
      <ContactForm />
      <Footer />
    </main>
  );
}
