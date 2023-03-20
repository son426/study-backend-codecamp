// #poduct_list_area > li:nth-child(2) > a > div > div.name > div > span

import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto("https://finance.naver.com/item/sise.naver?code=005930");
  await new Promise((page) => setTimeout(page, 1000));

  // iframe 골라내기
  // 그 후에 page.$eval 이 아니라 frame.$eval
  const framePage = await page
    .frames()
    .find((el) => el.url().includes("/item/sise_day.naver?code=005930"));

  for (let i = 3; i <= 7; i++) {
    const date = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(1) > span`,
      (el) => el.textContent
    );

    const price = await framePage.$eval(
      `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`,
      (el) => el.textContent
    );

    console.log(date, ":", price);
  }
}

startCrawling();
