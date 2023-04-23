import { Suspense } from 'react';
import i18n from 'i18next'
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './App';
import Sidebar from './components/Sidebar';
import { Category } from './types/Category';
import Loader from './components/Loader';
import Filter, { FilterComponent } from './components/Filters';

const mockToggleSidebar = jest.fn();
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
  afterEach(() => {
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

  test('should call setActiveFilter and toggleSidebar when a filter button is clicked', async () => {
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

    await waitFor(() => expect(screen.getByText('markerCategories.monuments')).toBeInTheDocument())

    const monumentButton = screen.getByText('markerCategories.monuments');
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