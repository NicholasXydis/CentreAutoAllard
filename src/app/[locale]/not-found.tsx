import Link from 'next/link';
import {getLocale, getTranslations} from 'next-intl/server';
import {SiteShell} from '@/components/site-shell';
import {Button} from '@/components/ui/button';

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations('notFound');

  return (
    <SiteShell>
      <section className="wide-page flex min-h-dvh items-center px-4 py-10 sm:px-6">
        <div className="wide-standard-container mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-none">
          <div className="page-card text-center">
            <h1 className="page-heading">404</h1>
            <div className="page-divider" />
            <p className="mx-auto mt-5 max-w-[420px] text-[14px] leading-6 text-white/76 sm:text-[15px]">
              {t('message')}
            </p>
            <Button
              asChild
              size="lg"
              className="wide-action mt-6 h-[52px] w-full rounded-[12px] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-500"
            >
              <Link href={`/${locale}`}>{t('back')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
