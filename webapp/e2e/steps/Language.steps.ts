import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./features/Language.feature')

let page: puppeteer.Page
let browser: puppeteer.Browser

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({ args: ['--lang="es-ES"'] })
      : await puppeteer.launch({ headless: false, slowMo: 50, args: ['--lang="es-ES"'] });
    try {
      page = await browser.newPage()
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'es'
      });
      await page.goto(`http://localhost:3000`, { waitUntil: 'networkidle0' });

    } catch (e) {
      console.log(e);
      await browser.close();
    }
  })


  test('A user enter the page and tries to change the language to English', ({ when, then }) => {
    
    when('I change the language of the site to English', async () => {
      await expect(page).toClick('#root > div:nth-child(2) > button')
      await expect(page).toClick('#menu-appbar > div:nth-child(3) > ul > li:nth-child(2)')
    })

    then('the text should change to English', async () => {
      await page.waitForXPath('//*[contains(text(), "Save your favourite places and share them!")]')
      await page.waitForXPath('//*[contains(text(), "Pick a provider")]')
    })

  })

  afterAll(async ()=>{
    await browser.close()
  })

})