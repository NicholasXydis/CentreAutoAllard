export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr';

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
