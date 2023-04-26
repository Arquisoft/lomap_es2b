import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./features/About.feature')

let page: puppeteer.Page
let browser: puppeteer.Browser

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({ args: ['--lang=es-ES'] })
      : await puppeteer.launch({ headless: false, slowMo: 50, args: ['--lang=es-ES'] });
    page = await browser.newPage();


    try {
        await page.goto(`http://localhost:3000`, { waitUntil: 'load' });

    } catch (e) {
        console.log(e);
        await browser.close();
    }
  })

  jest.setTimeout(60000)

  test('A user enter the page and checks the About section', ({ when, then }) => {

    when('I enter the page and click the about button', async () => {
      await expect(page).toClick('#root > div:nth-child(3) > button')
    })

    then('the about popup should show up', async () => {
      await page.waitForXPath('//*[contains(text(), "Acerca de LoMap")]')
    })

  })

  afterAll(async ()=>{
    await browser.close()
  })

})