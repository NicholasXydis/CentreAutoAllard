'use client';

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {SiteShell} from '@/components/site-shell';
import {Button} from '@/components/ui/button';

export default function ErrorPage({reset}: Readonly<{reset: () => void}>) {
  const locale = useLocale();
  const t = useTranslations('errorPage');

  return (
    <SiteShell>
      <section className="wide-page flex min-h-dvh items-center px-4 py-10 sm:px-6">
        <div className="wide-standard-container mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-none">
          <div className="page-card text-center">
            <h1 className="page-heading">{t('title')}</h1>
            <div className="page-divider" />
            <p className="mx-auto mt-5 max-w-[420px] text-[14px] leading-6 text-white/76 sm:text-[15px]">
              {t('message')}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                size="lg"
                onClick={reset}
                className="wide-action h-[52px] rounded-[12px] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-500"
              >
                {t('retry')}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="wide-action h-[52px] rounded-[12px] border-white/24 bg-white/[0.06] text-white hover:bg-white/[0.1] hover:text-white"
              >
                <Link href={`/${locale}`}>{t('home')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
