import { Suspense } from 'react';
import i18n from 'i18next'


import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './App';
import Sidebar from './components/Sidebar';
import { Category } from './types/Category';
import Navbar from './components/NavBar';
import Loader from './components/Loader';

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
    mockToggleSidebar.mockClear();
    mockOpenPopup.mockClear();
  });

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
});
