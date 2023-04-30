import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from 'react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Loader from '../Loader';
import RoutesSidebar from ".";
import { IRoute } from "../../types/IRoute";
import { RoutesContent } from "./Styles";
import { RoutesContext } from "../../context/RoutesContext";
import { act } from "react-dom/test-utils";

const mockIsSidebarOpen = false;
const mockSetaddRoutes = jest.fn();
const mockOpenPopup = jest.fn();

const mockRoutesDispatch = jest.fn()

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

describe('SidebarRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  let isSideBarOpen = true;
  
  const mockRoutes: IRoute[] = [
    { id: "1", name: "Ruta 1", description: "Descripción de la ruta 1", points: [], created_at: new Date() },
    { id: "2", name: "Ruta 2", description: "Descripción de la ruta 2", points: [], created_at: new Date() },
    { id: "3", name: "Ruta 3", description: "Descripción de la ruta 3", points: [], created_at: new Date() },
  ];
  
  const toggleSidebar = (open: boolean | undefined) => {
    if (open !== undefined)
    isSideBarOpen = open;
    else
    isSideBarOpen = !isSideBarOpen;
  }
  
  test("RoutesSidebar show title", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
  });

  test("RoutesSidebar show title and close", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
    fireEvent.click(screen.getAllByRole('button')[0]) // Presses the close button
  });
    
  test("RoutesSidebar addroutes button", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
    // console.log(prettyDOM())
    expect(screen.getByText('sidebar.routes.newRoute')).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "sidebar.routes.newRoute" }));
    expect(mockOpenPopup).toHaveBeenCalledTimes(1);
  });
    
  test('Render a list of routes', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesContext.Provider value={{ state: mockRoutes, dispatch: mockRoutesDispatch }}>
            <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
          </RoutesContext.Provider>
        </Suspense>
      </I18nextProvider>
    );
    
    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())

    for (let route of mockRoutes)
      expect(screen.getByText(route.name)).toBeInTheDocument()
  })

  test('Open details of a route', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesContext.Provider value={{ state: mockRoutes, dispatch: mockRoutesDispatch }}>
            <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
          </RoutesContext.Provider>
        </Suspense>
      </I18nextProvider>
    );
    
    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())

    const routeContent = screen.getByText('Ruta 1')
    expect(routeContent).toBeInTheDocument()
    fireEvent.click(routeContent)

    expect(screen.getByText('sidebar.details.routes')).toBeInTheDocument()
    expect(screen.getByText('Ruta 1')).toBeInTheDocument()
  })

  test('create route', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesContext.Provider value={{ state: mockRoutes, dispatch: mockRoutesDispatch }}>
            <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
          </RoutesContext.Provider>
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
    
    expect(mockSetaddRoutes).toHaveBeenCalled()
    const addRouteFunction = mockSetaddRoutes.mock.calls[0][0] as (name: string, description?: string) => void

    const name = 'name'
    const description = 'description'
    
    await act( async () => {
      addRouteFunction(name, description)
    })

    expect(mockRoutesDispatch).toHaveBeenCalled()
    expect(mockRoutesDispatch.mock.calls[0][0]).toEqual({
      type: 'ADD',
      payload: {
        route: {
          id: expect.any(String),
          name: name,
          description: description,
          points: [],
          created_at: expect.any(Date),
        }
      }
    })

    // Details of the new route should appear
    expect(screen.getByText('sidebar.details.routes')).toBeInTheDocument()
    expect(screen.getByText(name)).toBeInTheDocument()
  })
});