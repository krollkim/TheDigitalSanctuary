import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Features from '@/components/Features';
import CaseStudy from '@/components/CaseStudy';
import Process from '@/components/Process';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

/**
 * The Digital Sanctuary - Landing Page
 *
 * Section order:
 *  1. Navbar       - Sticky navigation, minimal
 *  2. Hero         - Safety & peace of mind, full viewport
 *  3. Philosophy   - Patient-first design psychology
 *  4. Features     - Bento grid of support tools
 *  5. CaseStudy    - Problem → Solution → Result
 *  6. ContactForm  - Soft, non-intimidating CTA
 *  7. Footer       - Brand, links, copyright
 */
export default function Page() {
  return (
    <main>
      {/*
        Netlify Forms build-time detection.
        This plain HTML form (no JS, no client component) is included in the
        static HTML that Next.js writes to .next/server/app/ at build time.
        Netlify's post-processor scans that directory and registers the "contact"
        form inbox. The actual submission is handled by ContactForm's fetch().
      */}
      <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="text"  name="name" />
        <input type="email" name="email" />
        <input type="text"  name="role" />
        <textarea           name="message"></textarea>
        <input type="text"  name="bot-field" />
      </form>

      <Navbar />
      <Hero />
      <Philosophy />
      <Features />
      <CaseStudy />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
