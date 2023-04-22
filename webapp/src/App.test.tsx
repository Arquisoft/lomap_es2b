import { Suspense } from 'react';
import i18n from 'i18next'


import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './App';
import Sidebar from './components/Sidebar';
import { Category } from './types/Category';
import Navbar from './components/NavBar';
import Loader from './components/Loader';
import { MarkerContext } from './context/MarkersContext';
import { IMarker } from './types/IMarker';
import Filter, { FilterComponent } from './components/Filters';

const mockToggleSidebar = jest.fn();
const mockIsSidebarOpen = false;
const mockOpenPopup = jest.fn();
const mocksetSelectedCategory= jest.fn();
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})


test('renders learn react link', () => {
  render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
  waitFor(() => expect(screen.getAllByText("LoMap")[0]).toBeInTheDocument())
});

// describe('Sidebar component', () => {
//   const mockMarkers: IMarker[] = [
//     {
//       id: "1",
//       name: 'Marker 1',
//       lat: 40.123,
//       lng: -3.456,
//       category: Category.Hotel,
//       property: {
//         owns: true,
//         public: false,
//       },
//       date: new Date(2022, 0, 1),
//       images: [],
//       comments: []
//     },
//     {
//       id: "2",
//       name: 'Marker 2',
//       lat: 41.123,
//       lng: -4.456,
//       category: Category.Restaurant,
//       property: {
//         owns: false,
//         author: "John Doe",
//       },
//       date: new Date(2022, 0, 2),
//       images: [],
//       comments: []
//     },
//   ];

//   const dispatch = jest.fn();

//   const renderSidebar = (selectedCategory: Category, markers: IMarker[]) => {
//     return render(
//       <I18nextProvider i18n={i18n}>
//         <Suspense fallback={<Loader />}>
//           <Sidebar isOpen={true} toggleSidebar={mockToggleSidebar} selectedCategory={selectedCategory} setSelectedCategory={mocksetSelectedCategory}/>
//         </Suspense>
//       </I18nextProvider>
//     );
//   };

//   it('renders the list of markers correctly', () => {
//     const { getByText } = renderSidebar(Category.All, mockMarkers);
//     expect(getByText('Marker 1')).toBeInTheDocument();
//     expect(getByText('Marker 2')).toBeInTheDocument();
//   });

//   it('shows the marker information when a marker is clicked', () => {
//     const { getByText } = renderSidebar(Category.All, mockMarkers);
//     const marker1 = getByText('Marker 1');
//     fireEvent.click(marker1);
//     expect(getByText('Details of Marker 1')).toBeInTheDocument();
//   });
// });

describe('sideBar', () => {
  beforeEach(() => {
    mockToggleSidebar.mockClear();
    mocksetSelectedCategory.mockClear();
  });


  test('sideBar render', async () =>{
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Sidebar isOpen={true} toggleSidebar={mockToggleSidebar} selectedCategory={Category.All} setSelectedCategory={mocksetSelectedCategory}/>
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByText('sidebar.list.title')).toBeInTheDocument())
  }); 
});

describe('Navbar', () => {
  beforeEach(() => {
    //mockToggleSidebar.mockClear();
    mockOpenPopup.mockClear();
  });

  let isSideBarOpen = true;

  const toggleSidebar = (open: boolean | undefined) => {
    if (open !== undefined) 
      isSideBarOpen = open;
    else 
      isSideBarOpen = !isSideBarOpen;
  }

  it('should render Navbar component', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );

    waitFor(() => expect(screen.getByText('LoMap')).toBeInTheDocument())
  });

  it("opens the user menu when clicking on the user avatar", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    userEvent.click(screen.getByRole('img'));
    expect(screen.getByText("navbar.user.logout")).toBeInTheDocument();
  });

  it("opens the search form when clicking on the search button", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.search" })).toBeInTheDocument())
    userEvent.click(screen.getByRole("button", { name: "navbar.tooltips.search" }));
    expect(screen.getByPlaceholderText("navbar.search.placeholder")).toBeInTheDocument();
  });
  
  it("opens the options menu and the about popup and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.menu" })).toBeInTheDocument())
    userEvent.click(screen.getByRole("button", { name: "navbar.tooltips.menu" }));
    expect(screen.getByText("options.title")).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'options.about' }))
    expect(screen.getByText('aboutPopup.title')).toBeInTheDocument()
    userEvent.click(screen.getAllByRole('button')[0]) // Presses the close button
    expect(screen.getByText('options.title')).toBeInTheDocument()
  });

  it("opens the about popup from user menu", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    userEvent.click(screen.getByRole('img'));
    userEvent.click(screen.getByText('navbar.user.about'))
    expect(screen.getByText('aboutPopup.title')).toBeInTheDocument()
  });

   it("opens the options menu and the about popup and closes it", async () => {
     render(
       <I18nextProvider i18n={i18n}>
         <Suspense fallback={<Loader />}>
           <Navbar
             toggleSidebar={toggleSidebar}
             isSidebarOpen={mockIsSidebarOpen}
             openPopup={mockOpenPopup}
           />
         </Suspense>
       </I18nextProvider>
     );
    
     // Espera a que el botón esté presente en la pantalla
     await waitFor(() =>
       expect(
         screen.getByRole("button", { name: "navbar.tooltips.markers" })
       ).toBeInTheDocument()
     );
  
     // Simula un clic en el botón
     userEvent.click(
       screen.getByRole("button", { name: "navbar.tooltips.markers" })
     );
  
     // Espera a que la barra lateral se cierre
     await waitFor(() => expect(isSideBarOpen).toBe(false));

      // Simula un clic en el botón
     userEvent.click(
       screen.getByRole("button", { name: "navbar.tooltips.markers" })
     );
  
     // Espera a que la barra lateral se abra
     await waitFor(() => expect(isSideBarOpen).toBe(true));
   });
});


const setActiveFilter = jest.fn();

describe('Filter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render filter buttons with correct icons and labels', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Restaurant}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    const restaurantButton = screen.getByTestId('restaurant-button');
    expect(restaurantButton).toBeInTheDocument();
    expect(restaurantButton.querySelector('svg')).toHaveClass('BiRestaurant');
    expect(restaurantButton.textContent).toBe('Restaurants');

    const hotelButton = screen.getByTestId('hotel-button');
    expect(hotelButton).toBeInTheDocument();
    expect(hotelButton.querySelector('svg')).toHaveClass('MdLocalHotel');
    expect(hotelButton.textContent).toBe('Hotels');

    // Agrega aserciones similares para otros botones de filtro
  });

  test('should call setActiveFilter and toggleSidebar when a filter button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Restaurant}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    const monumentButton = screen.getByTestId('monuments-button');
    fireEvent.click(monumentButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.Monuments);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  test('should reset active filter when clicking on the active filter button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Restaurant}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    const restaurantButton = screen.getByTestId('restaurant-button');
    fireEvent.click(restaurantButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  test('should pass correct props to FilterComponent', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Filter
            activeFilter={Category.Restaurant}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
            className="custom-class"
          />
        </Suspense>
      </I18nextProvider>
    );

    const filterComponent = screen.getByTestId('filter-component');

    expect(filterComponent).toHaveAttribute('activeFilter', Category.Restaurant);
    expect(filterComponent).toHaveAttribute('setActiveFilter', setActiveFilter);
    expect(filterComponent).toHaveAttribute('toggleSidebar', mockToggleSidebar);
    expect(filterComponent).toHaveAttribute('className', 'custom-class');
  });
});