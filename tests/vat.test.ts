import { test } from '@playwright/test';
import { VatCalcPage } from '@/utils/pages/vat-calc';

test.describe('VAT Calculator', () => {
  test('Should calculate correct GROSS for Germany with 07% VAT and NET=100', async ({ page }) => {
    await VatCalcPage.open(page);
    await VatCalcPage.selectCountry(page, 'Germany');
    await VatCalcPage.selectVAT7(page);
    await VatCalcPage.selectPriceWithoutVat(page);
    await VatCalcPage.enterNetPrice(page, '100');
    await VatCalcPage.verifyGrossValue(page, '107.00');
  });

  test('Should calculate correct NET for Germany with 07% VAT and GROSS=214', async ({ page }) => {
    await VatCalcPage.open(page);
    await VatCalcPage.selectCountry(page, 'Germany');
    await VatCalcPage.selectVAT7(page);
    await VatCalcPage.selectPriceWithVat(page);
    await VatCalcPage.enterGrossPrice(page, '214');
    await VatCalcPage.verifyNetValue(page, '200.00');
  });
});
