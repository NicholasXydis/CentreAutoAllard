import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['html', {open: 'never'}], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']}
    },
    {
      name: 'mobile-chromium',
      use: {...devices['Pixel 7']}
    }
  ],
  webServer: {
    command: 'npm run build && node e2e/static-server.mjs',
    url: 'http://127.0.0.1:3100/fr/',
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-PLAYWRIGHT'
    }
  }
});
