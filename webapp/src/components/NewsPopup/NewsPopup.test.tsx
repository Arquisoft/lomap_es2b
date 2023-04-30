import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Loader from '../Loader'
import i18n from 'i18next'
import { NewsContext } from '../../context/NewsContext'
import NewsPopup from '.'
import { INews } from '../../types/INews'
import AddNewsPopup from './AddNewsPopup'

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
  })

const mockToggleNews = jest.fn();
const mockAddNew = jest.fn();
const mockClose = jest.fn();

  describe("News popup", () =>{

    afterEach(() => {
        mockClose.mockClear();
        mockAddNew.mockClear();
      });

    it("The popup without news", async ()=>{

        render(
            <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader />}>
                <NewsPopup toggleNews={ mockToggleNews} isNewsOpen={true} ></NewsPopup>
            </Suspense>
        </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('news.title')).toBeInTheDocument())
        await waitFor(() => expect(screen.getByText('news.noNews')).toBeInTheDocument())
    })

    it("The popup without news", async ()=>{
        const pruebaNews:INews[]=[{id:"1",text:"prueba1",author:"autor1S"},
        {id:"1",text:"prueba1",author:"autor1S"},
        {id:"1",text:"prueba1",author:"autor1S"},
        {id:"1",text:"prueba1",author:"autor1S"},
        {id:"1",text:"pruecsdddddddccddcsdcsdcrgtehryhtegfwefcrthgyreeargtraergeargerfba1",author:"autor1S"}]
        render(
            <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader />}>
                <NewsContext.Provider  value={{ state: pruebaNews, dispatch: () => {} }}>
                     <NewsPopup toggleNews={ mockToggleNews} isNewsOpen={true} ></NewsPopup>
                </NewsContext.Provider>    
            </Suspense>
        </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('news.title')).toBeInTheDocument());
        await waitFor(() => expect(screen.getAllByText('prueba1')[0]).toBeInTheDocument());
    })

    it("Add new", async ()=>{

        render(
            <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader />}>
                <AddNewsPopup onClose={mockClose} addNew={mockAddNew}></AddNewsPopup>
            </Suspense>
        </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('news.addNew.title')).toBeInTheDocument())
        const text = screen.getAllByRole("textbox")[0];
        fireEvent.change(text, {target: {value: "Texto 1"}})
        fireEvent.click(screen.getByRole("button", { name: "news.addButton" }));
        await waitFor(() => expect(mockAddNew.mock.calls).toHaveLength(1));
        await waitFor(() => expect(mockAddNew.mock.calls[0][0]).toBe('Texto 1'));
    })

    it("Add new without text", async ()=>{

        render(
            <I18nextProvider i18n={i18n}>
            <Suspense fallback={<Loader />}>
                <AddNewsPopup onClose={mockClose} addNew={mockAddNew}></AddNewsPopup>
            </Suspense>
        </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('news.addNew.title')).toBeInTheDocument())
        fireEvent.click(screen.getByRole("button", { name: "news.addButton" }));
        await waitFor(() => expect(screen.getByText('news.addNew.error')).toBeInTheDocument())
    })

  })
