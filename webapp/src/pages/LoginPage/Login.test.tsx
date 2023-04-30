import { Suspense } from "react"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { I18nextProvider, initReactI18next } from "react-i18next"
import i18n from "i18next"

import Login from "."
import Loader from "../../components/Loader"

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

describe('Login Tests', () => {

  test('login with no provider selected', async () => {
    const buttonText = 'login.loginForm.login'
    const errorText = 'login.loginForm.error'

    const { getByText, getAllByText } = render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(getAllByText('LoMap')[0]).toBeInTheDocument())
    const loginButton = getByText(buttonText)
    expect(loginButton).toBeInTheDocument()
    loginButton.click()
    const errorMessage = screen.getByText(errorText)
    expect(errorMessage).toBeInTheDocument()
  })

  afterEach(() => {
    cleanup()
  })

})