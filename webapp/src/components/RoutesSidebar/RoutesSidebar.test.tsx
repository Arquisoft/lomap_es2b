import { fireEvent, prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Suspense } from 'react';
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Loader from '../Loader';
import RoutesSidebar from ".";

const mockIsSidebarOpen = false;
const mockSetaddRoutes = jest.fn();
const mockOpenPopup = jest.fn();

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
})

describe('SidebarRoutes', () => {
    afterEach(() => {
        mockOpenPopup.mockClear();
    });

    let isSideBarOpen = true;

    const mockRoutes = [
        { id: "1", name: "Ruta 1", description: "Descripción de la ruta 1" },
        { id: "2", name: "Ruta 2", description: "Descripción de la ruta 2" },
        { id: "3", name: "Ruta 3", description: "Descripción de la ruta 3" },
      ];
      
    const toggleSidebar = (open: boolean | undefined) => {
        if (open !== undefined)
            isSideBarOpen = open;
        else
            isSideBarOpen = !isSideBarOpen;
    }

    it("RoutesSidebar show title", async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                    <RoutesSidebar toggleSidebar={toggleSidebar} setAddRoute={mockSetaddRoutes} openPopup={mockOpenPopup} />
                </Suspense>
            </I18nextProvider>
        );
        await waitFor(() => expect(screen.getByText('sidebar.routes.title')).toBeInTheDocument())
    });

    it("RoutesSidebar addroutes button", async () => {
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
});