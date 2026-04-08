const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the calculator application
    await page.goto('https://example.com/calculator');

    // Take a screenshot of the calculator
    await page.screenshot({ path: 'calculator-screenshot.png' });

    console.log('Screenshot taken!');

    await browser.close();
})();
