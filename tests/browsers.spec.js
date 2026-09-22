const { test, expect } = require('@playwright/test');
const {  chromium } = require('playwright');

test.describe('Test group', () => {
  test('browsers', async ({ }) => {
  const browser = await chromium.launch();
  //   const page = await browser.newPage();
  
  // Create a new incognito browser context
  const context = await browser.newContext();
  // Create a new page inside context.
  const page = await context.newPage()
  await page.goto('https://example.com');
  await page.pause();
  await browser.close();
  });
});
