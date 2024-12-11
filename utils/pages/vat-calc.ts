import type { Page } from 'playwright';
import { expect } from '@playwright/test';
import { openUrl } from '../../utils/utils';
import { urls } from '../../utils/constants';

export class VatCalcPage {
  static readonly selectors = {
    cookieConsentButton: 'button.fc-button.fc-cta-consent.fc-primary-button',
    secondCookieConsentButton: 'a.cc-btn.cc-dismiss',
    countrySelect: 'select[name="Country"]',
    VAT7RadioLabel: 'label[for="VAT_7"]',
    priceWithoutVATRadio: 'label[for="F1"]',
    priceWithVATRadio: 'label[for="F3"]',
    netPriceInput: '#NetPrice',
    grossPriceInput: '#Price'
  };

  static readonly fnSelectors = {
    countryOption: (countryName: string) => `select[name="Country"] option:has-text("${countryName}")`,
  };

  static async open(page: Page) {
    await openUrl(page, urls.vatCalc);
    try {
    await page.waitForSelector(this.selectors.cookieConsentButton, { timeout: 10_000 });
    await page.click(this.selectors.cookieConsentButton);
  } catch {
          // Consent window did not appear, proceed
  }
    try {
      await page.waitForSelector(this.selectors.secondCookieConsentButton, { timeout: 10_000 });
      await page.click(this.selectors.secondCookieConsentButton);
    } catch {
      // Accept window did not appear, proceed
    }
    await page.waitForSelector(this.selectors.countrySelect, { timeout: 10_000 });
  }

  static async selectCountry(page: Page, countryName: string) {
    const option = page.locator(this.fnSelectors.countryOption(countryName));
    const count = await option.count();
    if (count === 0) {
      throw new Error(`Country "${countryName}" not found`);
    }
    const value = await option.first().getAttribute('value');
    if (value) {
      await page.selectOption(this.selectors.countrySelect, value);
    } else {
      throw new Error(`Country "${countryName}" does not have a value attribute`);
    }
  }


  static async selectVAT7(page: Page) {
    await page.click(this.selectors.VAT7RadioLabel);
  }

  static async selectPriceWithoutVat(page: Page) {
    await page.click(this.selectors.priceWithoutVATRadio);
  }

  static async selectPriceWithVat(page: Page) {
    await page.click(this.selectors.priceWithVATRadio);
  }

  static async enterNetPrice(page: Page, value: string) {
    await page.click(this.selectors.netPriceInput);
    await page.keyboard.type(value);
  }

  static async enterGrossPrice(page: Page, value: string) {
    await page.click(this.selectors.grossPriceInput);
    await page.keyboard.type(value);
  }

  static async verifyGrossValue(page: Page, expectedValue: string) {
    const locator = page.locator(this.selectors.grossPriceInput);
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toHaveValue(expectedValue);
  }
  
  static async verifyNetValue(page: Page, expectedValue: string) {
    const locator = page.locator(this.selectors.netPriceInput);
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toHaveValue(expectedValue);
  }
}