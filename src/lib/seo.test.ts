import {describe, expect, it} from 'vitest';
import {site} from '@/config/site';
import {createLocalizedMetadata, getHtmlLang, getLocalizedPath} from './seo';

describe('SEO helpers', () => {
  it('maps locales to Canadian HTML language tags', () => {
    expect(getHtmlLang('fr')).toBe('fr-CA');
    expect(getHtmlLang('en')).toBe('en-CA');
  });

  it('creates normalized localized paths', () => {
    expect(getLocalizedPath('fr')).toBe('/fr/');
    expect(getLocalizedPath('en', '/services')).toBe('/en/services/');
  });

  it.each([
    ['fr', 'fr_CA', 'en_CA'],
    ['en', 'en_CA', 'fr_CA']
  ] as const)('creates complete %s metadata', (locale, openGraphLocale, alternateLocale) => {
    const metadata = createLocalizedMetadata({
      locale,
      path: '/contact',
      title: 'Page title',
      description: 'Page description'
    });

    expect(metadata.metadataBase).toEqual(new URL(site.url));
    expect(metadata.alternates).toEqual({
      canonical: `/${locale}/contact/`,
      languages: {
        'en-CA': '/en/contact/',
        'fr-CA': '/fr/contact/',
        'x-default': '/fr/contact/'
      }
    });
    expect(metadata.openGraph).toMatchObject({
      url: `/${locale}/contact/`,
      locale: openGraphLocale,
      alternateLocale,
      images: [{url: '/shop-front.webp', width: 1022, height: 1538}]
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      images: ['/shop-front.webp']
    });
  });
});
