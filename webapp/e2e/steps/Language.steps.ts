import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./features/Language.feature')

let page: puppeteer.Page
let browser: puppeteer.Browser

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();


    try {
        await page.goto(`http://localhost:3000`, { waitUntil: 'load' });

    } catch (e) {
        console.log(e);
        await browser.close();
    }
  })

  jest.setTimeout(60000)

  test('A user enter the page and tries to change the language', ({ when, and, then }) => {

    when('I enter the site and it is in Spanish', async () => {
      await page.waitForXPath('//*[contains(text(), "¡Guarda tus sitios favoritos y compártelos!")]')
      await page.waitForXPath('//*[contains(text(), "¡Guarda tus sitios favoritos y compártelos!")]')
    })
    
    and('I change the language of the site to English', async () => {
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