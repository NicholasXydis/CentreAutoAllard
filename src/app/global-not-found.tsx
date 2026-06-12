import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import Link from 'next/link';
import {SiteShell} from '@/components/site-shell';
import {Button} from '@/components/ui/button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "404 | Centre D'Auto Allard",
  description: 'Page introuvable. Page not found.'
};

export default function GlobalNotFound() {
  return (
    <html lang="fr-CA" suppressHydrationWarning className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu / Skip to content
        </a>
        <SiteShell>
          <section className="wide-page flex min-h-dvh items-center px-4 py-10 sm:px-6">
            <div className="wide-standard-container mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-none">
              <div className="page-card text-center">
                <h1 className="page-heading">404</h1>
                <div className="page-divider" />
                <p className="mx-auto mt-5 max-w-[420px] text-[14px] leading-6 text-white/76 sm:text-[15px]">
                  Cette page n&apos;existe pas ou a été déplacée.
                </p>
                <p className="mx-auto mt-2 max-w-[420px] text-[14px] leading-6 text-white/76 sm:text-[15px]">
                  This page does not exist or has moved.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button
                    asChild
                    size="lg"
                    className="wide-action h-[52px] rounded-[12px] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-500"
                  >
                    <Link href="/fr/">Français</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="wide-action h-[52px] rounded-[12px] border-white/24 bg-white/[0.06] text-white hover:bg-white/[0.1] hover:text-white"
                  >
                    <Link href="/en/">English</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </SiteShell>
      </body>
    </html>
  );
}
