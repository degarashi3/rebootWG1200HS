const puppeteer = require('puppeteer-core');
const { IncomingWebhook } = require("@slack/webhook");
const webhook = new IncomingWebhook("https://hooks.slack.com/services/xxxxxxxxxxxxxxxxxxxxxxxxxxxx");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser'
  })
  
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);

  await page.authenticate({username: 'admin', password: '<password>'});

  await page.goto('http://<ip address>/reboot.htm', {waitUntil: "domcontentloaded"});

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await webhook.send({
    text: "reboot WG1200HS",
  });

  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter')
  
  await browser.close();
})();
