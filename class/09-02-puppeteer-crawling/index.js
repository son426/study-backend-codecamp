// #poduct_list_area > li:nth-child(2) > a > div > div.name > div > span

import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto(
    "https://www.goodchoice.kr/product/search/2?sel_date=2023-03-22&sel_date2=2023-03-23"
  );
  await new Promise((page) => setTimeout(page, 1000));

  const stage = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span",
    (el) => el.textContent
  );

  const location = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)",
    (el) => el.textContent
  );

  const price = await page.$eval(
    "#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b",
    (el) => el.textContent
  );

  console.log("stage : ", stage);
  console.log("location : ", location.trim());
  console.log("price : ", price);
}

startCrawling();
