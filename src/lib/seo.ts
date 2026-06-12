import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';
import {site} from '@/config/site';

const localeMetadata = {
  en: {
    htmlLang: 'en-CA',
    openGraphLocale: 'en_CA',
    alternateOpenGraphLocale: 'fr_CA'
  },
  fr: {
    htmlLang: 'fr-CA',
    openGraphLocale: 'fr_CA',
    alternateOpenGraphLocale: 'en_CA'
  }
} as const;

export function getHtmlLang(locale: Locale) {
  return localeMetadata[locale].htmlLang;
}

export function getLocalizedPath(locale: Locale, path = '') {
  return `/${locale}${path}/`;
}

export function createLocalizedMetadata({
  locale,
  path = '',
  title,
  description
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const localizedPath = getLocalizedPath(locale, path);
  const englishPath = getLocalizedPath('en', path);
  const frenchPath = getLocalizedPath('fr', path);
  const {openGraphLocale, alternateOpenGraphLocale} = localeMetadata[locale];

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': englishPath,
        'fr-CA': frenchPath,
        'x-default': frenchPath
      }
    },
    openGraph: {
      type: 'website',
      url: localizedPath,
      title,
      description,
      siteName: site.name,
      locale: openGraphLocale,
      alternateLocale: alternateOpenGraphLocale,
      images: [
        {
          url: site.socialImage,
          width: 1022,
          height: 1538,
          alt: site.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [site.socialImage]
    }
  };
}
