import { test, expect } from '@playwright/test';

const viewports = [
  { label: '320 phone', width: 320, height: 568 },
  { label: '360 phone', width: 360, height: 800 },
  { label: '390 phone', width: 390, height: 844 },
  { label: '412 phone', width: 412, height: 915 },
  { label: '768 tablet', width: 768, height: 1024 },
  { label: '844 landscape', width: 844, height: 390 },
  { label: '1440 desktop', width: 1440, height: 900 },
];

const routes = [
  { path: '/', heading: 'Dana Htet Aung' },
  { path: '/services/', heading: 'Services' },
  { path: '/portfolio/', heading: 'Portfolio' },
  { path: '/resume/', heading: 'Resume' },
];

test.describe('responsive route contract', () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route.path} has no overflow at ${viewport.label}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        expect(response?.ok(), `${route.path} should load directly`).toBeTruthy();
        await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();

        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
      });
    }
  }
});

test.describe('public actions', () => {
  test('home routes and contact destinations are correct', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dana-htetaung-1b55782b6/',
    );
    await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:danahtetaungbiz@gmail.com',
    );
    await expect(page.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services/');
    await expect(page.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/portfolio/');
    await expect(page.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume/');
  });

  test('services provides working call and email actions', async ({ page }) => {
    await page.goto('/services/');
    await expect(page.getByRole('link', { name: /Phone/ })).toHaveAttribute('href', 'tel:8352105599');
    await expect(page.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:danahtetaungbiz@gmail.com',
    );
  });

  test('portfolio presents the public project destination safely', async ({ page }) => {
    await page.goto('/portfolio/');
    await expect(page.getByText('Vanity PermitOps')).toBeVisible();
    const project = page.getByRole('link', { name: /PermitOps/ });
    await expect(project).toHaveAttribute('href', 'https://permitops.com');
    await expect(project).toHaveAttribute('target', '_blank');
    await expect(project).toHaveAttribute('rel', /noopener/);
  });

  test('resume exposes view and download actions', async ({ page }) => {
    await page.goto('/resume/');
    await expect(page.getByRole('link', { name: 'View PDF' })).toHaveAttribute('href', '/assets/resume.pdf');
    const download = page.getByRole('link', { name: 'Download PDF' });
    await expect(download).toHaveAttribute('href', '/assets/resume.pdf');
    await expect(download).toHaveAttribute('download', '');
  });
});

test('every primary action has a 44 by 44 pixel target', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });

  for (const route of routes) {
    await page.goto(route.path);
    const actions = page.locator('[data-primary-action]');
    const count = await actions.count();
    expect(count, `${route.path} must expose primary actions`).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const action = actions.nth(index);
      const box = await action.boundingBox();
      expect(box, `${route.path} action ${index + 1} must be visible`).not.toBeNull();
      expect(box.width, `${route.path} action ${index + 1} width`).toBeGreaterThanOrEqual(44);
      expect(box.height, `${route.path} action ${index + 1} height`).toBeGreaterThanOrEqual(44);
    }
  }
});

test('route controls expose visible keyboard focus', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    let routeControlFocused = false;

    for (let attempt = 0; attempt < 12; attempt += 1) {
      await page.keyboard.press('Tab');
      routeControlFocused = await page.evaluate(() => document.activeElement?.matches('[data-route-control]'));
      if (routeControlFocused) break;
    }

    expect(routeControlFocused, `${route.path} should reach a route control by keyboard`).toBeTruthy();
    const focusStyle = await page.evaluate(() => {
      const styles = getComputedStyle(document.activeElement);
      return { outlineStyle: styles.outlineStyle, outlineWidth: styles.outlineWidth, boxShadow: styles.boxShadow };
    });
    expect(
      focusStyle.outlineStyle !== 'none' && focusStyle.outlineWidth !== '0px'
        || focusStyle.boxShadow !== 'none',
      `${route.path} route focus should be visible`,
    ).toBeTruthy();
  }
});

test('reduced motion produces a still wave', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-wave-state]')).toHaveAttribute('data-wave-state', 'reduced');
});

test('mobile resume is readable without an inline PDF viewer', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/resume/');

  for (const section of ['Skills', 'Experience', 'Education', 'Projects']) {
    await expect(page.getByRole('heading', { name: section })).toBeVisible();
  }
  await expect(page.locator('[data-resume-preview]')).toBeHidden();

  const essentialSizes = await page.locator('[data-essential]').evaluateAll((elements) =>
    elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
  );
  expect(essentialSizes.length).toBeGreaterThan(0);
  expect(Math.min(...essentialSizes)).toBeGreaterThanOrEqual(16);
});

test('desktop resume keeps the optional inline preview', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/resume/');
  await expect(page.locator('[data-resume-preview]')).toBeVisible();
});

test('essential content remains when scripting is unavailable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Dana Htet Aung' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Services' })).toBeVisible();
  await context.close();
});

test('routes tolerate 200 percent text sizing without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });

  for (const route of routes) {
    const response = await page.goto(route.path);
    expect(response?.ok(), `${route.path} should load before zoom validation`).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth, `${route.path} overflowed at 200 percent text`).toBe(dimensions.clientWidth);
  }
});
