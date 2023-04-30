import { Suspense, useRef } from "react"
import { fireEvent, prettyDOM, render, screen, waitFor, within } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from "react-i18next"
import i18n from 'i18next'

import Loader from "../../components/Loader"
import MapPage, { Popups } from ".";
import { Category } from "../../types/Category";
import { SidebarView } from "../../pages/MapPage";
import { LngLat } from "mapbox-gl";
import { AddModerator } from "@mui/icons-material";
import { MarkerContext } from "../../context/MarkersContext";

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

jest.mock('../../components/NavBar', () => ({
  __esModule: true,
  default: (props: {
    isSidebarOpen: boolean
    sidebarView: SidebarView
    toggleSidebar: (open: boolean | undefined, view?: SidebarView) => void
    openPopup: (popup : Popups) => void
    toggleNews:(open: boolean | undefined) => void
  }) => {
    return (
      <div>
        <div>Mock Navbar</div>
        <div data-testid="navbar-props">{ JSON.stringify(props) }</div>
        {/* Gestion del sidebar */}
        <button onClick={ () => props.toggleSidebar(true, 'markers' as SidebarView.MARKERS) }>openMarkers</button>
        <button onClick={ () => props.toggleSidebar(false, 'markers' as SidebarView.MARKERS) }>closeMarkers</button>
        <button onClick={ () => props.toggleSidebar(true, 'routes' as SidebarView.ROUTES) }>openRoutes</button>
        <button onClick={ () => props.toggleSidebar(true, 'markers' as SidebarView.MARKERS) }>switchToMarkers</button>

        {/* Gestion de popups */}
        <button onClick={ () => props.openPopup(1 as Popups.ADD_MARKER) }>openAddMarker</button>
        <button onClick={ () => props.openPopup(3 as Popups.ADD_ROUTE) }>openAddRoute</button>
        <button onClick={ () => props.openPopup(2 as Popups.FRIENDS) }>openFriends</button>
        <button onClick={ () => props.openPopup(0 as Popups.NONE) }>closePopups</button>

        {/* Gestion de news */}
        <button onClick={ () => props.toggleNews(true) }>openNews</button>
        <button onClick={ () => props.toggleNews(false) }>closeNews</button>
        <button onClick={ () => props.toggleNews(undefined) }>switchNews</button>
      </div>
    )
  }
}))
jest.mock('../../components/Filters', () => ({
  __esModule:true,
  default: (props:{
    toggleSidebar: (open: boolean | undefined) => void;
    activeFilter: Category;
    setActiveFilter: (category: Category) => void;
    className?: string
  }) => {
    return (
      <div>
        <div>Mock Filters</div>
        <div data-testid="filters-props">{ JSON.stringify(props) }</div>
      </div>
    )
  },
}))
jest.mock('../../components/Sidebar', () => ({
  __esModule:true,
  default: (props:any) => {
    return (
      <div>
        <div>Mock Sidebar</div>
        <div data-testid="sidebar-props">{ JSON.stringify(props) }</div>
      </div>
    )
  },
}))
jest.mock('../../components/Map', () => ({
  __esModule:true,
  default: (props: {
    onClick:(lngLat:LngLat)=>void;
    filterType: Category;
  }) => {
    return (
      <div>
        <div>Mock Map</div>
        <button onClick={() => props.onClick({ lat: 10, lng: 20 } as LngLat)}>newMarker</button>
      </div>
    )
  },
}))
jest.mock('../../components/FocusOnUserButton', () => ({
  __esModule:true,
  default: (_:any) => {
    return (
      <div>Mock FocusOnUserButton</div>
    )
  },
}))
jest.mock('../../components/NewsPopup', () => ({
  __esModule:true,
  default: (props:any) => {
    return (
      <div>
        <div>Mock NewsPopup</div>
        <div data-testid="news-props">{ JSON.stringify(props) }</div>
      </div>
    )
  },
}))
jest.mock('../../components/AddMarkerPopup', () => ({
  __esModule:true,
  default: (props: {
    visible:boolean;
    lngLat:LngLat|undefined;
    addMark:(name:string, lngLat:LngLat|undefined,description:string, category:Category, shared:boolean,direction:string,image?:string)=>void;
    closePopup:()=>void;
  }) => {
    return (
      <div>
        <div>Mock AddMarker</div>
        <div data-testid="addmarker-props">{ JSON.stringify(props) }</div>
        <button onClick={() => {
          props.addMark(
            'privatemarker', 
            {lat: 1, lng: 1} as LngLat, 
            'description', 
            'bar' as Category.Bar, 
            false,
            ''
          )
        }}>privateMarker</button>
        <button onClick={() => {
          props.addMark(
            'privatemarker', 
            {lat: 1, lng: 1} as LngLat, 
            'description', 
            'bar' as Category.Bar, 
            true,
            ''
          )
        }}>publicMarker</button>
      </div>
    )
  },
}))
jest.mock('../../components/FriendsPopup', () => ({
  __esModule:true,
  default: (props:any) => {
    return (
      <div>
        <div>Mock Friends</div>
        <div data-testid="friends-props">{ JSON.stringify(props) }</div>
      </div>
    )
  },
}))
jest.mock('../../components/RoutesPopUp', () => ({
  __esModule:true,
  default: (props:any) => {
    return (
      <div>
        <div>Mock RoutesPopup</div>
        <div data-testid="routes-props">{ JSON.stringify(props) }</div>
      </div>
    )
  },
}))

describe('MapPage', () => {

  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('the initial state is correct', async () => {
    render(
      <I18nextProvider i18n={i18n}>
      <Suspense fallback={ <Loader /> }>
        <MapPage />
      </Suspense>
    </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())
    expect(within(screen.getByTestId('navbar-props')).getByText('{"sidebarView":"markers","isSidebarOpen":true}')).toBeInTheDocument()
    expect(within(screen.getByTestId('filters-props')).getByText('{"activeFilter":"all"}')).toBeInTheDocument()
    expect(within(screen.getByTestId('sidebar-props')).getByText('{"isOpen":true,"view":"markers","selectedCategory":"all"}')).toBeInTheDocument()
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":false,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":false}')).toBeInTheDocument()
  })

  test('different operations with the sidebar', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MapPage />
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())

    // Sidebar should init open and with markers section visible and all categories showing
    expect(within(screen.getByTestId('sidebar-props')).getByText('{"isOpen":true,"view":"markers","selectedCategory":"all"}')).toBeInTheDocument()
    // Switches to routes section
    fireEvent.click(screen.getByText('openRoutes'))
    expect(within(screen.getByTestId('sidebar-props')).getByText('{"isOpen":true,"view":"routes","selectedCategory":"all"}')).toBeInTheDocument()
    // Tries closing sidebar and switching to markers view. It should stay open
    fireEvent.click(screen.getByText('closeMarkers'))
    expect(within(screen.getByTestId('sidebar-props')).getByText('{"isOpen":true,"view":"markers","selectedCategory":"all"}')).toBeInTheDocument()
    // Close sidebar
    fireEvent.click(screen.getByText('closeMarkers'))
    expect(within(screen.getByTestId('sidebar-props')).getByText('{"isOpen":false,"view":"markers","selectedCategory":"all"}')).toBeInTheDocument()
  })

  test('click on the map should open add marker popup', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MapPage />
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())
    // Add marker popup should initialize closed
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    // Click on the map opens new marker popup with the correct coordinates
    fireEvent.click(screen.getByText('newMarker'))
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":true,"lngLat":{"lat":10,"lng":20}}')).toBeInTheDocument()
  })

  test('different operations with all the popups', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MapPage />
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())

    // All popups should initialize closed
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":false,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":false}')).toBeInTheDocument()
    // Open friends popup. The rest remains closed
    fireEvent.click(screen.getByText('openFriends'))
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":true,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":false}')).toBeInTheDocument()
    // Open add marker popup. Friends popup should close
    fireEvent.click(screen.getByText('openAddMarker'))
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":true}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":false,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":false}')).toBeInTheDocument()
    // Open add route popup. Add marker popup should close
    fireEvent.click(screen.getByText('openAddRoute'))
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":false,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":true}')).toBeInTheDocument()
    // Close open popup
    fireEvent.click(screen.getByText('closePopups'))
    expect(within(screen.getByTestId('addmarker-props')).getByText('{"visible":false}')).toBeInTheDocument()
    expect(within(screen.getByTestId('friends-props')).getByText('{"isOpen":false,"solidManager":{}}')).toBeInTheDocument()
    expect(within(screen.getByTestId('routes-props')).getByText('{"visible":false}')).toBeInTheDocument()
  })

  test('open and close the news popup', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MapPage />
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())
    
    // News popup should initialize closed
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":false}')).toBeInTheDocument()

    fireEvent.click(screen.getByText('openNews'))
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":true}')).toBeInTheDocument()

    fireEvent.click(screen.getByText('switchNews'))
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":false}')).toBeInTheDocument()

    fireEvent.click(screen.getByText('switchNews'))
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":true}')).toBeInTheDocument()

    fireEvent.click(screen.getByText('closeNews'))
    expect(within(screen.getByTestId('news-props')).getByText('{"isNewsOpen":false}')).toBeInTheDocument()
  })

  test('create a new private marker', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MarkerContext.Provider value={{ state: [], dispatch: mockDispatch }}>
            <MapPage />
          </MarkerContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())
    fireEvent.click(screen.getByText('privateMarker'))
    console.log(mockDispatch.mock.calls[0][0])
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'ADD',
      payload: {
        marker: {
          id: expect.any(String),
          name: 'privatemarker',
          address: '',
          lat: 1,
          lng: 1,
          date: expect.any(Date),
          images: [],
          description: 'description',
          category: 'bar',
          comments: [],
          score: 0,
          property: {
            owns: true,
            public: false
          }
        }
      }
    })
  })
  
  test('create a new public marker', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={ <Loader /> }>
          <MarkerContext.Provider value={{ state: [], dispatch: mockDispatch }}>
            <MapPage />
          </MarkerContext.Provider>
        </Suspense>
      </I18nextProvider>
    )
    
    await waitFor(() => expect(screen.queryByText('Mock Navbar')).toBeInTheDocument())
    fireEvent.click(screen.getByText('publicMarker'))
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: 'ADD',
      payload: {
        marker: {
          id: expect.any(String),
          name: 'privatemarker',
          address: '',
          lat: 1,
          lng: 1,
          date: expect.any(Date),
          images: [],
          description: 'description',
          category: 'bar',
          comments: [],
          score: 0,
          property: {
            owns: false,
            author: 'https://lomapes2b.inrupt.net/'
          }
        }
      }
    })
  })

})