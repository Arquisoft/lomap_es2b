import { Suspense } from 'react';
import i18n from 'i18next'
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { FilterComponent } from '.';
import { Category } from '../../types/Category';
import Loader from '../Loader';



const setActiveFilter = jest.fn();
const mockToggleSidebar = jest.fn();
const mockIsSidebarOpen = false;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})


describe('Filter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter buttons with correct icons and labels', async () => {
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

    await waitFor(() => expect(screen.getByText('markerCategories.restaurants')).toBeInTheDocument());

    const hotelButton = screen.getByText('markerCategories.hotels');
    expect(hotelButton).toBeInTheDocument();

    const MonumentButton = screen.getByText('markerCategories.monuments');
    expect(MonumentButton).toBeInTheDocument();

    const ShoppingButton = screen.getByText('markerCategories.shops');
    expect(ShoppingButton).toBeInTheDocument();

    const BarButton = screen.getByText('markerCategories.bars');
    expect(BarButton).toBeInTheDocument();

    const LandScapesButton = screen.getByText('markerCategories.landscapes');
    expect(LandScapesButton).toBeInTheDocument();

    const OtherButton = screen.getByText('markerCategories.others');
    expect(OtherButton).toBeInTheDocument();
  });

  it('should call setActiveFilter and toggleSidebar when a filter button Monuments is clicked', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Monuments}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.monuments')).toBeInTheDocument());
    const monumentButton = screen.getByText('markerCategories.monuments');
    fireEvent.click(monumentButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter restaurant button', async () => {
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

    await waitFor(() => expect(screen.getByText('markerCategories.restaurants')).toBeInTheDocument());
    const restaurantButton = screen.getByText('markerCategories.restaurants');
    fireEvent.click(restaurantButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter button bar', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Bar}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.bars')).toBeInTheDocument());
    const barButton = screen.getByText('markerCategories.bars');
    fireEvent.click(barButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter button Landscapes', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Landscapes}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.landscapes')).toBeInTheDocument());
    const landscapesButton = screen.getByText('markerCategories.landscapes');
    fireEvent.click(landscapesButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter button hotel', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Hotel}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.hotels')).toBeInTheDocument());
    const hotelButton = screen.getByText('markerCategories.hotels');
    fireEvent.click(hotelButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter button shop', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Shops}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.shops')).toBeInTheDocument());
    const shopButton = screen.getByText('markerCategories.shops');
    fireEvent.click(shopButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });

  it('should reset active filter when clicking on the active filter button others', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <FilterComponent
            activeFilter={Category.Others}
            setActiveFilter={setActiveFilter}
            toggleSidebar={mockToggleSidebar}
          />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('markerCategories.others')).toBeInTheDocument());
    const othersButton = screen.getByText('markerCategories.others');
    fireEvent.click(othersButton);

    expect(setActiveFilter).toHaveBeenCalledWith(Category.All);
    expect(mockToggleSidebar).toHaveBeenCalledWith(true);
  });
});