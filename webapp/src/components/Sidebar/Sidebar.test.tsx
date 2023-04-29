import { Suspense, useRef } from "react"
import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from "react-i18next"
import i18n from 'i18next'

import Loader from "../Loader"
import Sidebar from ".";
import { Category } from "../../types/Category";
import { SidebarView } from "../../pages/MapPage";

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

const setSelectedCategoryMock = jest.fn()
const toggleSidebarMock = jest.fn()
const setAddRoutes = jest.fn()
const openPopup = jest.fn()

let idCounter = 1

type SidebarTestsProps = {
  isOpen: boolean
  view: SidebarView
}
const SidebarTest = ({ isOpen, view } : SidebarTestsProps) => {
  const id = useRef(idCounter++)

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={ <Loader /> }>
        <Sidebar isOpen={isOpen} view={view} toggleSidebar={toggleSidebarMock} selectedCategory={Category.All} setSelectedCategory={setSelectedCategoryMock} setAddRoute={setAddRoutes} openPopup={openPopup} />
        <span data-testid="instance-id">{id.current}</span>
      </Suspense>
    </I18nextProvider>
  )
}

describe('sidebar', () => {

  it('opens the sidebar and the marker section should appear', async () => {

    const { rerender } = render(
      <SidebarTest isOpen={false} view={SidebarView.MARKERS} />
    )

    // Marker list and idCounter should
    await waitFor(() => expect(screen.getByTestId('instance-id')).toHaveTextContent('1'))
    expect(screen.queryByText('sidebar.list.title')).not.toBeInTheDocument()
    expect(screen.queryByText('sidebar.routes.title')).not.toBeInTheDocument()

    rerender(
      <SidebarTest isOpen={true} view={SidebarView.MARKERS} />
    )
    // Marker list and idCounter should appear
    await waitFor(() => expect(screen.getByTestId('instance-id')).toHaveTextContent('1')) //If the counter is the same, it means the component is rerendering an it is the same instance
    expect(screen.queryByText('sidebar.list.title')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.routes.title')).not.toBeInTheDocument()

  })

  it('changes the view from markers to routes', async () => {

    const { rerender } = render(
      <SidebarTest isOpen={true} view={SidebarView.MARKERS} />
    )

    // Marker list and idCounter should appear
    await waitFor(() => expect(screen.getByTestId('instance-id')).toHaveTextContent('3'))
    expect(screen.queryByText('sidebar.list.title')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.routes.title')).not.toBeInTheDocument()

    rerender(
      <SidebarTest isOpen={true} view={SidebarView.ROUTES} />
    )
    // Routes list and idCounter should appear
    await waitFor(() => expect(screen.getByTestId('instance-id')).toHaveTextContent('3'))
    expect(screen.queryByText('sidebar.list.title')).not.toBeInTheDocument()
    expect(screen.queryByText('sidebar.routes.title')).toBeInTheDocument()

  })
})