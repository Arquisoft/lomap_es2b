import {fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Loader from '../Loader'
import i18n from 'i18next'
import MarkersSidebar, { SelectRouteMenu } from '.'
import { Category } from '../../types/Category'
import { MarkerContext } from '../../context/MarkersContext'
import { IMarker } from '../../types/IMarker'
import { SessionContext } from '@inrupt/solid-ui-react'
import { ISessionContext } from '@inrupt/solid-ui-react/dist/src/context/sessionContext'
import { IRoute } from '../../types/IRoute'
import { RoutesContext } from '../../context/RoutesContext'

const mockToggleSideBar = jest.fn();
const mockSetSelectedCategory = jest.fn();
const mockDispach = jest.fn();

const mockRoutes: IRoute[] = [
  { id: "1", name: "Ruta 1", description: "Descripción de la ruta 1", points: [], created_at: new Date() },
  { id: "2", name: "Ruta 2", description: "Descripción de la ruta 2", points: [], created_at: new Date() },
  { id: "3", name: "Ruta 3", description: "Descripción de la ruta 3", points: [], created_at: new Date() },
];

const pruebaMarkers:IMarker[] = [
  { id: '1',name: 'marker1', lat: 1, lng: 1,description:"Description 1",images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '2',name: 'marker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '3',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '4',name: 'marker4', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: false, author: "https://lomapes2b.inrupt.net/" } },
  { id: '5',name: 'marker5', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: false, author: "https://author.inrupt.net/" } },
  { id: '6',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date("2023-04-29"), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '7',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date("2023-12-29"), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '8',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date("2023-12-29"), comments: [] , category: Category.Others, property: { owns: true, public: false } },
  { id: '9',name: 'amarker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
];


i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})


describe("Marker sidebar", () =>{
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Marker sidebar is displayed without markers",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
  })
  
  it("Marker sidebar is displayed with markers",async  ()=>{
    render(
        <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
            <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>              
        </Suspense>
    </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
  })

  it("Marker sidebar is displayed with markers public",async  ()=>{
      render(
        <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
            <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>              
        </Suspense>
    </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "sidebar.list.owner.public" }));
    await waitFor(() => expect(screen.getByText('marker4')).toBeInTheDocument());
})

it("Marker sidebar is displayed with markers friends",async  ()=>{
    render(
        <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
            <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>              
        </Suspense>
    </I18nextProvider>
    )

    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "sidebar.list.owner.friends" }));
    await waitFor(() => expect(screen.getByText('marker5')).toBeInTheDocument());
})
  
  it("Close sideBar",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
        </Suspense>
      </I18nextProvider>
    )
      
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole("button")[0]);
    await waitFor(() => expect(mockToggleSideBar).toHaveBeenCalled());
  })
  
  it("Search marker",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
            <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>              
        </Suspense>
      </I18nextProvider>
    )
      
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    const textSearch = screen.getAllByRole("textbox")[0];
    fireEvent.change(textSearch, {target: {value: "bbb"}});
    await waitFor(() => expect(screen.queryByText('marker1')).not.toBeInTheDocument());
    fireEvent.change(textSearch, {target: {value: "mark"}});
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    
  })
  
  it("Show marker details",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: () => {} }}>
            <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
          </MarkerContext.Provider>              
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    fireEvent.click(screen.getByText('marker1'));
    await waitFor(() => expect(screen.getByText('Description 1')).toBeInTheDocument());
  })
  
  it("Add comment",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
      <Suspense fallback={<Loader />}>
      <SessionContext.Provider value={{ session: { info: { webId: 'testwebid', isLoggedIn: true, sessionId: 'testSesssionId' } } } as ISessionContext}>
      <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: mockDispach }}>
      <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
      </MarkerContext.Provider>     
      </SessionContext.Provider>
      </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    fireEvent.click(screen.getByText('marker1'));
    
    await waitFor(() => expect(screen.getByText('Description 1')).toBeInTheDocument());
    
    const textComment = screen.getAllByRole("textbox")[0];
    fireEvent.change(textComment, {target: {value: "Comment 1"}})
    
    fireEvent.click(screen.getByRole("button", { name: "sidebar.details.add_comment" }));
    await waitFor(() => expect(mockDispach.mock.calls).toHaveLength(1));
  })
  
  it("Add score",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <SessionContext.Provider value={{ session: { info: { webId: 'testwebid', isLoggedIn: true, sessionId: 'testSesssionId' } } } as ISessionContext}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: mockDispach }}>
              <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>     
          </SessionContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
      
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    fireEvent.click(screen.getByText('marker1'));
    
    await waitFor(() => expect(screen.getByText('Description 1')).toBeInTheDocument());
    
    const textComment = screen.getAllByRole("textbox")[0];
    fireEvent.change(textComment, {target: {value: "Comment 1"}})
    
    fireEvent.click(screen.getByRole("button", { name: "sidebar.details.add_comment" }));
    await waitFor(() => expect(mockDispach.mock.calls).toHaveLength(1));
  })
  
  it("Change visibility",async  ()=>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <SessionContext.Provider value={{ session: { info: { webId: 'testwebid', isLoggedIn: true, sessionId: 'testSesssionId' } } } as ISessionContext}>
            <MarkerContext.Provider value={{ state: pruebaMarkers, dispatch: mockDispach }}>
              <MarkersSidebar toggleSidebar={mockToggleSideBar} selectedCategory={Category.All} setSelectedCategory={mockSetSelectedCategory} ></MarkersSidebar>
            </MarkerContext.Provider>     
          </SessionContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('marker1')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole("button", { name: "sidebar.list.mode.private" })[0]);
    
    await waitFor(() => expect(mockDispach.mock.calls).toHaveLength(1));
  })

  test("SelectRouteMenu adds marker to route on click", async () => {
    const mockAddMarkerToRoute = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <RoutesContext.Provider value={{ state: mockRoutes, dispatch: () => {} }}>
          <SelectRouteMenu addMarkerToRoute={mockAddMarkerToRoute} />
        </RoutesContext.Provider>
      </I18nextProvider>
    );
  
    const addMarkerButton = screen.getAllByRole('button')[0];
    fireEvent.click(addMarkerButton);
  
    await waitFor(() => screen.getByText('Ruta 1'));
  
    const marker1 = screen.getByText('Ruta 1');
    fireEvent.click(marker1);
  
    expect(mockAddMarkerToRoute).toHaveBeenCalled();
    expect(mockAddMarkerToRoute).toHaveBeenCalledWith(mockRoutes[0]);
  });
})
