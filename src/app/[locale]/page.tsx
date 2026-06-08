import {CalendarDays, Phone} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Button} from '@/components/ui/button';
import {type LocaleParams} from './layout';

export default async function HomePage({params}: Readonly<{params: Promise<LocaleParams>}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <main className="min-h-screen">
      <section className="container grid min-h-screen content-center gap-8 py-16">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {t('eyebrow')}
          </p>
          <h1 className="text-5xl font-bold leading-tight text-foreground md:text-7xl">
            {t('title')}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#booking">
                <CalendarDays aria-hidden="true" className="h-5 w-5" />
                {t('primaryCta')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:+15145550168">
                <Phone aria-hidden="true" className="h-5 w-5" />
                {t('secondaryCta')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
