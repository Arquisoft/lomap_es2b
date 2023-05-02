import { Suspense } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';

import Navbar from '.';
import Loader from '../Loader';
import { SidebarView } from '../../pages/MapPage';
import { UserContext } from '../../context/UserContext';
import { Thing } from '@inrupt/solid-client';

const mockOpenPopup = jest.fn();
const mockToggleSidebar = jest.fn();
const mockToggleNews = jest.fn();
const mockIsSidebarOpen = false;
const mockIsNewsOpen = false;

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
})

const testUser = {
  "type": "Subject",
  "url": "https://adrimr202.solidcommunity.net/profile/card#me",
  "predicates": {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": {
          "namedNodes": [
              "http://schema.org/Person",
              "http://xmlns.com/foaf/0.1/Person"
          ]
      },
      "http://xmlns.com/foaf/0.1/name": {
          "literals": {
              "http://www.w3.org/2001/XMLSchema#string": [
                  "John Doe"
              ]
          }
      },
  }
}

describe('Navbar', () => {
  afterEach(() => {
    mockOpenPopup.mockClear();
  });

  let isSideBarOpen = true;
  let isNewsOpen: boolean = false;

  const toggleSidebar = (open: boolean | undefined) => {
    if (open !== undefined) 
      isSideBarOpen = open;
    else 
      isSideBarOpen = !isSideBarOpen;
  }

  const toggleNews = (open: boolean | undefined) => {
    if (open !== undefined) 
    isNewsOpen = open;
    else 
    isNewsOpen = !isNewsOpen;
  }

  it('should render Navbar component', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <UserContext.Provider value={{ state: testUser as Thing, dispatch: () => {} }}>
            <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
          </UserContext.Provider>
        </Suspense>
      </I18nextProvider>
    );

    await waitFor(() => expect(screen.getByText('LoMap')).toBeInTheDocument())
  });

  it("opens the user menu when clicking on the user avatar", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText("navbar.user.logout")).toBeInTheDocument();
  });

  it("opens the user menu when clicking on the user avatar", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    );
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText("navbar.user.friends")).toBeInTheDocument();
  });

  it("opens the search form when clicking on the search button", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.search" })).toBeInTheDocument())
    fireEvent.click(screen.getByRole("button", { name: "navbar.tooltips.search" }));
  
    // Simula la escritura en el campo de búsqueda
    fireEvent.change(screen.getByPlaceholderText("navbar.search.placeholder"), {target: { value: "Oviedo" },});
  
    expect(screen.getByPlaceholderText("navbar.search.placeholder")).toHaveValue("Oviedo");
  });
  
  it("opens the options menu and the about popup and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
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

  it("opens the options menu and the about popup and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("button", { name: "navbar.tooltips.menu" })).toBeInTheDocument())
    fireEvent.click(screen.getByRole("button", { name: "navbar.tooltips.menu" }));
    expect(screen.getByText("options.title")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'options.config' }))
    expect(screen.getByText('configPopup.title')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button')[0]) // Presses the close button
    expect(screen.getByText('options.title')).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button')[0]) // Presses the close button
  });

  it("opens the about popup from user menu", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByText('navbar.user.about'))
    expect(screen.getByText('aboutPopup.title')).toBeInTheDocument()
  });

  it("click logout from user menu", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByText('navbar.user.logout'))
  });

  it("opens the friends popup from user menu", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar toggleNews={mockToggleNews} sidebarView={SidebarView.MARKERS} toggleSidebar={mockToggleSidebar} isSidebarOpen={mockIsSidebarOpen} openPopup={mockOpenPopup} />
        </Suspense>
      </I18nextProvider>
    )
    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument())
    fireEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByText('navbar.user.friends'))
  });

   it("opens the marker menu and closes it", async () => {
     render(
       <I18nextProvider i18n={i18n}>
         <Suspense fallback={<Loader />}>
           <Navbar
             sidebarView={SidebarView.MARKERS}
             toggleSidebar={toggleSidebar}
             isSidebarOpen={mockIsSidebarOpen}
             openPopup={mockOpenPopup}
             toggleNews={mockToggleNews}
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

   it("opens the routes menu and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar
            sidebarView={SidebarView.ROUTES}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={mockIsSidebarOpen}
            openPopup={mockOpenPopup}
            toggleNews={mockToggleNews}
          />
        </Suspense>
      </I18nextProvider>
    );
   
    // Espera a que el botón esté presente en la pantalla
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "navbar.tooltips.routes" })
      ).toBeInTheDocument()
    );
 
    // Simula un clic en el botón
    fireEvent.click(
      screen.getByRole("button", { name: "navbar.tooltips.routes" })
    );
 
    // Espera a que la barra lateral se cierre
    await waitFor(() => expect(isSideBarOpen).toBe(false));

     // Simula un clic en el botón
     fireEvent.click(
      screen.getByRole("button", { name: "navbar.tooltips.routes" })
    );
 
    // Espera a que la barra lateral se abra
    await waitFor(() => expect(isSideBarOpen).toBe(true));
  });

  it("opens the news menu and closes it", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loader />}>
          <Navbar
            sidebarView={SidebarView.ROUTES}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={mockIsSidebarOpen}
            openPopup={mockOpenPopup}
            toggleNews={toggleNews}
          />
        </Suspense>
      </I18nextProvider>
    );
   
    // Espera a que el botón esté presente en la pantalla
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "navbar.tooltips.news" })
      ).toBeInTheDocument()
    );
 
    // Simula un clic en el botón
    fireEvent.click(
      screen.getByRole("button", { name: "navbar.tooltips.news" })
    );

    await waitFor(() => expect(isNewsOpen).toBe(true));
  });
});