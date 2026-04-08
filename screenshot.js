'use strict';

const http = require('http-server');
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    // Start the HTTP server
    const server = http.createServer({ root: path.join(__dirname) });
    server.listen(3000, () => console.log('HTTP Server running on http://localhost:3000'));

    // Launch the browser and open the desired page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Open the calculator application
    await page.goto('http://localhost:3000/index.html');

    // Take screenshot of the main calculator interface
    await page.screenshot({ path: 'screenshots/calculator-main.png' });

    // Click buttons to perform calculation 5 + 3
    await page.click('text=5');
    await page.click('text=+');
    await page.click('text=3');
    await page.click('text==');

    // Take screenshot after calculation
    await page.screenshot({ path: 'screenshots/calculator-calculation.png' });

    // Take screenshot of the result
    await page.screenshot({ path: 'screenshots/calculator-result.png' });

    // Close browser and server
    await browser.close();
    server.close();
})();
