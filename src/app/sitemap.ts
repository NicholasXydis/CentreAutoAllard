import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/routing';
import {site} from '@/config/site';
import {getLocalizedPath} from '@/lib/seo';

const paths = ['', '/services', '/contact'] as const;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${getLocalizedPath(locale, path)}`,
      alternates: {
        languages: {
          'en-CA': `${site.url}${getLocalizedPath('en', path)}`,
          'fr-CA': `${site.url}${getLocalizedPath('fr', path)}`,
          'x-default': `${site.url}${getLocalizedPath('fr', path)}`
        }
      }
    }))
  );
}
