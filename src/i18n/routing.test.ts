import {describe, expect, it} from 'vitest';
import {defaultLocale, isLocale, locales} from './routing';

describe('locale routing', () => {
  it('defines French as the default and supports both site locales', () => {
    expect(defaultLocale).toBe('fr');
    expect(locales).toEqual(['fr', 'en']);
  });

  it.each(['fr', 'en'])('accepts the supported locale %s', (locale) => {
    expect(isLocale(locale)).toBe(true);
  });

  it.each(['', 'FR', 'es', 'fr-CA'])('rejects unsupported locale %s', (locale) => {
    expect(isLocale(locale)).toBe(false);
  });
});
