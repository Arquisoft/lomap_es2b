import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot'
import { defineFeature, loadFeature } from 'jest-cucumber'
import puppeteer from 'puppeteer'

const feature = loadFeature('./features/Login.feature')

let page: puppeteer.Page
let browser: puppeteer.Browser

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0'
    })
      .catch(() => {})
  })

  jest.setTimeout(60000)

  test('The user has a SolidCommunity account and is entering the site', ({ given, when, and, then }) => {

    let webId: string
    let password: string

    given('a user with a SolidCommunity account that has no marker saved',() => {
      webId = 'lomaptest'
      password = 'LoMap_test123$'
    })

    when('I select SolidCommunity as my login provider and click login', async () => {
      await expect(page).toClick('#root > div:nth-child(1) > div:nth-child(3) > form > div')
      await expect(page).toClick('#menu- > div:nth-child(3) > ul > li:nth-child(1)')
      const navigationPromise = page.waitForNavigation()
      await expect(page).toClick('#root > div:nth-child(1) > div:nth-child(3) > form > button')
      await navigationPromise
    })

    and('I will be redirected to the SolidCommunity login site and I enter my Solid credentials', async () => {
      await expect(page).toFillForm('body > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > form', {
        username: webId,
        password: password
      }, { timeout: 1000 })
      const navigationPromise = page.waitForNavigation()
      await expect(page).toClick('button', { text: 'Log In' })
      await navigationPromise
    })

    then('I\'m redirected back to LoMap and I should see the map page', async () => {
      await page.waitForSelector('#root > div:nth-child(2) > div:nth-child(2) > h1')
    })

  })

  afterAll(async ()=>{
    await browser.close()
  })

})