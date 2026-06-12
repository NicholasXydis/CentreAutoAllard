import '../globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {GoogleAnalytics} from '@/components/google-analytics';
import {site} from '@/config/site';
import {isLocale, locales, type Locale} from '@/i18n/routing';
import {createLocalizedMetadata, getHtmlLang} from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{locale: string}>;
}>): Promise<Metadata> {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'metadata'});

  return createLocalizedMetadata({
    locale,
    title: t('title'),
    description: t('description')
  });
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const metadata = await getTranslations({locale, namespace: 'metadata'});
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${site.url}/#business`,
    name: site.name,
    description: metadata('description'),
    url: `${site.url}/${locale}/`,
    image: `${site.url}${site.socialImage}`,
    telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes
    }
  };

  return (
    <html lang={getHtmlLang(locale)} suppressHydrationWarning className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, '\\u003c')
          }}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

export type LocaleParams = {
  locale: Locale;
};
