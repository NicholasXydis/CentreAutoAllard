import {describe, expect, it} from 'vitest';
import robots from './robots';
import sitemap from './sitemap';

describe('metadata routes', () => {
  it('allows crawling and publishes the sitemap URL', () => {
    expect(robots()).toEqual({
      rules: {userAgent: '*', allow: '/'},
      sitemap: 'https://centredautoallard.ca/sitemap.xml'
    });
  });

  it('publishes every localized route with language alternates', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(6);
    expect(entries.map(({url}) => url)).toEqual([
      'https://centredautoallard.ca/fr/',
      'https://centredautoallard.ca/en/',
      'https://centredautoallard.ca/fr/services/',
      'https://centredautoallard.ca/en/services/',
      'https://centredautoallard.ca/fr/contact/',
      'https://centredautoallard.ca/en/contact/'
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
