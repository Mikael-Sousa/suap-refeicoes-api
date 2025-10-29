const puppeteer = require("puppeteer");

const url = "https://suap.ifpi.edu.br/accounts/login/?next=/";
const bot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();
    await page.goto(url);    
  } catch (err) {
    console.error("Erro no bot:", err.message);
    throw err;
  } finally {
    await browser.close();
  }
};

bot();
