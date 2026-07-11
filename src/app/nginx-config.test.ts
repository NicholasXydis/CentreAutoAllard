import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {describe, expect, it} from 'vitest';

const nginxConfig = readFileSync(join(process.cwd(), 'nginx.conf'), 'utf8');

describe('nginx redirects', () => {
  it('keeps the root locale redirect relative behind the public reverse proxy', () => {
    expect(nginxConfig).toContain('absolute_redirect off;');
    expect(nginxConfig).toMatch(/location\s*=\s*\/\s*\{\s*return\s+301\s+\/fr\/;\s*\}/);
  });

  it('does not define any other redirect responses', () => {
    expect(nginxConfig.match(/\breturn\s+30[1278]\b/g)).toHaveLength(1);
  });
});

describe('nginx error pages', () => {
  it('serves the exported bilingual 404 page instead of the nginx default', () => {
    expect(nginxConfig).toContain('error_page 404 /404.html;');
  });
});
