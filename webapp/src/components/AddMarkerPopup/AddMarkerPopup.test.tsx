import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import Loader from '../Loader'
import i18n from 'i18next'
import AddMarkerPopup from '.'
import { LngLat, LngLatBounds } from 'mapbox-gl'
import userEvent from '@testing-library/user-event'

const mockClose = jest.fn();
const mockAddMark = jest.fn();
i18n.use(initReactI18next).init({
    fallbackLng: 'en',
  })





describe("AddMarker popup", ()=>{

    afterEach(() => {
        mockClose.mockClear();
      });

    const lngLat:LngLat={
        lng: 34.5, lat: 5.3,
        wrap: function (): LngLat {
            throw new Error('Function not implemented.')
        },
        toArray: function (): number[] {
            throw new Error('Function not implemented.')
        },
        distanceTo: function (lngLat: LngLat): number {
            throw new Error('Function not implemented.')
        },
        toBounds: function (radius: number): LngLatBounds {
            throw new Error('Function not implemented.')
        }
    }

    

    it("The popup is displayed", async () =>{
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                    <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument())
    })

    it("Add mark without name", async () =>{
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                    <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument());
        fireEvent.click(screen.getByRole("button", { name: "addMarker.save" }));
        await waitFor(() => expect(screen.getByText('addMarker.name.error')).toBeInTheDocument());
    })

    
    test('Try to write too long a name', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument());
        const name = '0123456789'.repeat(3)
        userEvent.type(screen.getAllByRole("textbox")[0], name)
        // Only first 20 characters should have been written
        expect(screen.getByDisplayValue('0123456789'.repeat(2))).toBeInTheDocument()
    })

    test('Try to write too long a description', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument());
        const description = '0123456789'.repeat(35)
        userEvent.type(screen.getAllByRole("textbox")[1], description)
        // Only first 300 characters should have been written
        expect(screen.getByDisplayValue('0123456789'.repeat(30))).toBeInTheDocument()
    })

    it("Add mark without image", async () =>{
        
        

        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                    <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("addMarker.name.placeholder")).toBeInTheDocument());
        const textName = screen.getAllByRole("textbox")[0];
        fireEvent.change(textName, {target: {value: "Nombre 1"}})
        await waitFor(() => expect(screen.getByText("addMarker.description.placeholder")).toBeInTheDocument());
        const textDescription = screen.getAllByRole("textbox")[1];
        fireEvent.change(textDescription, {target: {value: "Description 1"}})
        fireEvent.click(screen.getByRole("button", { name: "addMarker.save" }));
        await waitFor(() => expect(mockAddMark.mock.calls).toHaveLength(1));
        await waitFor(() => expect(mockAddMark.mock.calls[0][0]).toBe('Nombre 1'));
        await waitFor(() => expect(mockAddMark.mock.calls[0][2]).toBe('Description 1'))
    })

    test('closing should clean the inputs', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Suspense fallback={<Loader />}>
                    <AddMarkerPopup visible={true} lngLat={lngLat} addMark={mockAddMark} closePopup={mockClose} />
                </Suspense>
            </I18nextProvider>
        )

        await waitFor(() => expect(screen.getByText('addMarker.title')).toBeInTheDocument());
        expect(screen.getByText("addMarker.name.placeholder")).toBeInTheDocument();
        const textName = screen.getAllByRole("textbox")[0];
        fireEvent.change(textName, {target: {value: "a good name"}})
        expect(screen.getByText("addMarker.description.placeholder")).toBeInTheDocument();
        const textDescription = screen.getAllByRole("textbox")[1];
        fireEvent.change(textDescription, {target: {value: "a good description"}})
    
        // Close event is triggered
        fireEvent.click(screen.getAllByRole('button')[0])
        expect(screen.queryByText('a good name')).not.toBeInTheDocument()
        expect(screen.queryByText('a good description')).not.toBeInTheDocument()
      })
    

})