import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    exclude: ['e2e/**', 'node_modules/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: [
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/(root)/page.tsx',
        'src/app/[locale]/error.tsx',
        'src/app/[locale]/not-found.tsx',
        'src/components/google-analytics.tsx',
        'src/components/hero.tsx',
        'src/components/lang-toggle.tsx',
        'src/components/motion-primitives.tsx',
        'src/components/navbar.tsx',
        'src/components/site-shell.tsx',
        'src/components/ui/button.tsx',
        'src/i18n/routing.ts',
        'src/lib/seo.ts',
        'src/lib/utils.ts'
      ],
      thresholds: {
        branches: 85,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  }
});
