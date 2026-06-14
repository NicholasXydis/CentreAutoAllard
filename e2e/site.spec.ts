import {expect, test} from '@playwright/test';

const localizedPages = [
  {
    locale: 'fr',
    homeHeading: "Centre D'Auto Allard",
    servicesHeading: 'Nos services',
    contactHeading: 'Viens nous voir'
  },
  {
    locale: 'en',
    homeHeading: "Centre D'Auto Allard",
    servicesHeading: 'Our services',
    contactHeading: 'Call or visit us'
  }
] as const;

for (const pageData of localizedPages) {
  test.describe(`${pageData.locale} routes`, () => {
    test('home exposes primary actions, metadata, and analytics', async ({page}) => {
      const analyticsRequest = page.waitForRequest(
        (request) =>
          request.url().includes('googletagmanager.com/gtag/js') &&
          request.url().includes('G-PLAYWRIGHT')
      );
      await page.goto(`/${pageData.locale}/`);

      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        pageData.locale === 'fr' ? 'fr-CA' : 'en-CA'
      );
      await expect(page.getByRole('heading', {level: 1})).toHaveText(pageData.homeHeading);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://centredautoallard.ca/${pageData.locale}/`
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://centredautoallard.ca/shop-front.webp'
      );
      await expect(page.getByRole('link', {name: '(514) 768-4455'})).toHaveAttribute(
        'href',
        'tel:+15147684455'
      );
      await analyticsRequest;
    });

    test('services lists each category and navigates to contact', async ({page}) => {
      await page.goto(`/${pageData.locale}/services/`);

      await expect(page.getByRole('heading', {level: 1})).toHaveText(pageData.servicesHeading);
      await expect(page.locator('article')).toHaveCount(3);
      await expect(page.locator('nav a[aria-current="page"]')).toHaveAttribute(
        'href',
        `/${pageData.locale}/services/`
      );

      await page
        .getByRole('link', {name: pageData.locale === 'fr' ? 'Nous joindre' : 'Contact'})
        .last()
        .click();
      await expect(page).toHaveURL(new RegExp(`/${pageData.locale}/contact/?$`));
    });

    test('contact exposes address, opening hours, directions, and phone', async ({page}) => {
      await page.goto(`/${pageData.locale}/contact/`);

      await expect(page.getByRole('heading', {level: 1})).toHaveText(pageData.contactHeading);
      await expect(page.getByText(/2350.*Allard/)).toBeVisible();
      await expect(page.getByRole('link', {name: '(514) 768-4455'})).toHaveAttribute(
        'href',
        'tel:+15147684455'
      );
      const directions = page.getByRole('link', {
        name: pageData.locale === 'fr' ? 'Directions' : 'Directions'
      });
      await expect(directions).toHaveAttribute('href', /^https:\/\/maps\.google\.com/);
    });
  });
}

test('root redirects to the default French locale', async ({request}) => {
  const response = await request.get('/', {maxRedirects: 0});
  expect(response.status()).toBe(301);
  expect(response.headers().location).toBe('/fr/');
});

test('language toggle preserves the current page', async ({page}) => {
  await page.goto('/fr/services/');
  await page.getByRole('button', {name: "Passer à l'anglais"}).click();

  await expect(page).toHaveURL(/\/en\/services\/?$/);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Our services');
});

test('unknown routes show the bilingual global 404 with recovery links', async ({page}) => {
  const response = await page.goto('/missing-route/');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', {name: '404'})).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.getByRole('link', {name: 'Français'})).toHaveAttribute('href', '/fr/');
  await expect(page.getByRole('link', {name: 'English'})).toHaveAttribute('href', '/en/');
});
