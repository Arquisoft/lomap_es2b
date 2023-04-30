import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from 'react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Loader from '../Loader';
import RoutesSidebar, { SelectRouteMenu } from ".";
import { IRoute } from "../../types/IRoute";
import { RoutesContent } from "./Styles";
import { RoutesContext } from "../../context/RoutesContext";
import { MarkerContext } from '../../context/MarkersContext'
import { act } from "react-dom/test-utils";
import { Category } from "../../types/Category";
import { IMarker } from "../../types/IMarker";

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

  const pruebaMarkers:IMarker[] = [
    { id: '1',name: 'marker1', lat: 1, lng: 1,description:"Description 1",images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
    { id: '2',name: 'marker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
    { id: '3',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
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

  test('Open details go back', async () => {
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

    //darle al boton
    fireEvent.click(screen.getByRole("button", { name: "sidebar.details.back" }));

    expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument()
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

    await act(async () => {
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

  test("Search routes", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <RoutesContext.Provider value={{ state: mockRoutes, dispatch: mockRoutesDispatch }}>
            <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
          </RoutesContext.Provider>
        </Suspense>
      </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Ruta 1')).toBeInTheDocument());
    const textSearch = screen.getAllByRole("textbox")[0];
    fireEvent.change(textSearch, { target: { value: "bbb" } });
    await waitFor(() => expect(screen.queryByText('Ruta 1')).not.toBeInTheDocument());
    fireEvent.change(textSearch, { target: { value: "Ruta" } });
    await waitFor(() => expect(screen.getByText('Ruta 1')).toBeInTheDocument());
  })

  test("SelectRouteMenu adds marker to route on click", async () => {
    const mockAddMarkerToRoute = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
          <SelectRouteMenu addMarkerToRoute={mockAddMarkerToRoute} />
        </MarkerContext.Provider>
      </I18nextProvider>
    );
  
    const addMarkerButton = screen.getByText('sidebar.routes.addMarker');
    fireEvent.click(addMarkerButton);
  
    await waitFor(() => screen.getByText('marker1'));
  
    const marker1 = screen.getByText('marker1');
    fireEvent.click(marker1);
  
    expect(mockAddMarkerToRoute).toHaveBeenCalledTimes(1);
    expect(mockAddMarkerToRoute).toHaveBeenCalledWith(pruebaMarkers[0]);
  });
});