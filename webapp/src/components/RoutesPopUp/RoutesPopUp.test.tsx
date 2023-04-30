import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Suspense } from 'react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Loader from '../Loader';
import RoutesPopup from ".";

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

const mockAddRoute = jest.fn()
const mockClosePopup = jest.fn()

describe('RoutesPopup', () => {

  test('tries to add a route without name', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesPopup visible={true} addRoute={mockAddRoute} closePopup={mockClosePopup} />
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('addRoutes.title')).toBeInTheDocument())
    fireEvent.click(screen.getByText('addRoutes.create'))

    // Error message should show
    expect(screen.getByText('addRoutes.error.emptyName')).toBeInTheDocument()
  })

  test('tries to add a route with name too long', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesPopup visible={true} addRoute={mockAddRoute} closePopup={mockClosePopup} />
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('addRoutes.title')).toBeInTheDocument())
    const nameInput = screen.getByLabelText('addRoutes.name.label:', {collapseWhitespace: true})
    expect(nameInput).toBeInTheDocument()
    userEvent.type(nameInput, 'this name is to long to fit and will get to the limit')
    fireEvent.click(screen.getByText('addRoutes.create'))

    // Error message should show
    expect(screen.getByText('addRoutes.error.nameTooLong')).toBeInTheDocument()
  })

  test('tries to add a route with name too long', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesPopup visible={true} addRoute={mockAddRoute} closePopup={mockClosePopup} />
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('addRoutes.title')).toBeInTheDocument())
    const nameInput = screen.getByLabelText('addRoutes.name.label:', {collapseWhitespace: true})
    expect(nameInput).toBeInTheDocument()
    userEvent.type(nameInput, 'a good name')
    const descInput = screen.getByLabelText('addRoutes.description.label:', {collapseWhitespace: true})
    expect(descInput).toBeInTheDocument()
    userEvent.type(descInput, 'a good description')
    fireEvent.click(screen.getByText('addRoutes.create'))

    // add route function should've been call
    expect(mockAddRoute).toHaveBeenCalled()
    expect(mockAddRoute.mock.calls[0]).toEqual([
      'a good name',
      'a good description'
    ])
  })

})