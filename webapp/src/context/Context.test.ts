import { Category } from "../types/Category"
import { IMarker } from "../types/IMarker"
import { Types } from "../types/ContextActionTypes"
import { markerReducer } from "./MarkersContext"

describe('Marker reducer', () => {
  
  let markers: IMarker[]

  beforeEach(() => {
    markers = [
      { id: '1',name: 'marker1', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
      { id: '2',name: 'marker2', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
      { id: '3',name: 'marker3', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } },
    ]
  })

  it('tries to set a list of markers', () => {
    const state = markerReducer([], { type: Types.SET, payload: { markers } })
    expect(state).toEqual(state)
  })

  test('given a list of markers, add a new marker', () => {
    const state = markerReducer(markers, { type: Types.ADD, payload: { marker: { id: '4',name: 'marker4', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } } } })

    expect(state.length).toBe(4)
  })
  
  test('given a list of markers, delete a marker', () => {
    const state = markerReducer(markers, { type: Types.DELETE, payload: { id: '1' } })

    expect(state.length).toBe(2)
  })
  
  test('given a list of markers, update a marker', () => {
    const state = markerReducer(markers, { type: Types.UPDATE, payload: { id: '1', marker: { description: 'a description' } } })
    expect(state.find(m => m.id === '1')?.description).toBe('a description')
  })
  
  test('given a list of markers, delete a marker', () => {
    const state = markerReducer(markers, { type: Types.DELETE, payload: { id: '1' } })
    expect(state.length).toBe(2)
  })

})