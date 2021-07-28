const puppeteer = require("puppeteer");
const fs = require("fs");
const template = require("./template");
(async () => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // create a new page
  const page = await browser.newPage();

  // set your html as the pages content
  const html = fs.readFileSync(`${__dirname}/template.js`, "utf8");
  await page.setContent(template(), {
    waitUntil: "domcontentloaded",
  });

  // create a pdf buffer
  const pdfBuffer = await page.pdf({
    format: "A4",
  });

  // or a .pdf file
  await page.pdf({
    format: "A4",
    path: `${__dirname}/my-fance-invoice.pdf`,
  });

  // close the browser
  await browser.close();
})();
