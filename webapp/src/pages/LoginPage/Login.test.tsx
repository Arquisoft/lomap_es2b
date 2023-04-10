import { cleanup, prettyDOM, render, screen } from "@testing-library/react"
import Login from "."


describe('Login Tests', () => {

  test('login with no provider selected', () => {
    const buttonText = 'Entrar'
    const errorText = 'Debes elegir un proveedor'

    render(<Login />)
    const loginButton = screen.getByText(buttonText)
    expect(loginButton).toBeInTheDocument()
    loginButton.click()
    const errorMessage = screen.getByText(errorText)
    expect(errorMessage).toBeInTheDocument()
  })

  afterEach(() => {
    cleanup()
  })

})