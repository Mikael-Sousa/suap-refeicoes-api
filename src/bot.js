const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();
const SUAP_USERNAME = process.env.SUAP_USERNAME;
const SUAP_PASSWORD = process.env.SUAP_PASSWORD;
const url = "https://suap.ifpi.edu.br/accounts/login/?next=/";

const bot = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');

    await page.type('input[name="username"]', SUAP_USERNAME);
    await page.type('input[name="password"]', SUAP_PASSWORD);

    await page.waitForSelector('input[value="Acessar"]');

    await page.click('input[value="Acessar"]');

    await page.waitForSelector("a:has(span.fas.fa-chevron-right)", {
      visible: true,
    });

    await page.click("a:has(span.fas.fa-chevron-right)");

    await page.waitForSelector(
      "ul:has(li.has-child.menu-atividades-estudantis)",
      { visible: true }
    );

    await page.click("li.has-child.menu-atividades-estudantis");

    await page.waitForSelector(
      'li.has-child > a[title="Restaurante Institucional"]',
      { visible: true }
    );

    const restLinkSelector =
      'li.has-child > a[title="Restaurante Institucional"]';
    const restLink = await page.waitForSelector(restLinkSelector, {
      visible: true,
    });
    await restLink.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await restLink.click();

    const reservarSelector =
      'li#menu-item-atividadesestudantis_restauranteinstitucional_reservarrefeições > a[title="Reservar Refeições"]';
    const reservarLink = await page.waitForSelector(reservarSelector, {
      visible: true,
    });
    await reservarLink.evaluate((el) =>
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    );
    await reservarLink.click();

    const cardSelector = ".card-container > div:first-child ul > li > a";
    await page.waitForSelector(cardSelector, { visible: true });
    await page.evaluate((selector) => {
      const link = document.querySelector(selector);
      if (link) link.click();
    }, cardSelector);

    const feedbackSelector = "#feedback_message";
    await page.waitForSelector(feedbackSelector, { visible: true });
    const message = await page.$eval(feedbackSelector, (el) =>
      el.textContent.trim()
    );

    return message;
  } catch (err) {
    console.error("Erro no bot:", err.message);
    throw err;
  } finally {
    await browser.close();
  }
};

module.exports = bot;
