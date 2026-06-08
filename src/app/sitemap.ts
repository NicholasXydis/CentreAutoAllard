import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/routing';

const baseUrl = 'https://centreautoallard.ca';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date()
  }));
}
