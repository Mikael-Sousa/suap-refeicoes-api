const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();
const SUAP_USERNAME = process.env.SUAP_USERNAME;
const SUAP_PASSWORD = process.env.SUAP_PASSWORD;
const url = "https://suap.ifpi.edu.br/accounts/login/?next=/";

const bot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
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

    await page.$eval(
      'li.has-child > a[title="Restaurante Institucional"]',
      (el) =>
        el.scrollIntoView(
          { behavior: "smooth", block: "center" },
          { visible: true }
        )
    );

    await page.click('li.has-child > a[title="Restaurante Institucional"]');

    await page.waitForSelector(
      'ul > li#menu-item-atividadesestudantis_restauranteinstitucional_reservarrefeições > a[title="Reservar Refeições"]',
      { visible: true }
    );

    await page.$eval(
      'li#menu-item-atividadesestudantis_restauranteinstitucional_reservarrefeições > a[title="Reservar Refeições"]',
      (el) =>
        el.scrollIntoView(
          { behavior: "smooth", block: "center" },
          { visible: true }
        )
    );

    await page.click(
      'li#menu-item-atividadesestudantis_restauranteinstitucional_reservarrefeições > a[title="Reservar Refeições"]'
    );

    await page.waitForSelector(".card-container > div:last-child", {
      visible: true,
    });
    const mainDiv = await page.$(".card-container > div:last-child");

    await page.evaluate((el) => {
      const link = el.querySelector("ul > li > a");
      if (link) link.scrollIntoView({ behavior: "smooth", block: "center" });
      if (link) link.click();
    }, mainDiv);
  } catch (err) {
    console.error("Erro no bot:", err.message);
    throw err;
  } finally {
    //Manter desativado durante a fase de teste
    //await browser.close();
  }
};

bot();
