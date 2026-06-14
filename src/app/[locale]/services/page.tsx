import type {Metadata} from 'next';
import {ArrowLeft, Car, CircleDot, Droplets, Phone, Wrench} from 'lucide-react';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';
import {
  MotionPageCard,
  MotionPressable,
  MotionStaggerGroup,
  MotionStaggerItem
} from '@/components/motion-primitives';
import {Navbar} from '@/components/navbar';
import {SiteShell} from '@/components/site-shell';
import {Button} from '@/components/ui/button';
import {site} from '@/config/site';
import {createLocalizedMetadata} from '@/lib/seo';
import {type LocaleParams} from '../layout';

const sections = [
  {key: 'mechanics', icon: Wrench},
  {key: 'carwash', icon: Droplets},
  {key: 'tires', icon: CircleDot}
] as const;

export async function generateMetadata({
  params
}: Readonly<{params: Promise<LocaleParams>}>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'servicePage'});

  return createLocalizedMetadata({
    locale,
    path: '/services',
    title: t('metadataTitle'),
    description: t('metadataDescription')
  });
}

export default async function ServicesPage({params}: Readonly<{params: Promise<LocaleParams>}>) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('servicePage');
  const nav = await getTranslations('nav');

  return (
    <SiteShell>
      <Navbar />
      <section className="wide-page min-h-dvh px-4 pb-10 pt-[clamp(12rem,31dvh,19rem)] sm:px-6 sm:pb-16 sm:pt-32 [@media_(min-width:768px)_and_(max-width:1023px)_and_(orientation:portrait)]:pt-[clamp(17rem,28dvh,21rem)] [@media_(min-width:820px)_and_(min-height:1100px)_and_(orientation:portrait)]:pt-[30dvh]">
        <div className="wide-services-container mx-auto w-full max-w-[390px] sm:max-w-[640px] md:max-w-[960px] lg:max-w-none">
          <MotionPageCard>
            <MotionPressable className="w-fit [&>*]:w-auto">
              <Link href={`/${locale}`} className="page-back">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {nav('back')}
              </Link>
            </MotionPressable>

            <MotionStaggerItem className="mt-5 text-center sm:mt-6">
              <h1 className="page-heading">{t('title')}</h1>
              <div className="page-divider" />
              <p className="mx-auto mt-4 max-w-[560px] text-[14px] leading-6 text-white/76 sm:text-[15px]">
                {t('subtitle')}
              </p>
            </MotionStaggerItem>

            <MotionStaggerGroup className="mt-7 grid gap-4 [@media_(orientation:landscape)_and_(max-height:500px)]:grid-cols-2 md:grid-cols-3">
              {sections.map(({key, icon: Icon}) => {
                const items = t.raw(`${key}.items`) as string[];

                return (
                  <MotionStaggerItem
                    key={key}
                    interactive
                    className={
                      'h-full ' +
                      (key === 'tires'
                        ? '[@media_(orientation:landscape)_and_(max-height:500px)]:col-span-2 md:col-span-1'
                        : '')
                    }
                  >
                    <article
                      id={key}
                      className="h-full scroll-mt-28 rounded-[14px] border border-white/14 bg-white/[0.055] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className="h-8 w-8 text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.9)]"
                          aria-hidden="true"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <h2 className="text-[22px] font-black text-white">{t(`${key}.title`)}</h2>
                      </div>
                      <ul
                        className={
                          'mt-4 grid gap-2 text-[14px] font-semibold leading-5 text-white/74 ' +
                          (key === 'tires'
                            ? '[@media_(orientation:landscape)_and_(max-height:500px)]:grid-cols-2 md:grid-cols-1'
                            : '')
                        }
                      >
                        {items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Car
                              className="h-3.5 w-3.5 shrink-0 text-blue-400"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </MotionStaggerItem>
                );
              })}
            </MotionStaggerGroup>

            <MotionStaggerGroup className="mt-6 grid gap-3 sm:grid-cols-2">
              <MotionPressable>
                <Button
                  asChild
                  size="lg"
                  className="wide-action h-[52px] rounded-[12px] bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-blue-500"
                >
                  <a href={`tel:${site.phone}`}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    {site.phoneDisplay}
                  </a>
                </Button>
              </MotionPressable>
              <MotionPressable>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="wide-action h-[52px] rounded-[12px] border-white/24 bg-white/[0.06] text-white hover:bg-white/[0.1] hover:text-white"
                >
                  <Link href={`/${locale}/contact`}>{nav('contact')}</Link>
                </Button>
              </MotionPressable>
            </MotionStaggerGroup>
          </MotionPageCard>
        </div>
      </section>
    </SiteShell>
  );
}
