import { afterAll, beforeAll, describe, test } from 'vitest';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

describe('basic', async () => {
  let server: PreviewServer;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    server = await preview({ preview: { port: 3000 } });
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  test('Button should be available', async () => {
    await page.goto('http://localhost:3000');

    const title = await page.textContent('h1');
    expect(title).toBe('Welcome to Mr. Calculator');

    const buttonOne = await page.locator('text=1');
    const buttonTwo = await page.locator('text=2');
    const buttonPlus = await page.locator('text=+');
    const buttonEquals = await page.locator('text==');
    const screen = await page.locator('calc-screen');

    await expect(buttonOne).toBeDefined();
    await expect(buttonTwo).toBeDefined();
    await expect(buttonPlus).toBeDefined();
    await expect(buttonEquals).toBeDefined();
    await expect(screen).toBeDefined();
  }, 60_000);

  test('Calculator should work', async () => {
    await page.goto('http://localhost:3000');

    const buttonOne = await page.locator('text=1');
    const buttonTwo = await page.locator('text=2');
    const buttonPlus = await page.locator('text=+');
    const buttonEquals = await page.locator('text==');
    const screen = await page.locator('#calc-screen');

    await buttonOne.click();
    await buttonPlus.click();
    await buttonTwo.click();
    await buttonEquals.click();
    await expect(screen).toHaveText('3');
  });
});
