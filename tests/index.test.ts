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

  test('Button should be clickable', async () => {
    await page.goto('http://localhost:3000');

    const title = await page.textContent('h1');
    expect(title).toBe('Welcome to Mr. Calculator');

    const button = page.locator('#counter');
    await expect(button).toBeDefined();

    await expect(button).toHaveText('count is 0');

    await button.click();
    await expect(button).toHaveText('count is 1');

    await button.click();
    await expect(button).toHaveText('count is 2');
  }, 60_000);
});
