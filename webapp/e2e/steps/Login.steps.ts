import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot'
import { request } from 'http'
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


    try {
        await page.goto(`http://localhost:3000`, { waitUntil: 'load' });
        console.log("SUCCESS!!");

        // page.on('request', request => {
        //   const headers = request.headers()
        //   headers['token'] = 
        //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IkpxS29zX2J0SHBnIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6InNvbGlkIiwic3ViIjoiaHR0cHM6Ly9sb21hcHRlc3Quc29saWRjb21tdW5pdHkubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTY4MzU0Nzk1OSwiaWF0IjoxNjgyMzM4MzU5LCJqdGkiOiJkNjI3MTRiYzY4N2ZmYjY3IiwiY25mIjp7ImprdCI6ImZITUo2UzQweGFHc3NNbjVRZkV2N1hTSV9MUHg3d0lMVVFDdnJqZlFXQzAifSwiY2xpZW50X2lkIjoiMWI1ZjZiYjgyZDIxY2Y2NDJiNTU2MTg4ZjkxNjEzMDUiLCJ3ZWJpZCI6Imh0dHBzOi8vbG9tYXB0ZXN0LnNvbGlkY29tbXVuaXR5Lm5ldC9wcm9maWxlL2NhcmQjbWUifQ.FVpf8YYLcSW9mweeqqdK8u0W3edFFztXGaaur-3rKcGoS1oVHyT0lCYOmH9A5DzrptNHXKnFZ1X2CTXDwvwUu8oJfZ4q6Vo7pHoPqaZHYCOrf7igsdlasIuiOxfPM4I05ODWMofOn9NYIOwH3hO2BPPQq6V3iEIdv-KKpgiK6TPybqKSCT9nLoWs82eO1YRduUoxDWEuOW2fourkRAt8ZO1q-SckjMwPeSxMlzIHipemSrSSCjegmpMQUMAtHYte9rswICTsA9n7-imz8X4e7_evFE80FosQwsATD-NfGb2H-9Tow9dFEBYvFzAJXCBEo7sjljubUuhvZuMwQJac1w","token_type":"Bearer","expires_in":1209600,"refresh_token":"25fe1437708124caa901c184de0be679","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6InhoSFJkSFRqQmZRIn0.eyJpc3MiOiJodHRwczovL3NvbGlkY29tbXVuaXR5Lm5ldCIsImF1ZCI6IjFiNWY2YmI4MmQyMWNmNjQyYjU1NjE4OGY5MTYxMzA1IiwiYXpwIjoiMWI1ZjZiYjgyZDIxY2Y2NDJiNTU2MTg4ZjkxNjEzMDUiLCJzdWIiOiJodHRwczovL2xvbWFwdGVzdC5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwiZXhwIjoxNjgzNTQ3OTU5LCJpYXQiOjE2ODIzMzgzNTksImp0aSI6ImUxNjI1MzVmYzEwMDA5NWIiLCJhdF9oYXNoIjoiNHFUTWdXbWY3OExfZ3pzX0YweEtmZyJ9.mzMXPjotdk-I_68WEuQR4TCZycJUxY52F5P4-m5EGkM__UPJJ_IiyL7bCu1OorhjGUY4DV9-K8c3CzLneiZ-uIltDuCZvgaGAKSyMsR9PuRznsjPg3tKj_s2ftSCabXddWlOD32Z1s5mOcvRsIaexLck5khO081NtFY_xKVGPnGWX-XIJy-SMOlmB5XCR_2z3wOIk8fTAH_MiIILW8xM03Zp-AysRyQIsPTDYCC23wUW16myc1RKdOha_NgZ1uAHWsYr7AJfu94oV8HIJPPOpMlNxOyumVn2gDZ5aOGAmEYhy641N9Byh7t3_-HapQOPIiAyal7sPjXmPjI--1rTpg'
        //   request.continue({ headers })  
        // })

        page.on('request', request => {
          console.log(request.url())
        })
    } catch (e) {
        console.log(e);
        await browser.close();
    }
  })

  jest.setTimeout(180000)

  test('The user has a SolidCommunity account and is entering the site', ({ given, when, and, then }) => {

    let webId: string
    let password: string

    given('a user with a SolidCommunity account that has no marker saved',() => {
      webId = 'lomaptest'
      password = 'LoMap_test123$'
    })

    when('I select SolidCommunity as my login provider and click login', async () => {
      await expect(page).toClick('#root > div:nth-child(1) > div:nth-child(3) > form > div')
      await expect(page).toClick('#menu- > div:nth-child(3) > ul > li:nth-child(2)')
      const navigationPromise = page.waitForNavigation({waitUntil: 'load', timeout: 60000})
      await expect(page).toClick('#root > div:nth-child(1) > div:nth-child(3) > form > button')
      await navigationPromise
    })

    and('I will be redirected to the SolidCommunity login site and I enter my Solid credentials', async () => {
      await expect(page).toFillForm('body > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div > form', {
        username: webId,
        password: password
      }, { timeout: 1000 })
      const navigationPromise = page.waitForNavigation({waitUntil: 'load', timeout: 60000})
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