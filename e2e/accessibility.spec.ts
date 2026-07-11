import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

test.use({contextOptions: {reducedMotion: 'reduce'}});

const pages = [
  '/fr/',
  '/en/',
  '/fr/services/',
  '/en/services/',
  '/fr/contact/',
  '/en/contact/',
  '/missing-route/'
];

for (const path of pages) {
  test(`${path} has no detectable accessibility violations`, async ({page}) => {
    await page.goto(path);
    await page.getByRole('heading', {level: 1}).waitFor();
    await page.waitForFunction(() =>
      document.getAnimations().every((animation) => animation.playState !== 'running')
    );

    const {violations} = await new AxeBuilder({page})
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    expect(
      violations.map(({id, nodes}) => ({id, targets: nodes.map((node) => node.target)}))
    ).toEqual([]);
  });
}

test('the navigation sits outside the main landmark so the skip link works', async ({page}) => {
  await page.goto('/fr/');

  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.locator('main#main-content nav')).toHaveCount(0);
  await expect(page.locator('main#main-content header')).toHaveCount(0);
});

test('the skip link moves focus to the main landmark', async ({page}) => {
  await page.goto('/fr/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', {name: 'Aller au contenu principal'});
  await expect(skipLink).toBeFocused();

  await skipLink.press('Enter');
  await expect(page.locator('main#main-content')).toBeFocused();
});
