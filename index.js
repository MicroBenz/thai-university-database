const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const { writeFileSync } = require('fs');
const { join } = require('path');

const webPath =
  'https://th.wikipedia.org/wiki/%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%AD%E0%B8%B8%E0%B8%94%E0%B8%A1%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2%E0%B9%83%E0%B8%99%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2';

function generateRow($, row, tableIndex, limitLength) {
  const university = $(row)
    .children('td:nth-child(2)')
    .text()
    .trim();
  if (tableIndex !== limitLength) {
    const obj = { university };
    const code = $(row)
      .children('td:nth-child(3)')
      .text()
      .split('/');
    if (code[0]) obj.thCode = code[0].trim();
    if (code[1]) obj.enCode = code[1].trim();
    return obj;
  } else {
    return { university };
  }
}

function generateTableData(allTables) {
  console.log('Generating data..');
  return allTables
    .map((table, tableIndex) => {
      const $ = cheerio.load(table);
      return $('tr:nth-child(n+3)')
        .map((index, row) =>
          generateRow($, row, tableIndex, allTables.length - 1)
        )
        .get();
    })
    .reduce((prev, curr) => [...prev, ...curr], []);
}

async function getDataFromBrowser(path) {
  console.log('Start fetch data from browser..');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(path, { waitUntil: 'networkidle2' });
  const allTables = await page.$$eval('.wikitable', tables =>
    tables.map(t => t.outerHTML.toString())
  );
  await browser.close();
  return allTables;
}

(async () => {
  try {
    const allTables = await getDataFromBrowser(webPath);
    const res = generateTableData(allTables);
    writeFileSync(
      join(__dirname, './dist/universities.json'),
      JSON.stringify(res, null, 4)
    );
    console.log('Write file successful');
  } catch (e) {
    console.error(e);
  }
})();
