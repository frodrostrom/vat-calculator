import { Page } from '@playwright/test';

export async function openUrl(page: Page, url: string) {
  await page.goto(url);
}
