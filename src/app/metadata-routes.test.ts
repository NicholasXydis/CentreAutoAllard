import {describe, expect, it} from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('metadata routes', () => {
  it('allows crawling and publishes the sitemap URL', () => {
    expect(robots()).toEqual({
      rules: {userAgent: '*', allow: '/'},
      sitemap: 'https://centreautoallard.ca/sitemap.xml'
    });
  });

  it('publishes every localized route with language alternates', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(6);
    expect(entries.map(({url}) => url)).toEqual([
      'https://centreautoallard.ca/fr/',
      'https://centreautoallard.ca/en/',
      'https://centreautoallard.ca/fr/services/',
      'https://centreautoallard.ca/en/services/',
      'https://centreautoallard.ca/fr/contact/',
      'https://centreautoallard.ca/en/contact/'
    ]);

    for (const entry of entries) {
      expect(entry.alternates?.languages).toMatchObject({
        'en-CA': expect.stringContaining('/en/'),
        'fr-CA': expect.stringContaining('/fr/'),
        'x-default': expect.stringContaining('/fr/')
      });
    }
  });
});
