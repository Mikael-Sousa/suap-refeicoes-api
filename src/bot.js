const puppeteer = require("puppeteer");
const dotenv = require("dotenv")

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

    await page.waitForSelector('input[name="username"]')
    await page.waitForSelector('input[name="password"]')

    await page.type('input[name="username"]', SUAP_USERNAME)
    await page.type('input[name="password"]', SUAP_PASSWORD)

    await page.waitForSelector('input[value="Acessar"]')

    await page.click('input[value="Acessar"')
    
  } catch (err) {
    console.error("Erro no bot:", err.message);
    throw err;
  } finally {
    //Manter desativado durante a fase de teste
    //await browser.close();
  }
};

bot();
