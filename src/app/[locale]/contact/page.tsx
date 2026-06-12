import type {Metadata} from 'next';
import {ArrowLeft, Clock, MapPin, Navigation, Phone} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {Navbar} from '@/components/navbar';
import {SiteShell} from '@/components/site-shell';
import {Button} from '@/components/ui/button';
import {site} from '@/config/site';
import {createLocalizedMetadata} from '@/lib/seo';
import {type LocaleParams} from '../layout';

export async function generateMetadata({
  params
}: Readonly<{params: Promise<LocaleParams>}>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contactPage'});

  return createLocalizedMetadata({
    locale,
    path: '/contact',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function ContactPage({params}: Readonly<{params: Promise<LocaleParams>}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contactPage');
  const nav = await getTranslations('nav');

  return (
    <SiteShell>
      <Navbar />
      <section className="wide-page flex min-h-dvh items-start px-4 pb-10 pt-[clamp(12rem,31dvh,19rem)] sm:px-6 sm:pb-12 sm:pt-32 [@media_(min-width:768px)_and_(max-width:1023px)_and_(orientation:portrait)]:pt-[clamp(17rem,28dvh,21rem)] [@media_(min-width:820px)_and_(min-height:1100px)_and_(orientation:portrait)]:pt-[30dvh]">
        <div className="wide-standard-container mx-auto w-full max-w-[390px] sm:max-w-[560px] lg:max-w-none">
          <div className="page-card">
            <Link href={`/${locale}`} className="page-back">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {nav('back')}
            </Link>

            <div className="mt-5 text-center sm:mt-6">
              <h1 className="page-heading">{t('title')}</h1>
              <div className="page-divider" />
            </div>

            <div className="mt-5 grid gap-3 sm:mt-7">
              <a
                href={site.googleMapsUrl}
                className="flex min-h-11 items-center gap-3 rounded-[14px] border border-white/14 bg-white/[0.055] px-4 py-3 text-[14px] leading-5 text-white/78 transition hover:bg-white/[0.09] hover:text-white"
              >
                <MapPin className="h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
                <span>{t('address')}</span>
              </a>

              <div className="rounded-[14px] border border-white/14 bg-white/[0.055] px-4 py-3 text-[14px] text-white/78">
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-blue-400" aria-hidden="true" />
                  <div className="w-full">
                    <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                      <span>{t('weekdays')}</span>
                      <span className="text-right">{t('weekdaysHours')}</span>
                    </div>
                    <div className="flex justify-between gap-3 pt-2">
                      <span>{t('weekend')}</span>
                      <span className="text-right">{t('weekendHours')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6">
              <Button
                asChild
                size="lg"
                className="wide-action h-[52px] rounded-[12px] px-3 text-[13px] text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-500 sm:text-[14px]"
              >
                <a href={`tel:${site.phone}`}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="wide-action h-[52px] rounded-[12px] border-white/24 bg-white/[0.06] px-3 text-[13px] text-white hover:bg-white/[0.1] hover:text-white sm:text-[14px]"
              >
                <a href={site.googleMapsUrl}>
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  {t('directions')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
