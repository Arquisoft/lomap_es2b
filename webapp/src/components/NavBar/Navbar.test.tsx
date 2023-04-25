import { Suspense } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';

import Navbar from '.';
import Loader from '../Loader';
import { SidebarView } from '../../pages/MapPage';

const mockOpenPopup = jest.fn();
const mockToggleSidebar = jest.fn();
const mockIsSidebarOpen = false;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

describe('Navbar', () => {
  afterEach(() => {
    mockOpenPopup.mockClear();
  });

  let isSideBarOpen = true;

  const toggleSidebar = (open: boolean | undefined) => {
    if (open !== undefined) 
      isSideBarOpen = open;
    else 
      isSideBarOpen = !isSideBarOpen;
  }

  it('should render Navbar component', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('LoMap')).toBeInTheDocument())
  });

  it("opens the user menu when clicking on the user avatar", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText("navbar.user.logout")).toBeInTheDocument();
  });

  it("opens the search form when clicking on the search button", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.search" })).toBeInTheDocument())
    fireEvent.click(screen.getByRole("button", { name: "navbar.tooltips.search" }));
    expect(screen.getByPlaceholderText("navbar.search.placeholder")).toBeInTheDocument();
  });
  
  it("opens the options menu and the about popup and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.menu" })).toBeInTheDocument())
    fireEvent.click(screen.getByRole("button", { name: "navbar.tooltips.menu" }));
    expect(screen.getByText("options.title")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'options.about' }))
    expect(screen.getByText('aboutPopup.title')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button')[0]) // Presses the close button
    expect(screen.getByText('options.title')).toBeInTheDocument()
  });

  it("opens the about popup from user menu", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByText('navbar.user.about'))
    expect(screen.getByText('aboutPopup.title')).toBeInTheDocument()
  });

   it("opens the options menu and the about popup and closes it", async () => {
     render(
       <I18nextProvider i18n={i18n}>
         <Suspense fallback={<Loader />}>
           <Navbar
             sidebarView={SidebarView.MARKERS}
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
     fireEvent.click(
       screen.getByRole("button", { name: "navbar.tooltips.markers" })
     );
  
     // Espera a que la barra lateral se cierre
     await waitFor(() => expect(isSideBarOpen).toBe(false));

      // Simula un clic en el botón
      fireEvent.click(
       screen.getByRole("button", { name: "navbar.tooltips.markers" })
     );
  
     // Espera a que la barra lateral se abra
     await waitFor(() => expect(isSideBarOpen).toBe(true));
   });
});