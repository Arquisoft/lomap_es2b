import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Loader from '../Loader'
import i18n from 'i18next'
import MarkersSidebar from '.'
import { Category } from '../../types/Category'
import { MarkerContent } from './Styles'
import { MarkerContext } from '../../context/MarkersContext'
import { IMarker } from '../../types/IMarker'
import { SessionContext } from '@inrupt/solid-ui-react'
import { ISessionContext } from '@inrupt/solid-ui-react/dist/src/context/sessionContext'

const mockToggleSideBar = jest.fn();
const mockSetSelectedCategory = jest.fn();
const mockDispach = jest.fn();

const pruebaMarkers:IMarker[] = [
    { id: '1',name: 'marker1', lat: 1, lng: 1,description:"Description 1",images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
    { id: '2',name: 'marker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
    { id: '3',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
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
        //await waitFor(() => expect(mockToggleSideBar.mock.calls[0][0]).toBe(true));
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


})
