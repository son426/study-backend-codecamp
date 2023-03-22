import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.setViewport();

  const model_name_en = "porter2-electric-special";

  await page.goto(
    `https://www.hyundai.com/kr/ko/e/vehicles/${model_name_en}/intro`
  );
  await new Promise((page) => setTimeout(page, 1000));

  // ----------메인 소개----------
  // const name_en = await page.$eval(
  //   "#carModelInfo > div > div.area-kv > div.kv > section > div.visual-head-wrap > div > div > div.visual-title > h2",
  //   (el) => el.textContent
  // );

  // const summary = await page.$eval(
  //   "#carModelInfo > div > div.area-kv > div.kv > section > div.visual-head-wrap > div > div > div.visual-title > p.title-sub",
  //   (el) => el.textContent
  // );

  // const price = await page.$eval(
  //   "#carModelInfo > div > div.area-kv > div.kv > section > div.visual-head-wrap > div > div > div.visual-title > p.title-price",
  //   (el) => parseInt(el.textContent.replace(/,/g, "").replace("원 부터", ""))
  // );

  // const main_img_url = await page.$eval(
  //   "#carModelInfo > div > div.area-kv > div.kv > section > div.visual-head-wrap > div",
  //   // (el) => el.style.backgroundImage // url("/contents/repn-car/key-visual/homepage/pc/nexo-21my-w.jpg")
  //   (el) => el.style.backgroundImage
  // );

  // console.log(name_en);
  // console.log(summary);
  // console.log(price);
  // console.log(main_img_url);

  // ----------메뉴 뽑기----------
  const menus = await page.$$eval("ul.menus span.title-intro", (menus) => {
    return menus.map((menu) => menu.textContent.trim());
  });

  console.log("menus : ", menus);

  // ----------하이라이트 뽑기----------

  await page.waitForSelector("div.highlight img");
  await page.waitForSelector("div.highlight div.tit");
  await page.waitForSelector("div.highlight div.text");
  await page.waitForSelector("div.highlight p.summery");

  const highlight_summary = await page.$eval(
    "div.highlight p.summery",
    (el) => el.textContent
  );

  const imgElements = await page.$$("div.highlight div.pc-only img");

  const img_urlArray = await Promise.all(
    imgElements.map(async (element) => {
      const src = await element.getProperty("src");
      const img_url = await src.jsonValue();
      return img_url;
    })
  );

  const titleArray = await page.$$eval(
    "div.highlight div.pc-only div.tit",
    (el) => el.map((title) => title.textContent)
  );

  const descriptionArray = await page.$$eval(
    "div.highlight div.pc-only div.text",
    (el) => el.map((title) => title.textContent)
  );

  const set1 = new Set(titleArray);
  const uniqueTitleArray = [...set1];
  // console.log("uniqueTitleArray :", uniqueTitleArray);

  const set2 = new Set(descriptionArray);
  const uniqueDescriptionArray = [...set2];
  // console.log("uniqueDescriptionArray : ", uniqueDescriptionArray);

  let highlight_data = [];
  for (let i = 0; i < uniqueTitleArray.length; i++) {
    const img_src = img_urlArray[i];
    const title = uniqueTitleArray[i];
    const summary = uniqueDescriptionArray[i];
    const tmpObject = { title, summary, img_src };
    highlight_data.push(tmpObject);
  }

  console.log(highlight_data);

  // const highlight_div = await page.$("div.highlight");
  // console.log(highlight_div);

  // await page.waitForSelector("div.highlight img");
}

startCrawling();
