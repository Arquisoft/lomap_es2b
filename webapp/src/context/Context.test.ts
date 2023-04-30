import { Category } from "../types/Category"
import { IMarker } from "../types/IMarker"
import { Types } from "../types/ContextActionTypes"
import { markerReducer } from "./MarkersContext"
import { routeReducer } from "./RoutesContext"
import { INews } from "../types/INews"
import { newsReducer } from "./NewsContext"
import { IRoute } from "../types/IRoute"

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
    expect(state).toEqual(markers)
  })

  test('given a list of markers, add a new marker', () => {
    const state = markerReducer(markers, { type: Types.ADD, payload: { marker: { id: '4',name: 'marker4', lat: 1, lng: 1, images: [], date: new Date(), comments: [] , category: Category.Others, property: { owns: true, public: false } } } })

    expect(state.length).toBe(4)
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

describe('RoutesReducer', () => {

  let routes: IRoute[]

  beforeEach(() => {
    routes = [
      { id: '1',name: 'marker1', created_at: new Date(), points: [] },
      { id: '2',name: 'marker2', created_at: new Date(), points: [] },
      { id: '3',name: 'marker3', created_at: new Date(), points: [] },
    ]
  })

  it('tries to set a list of markers', () => {
    const state = routeReducer([], { type: Types.SET, payload: { routes } })
    expect(state).toEqual(routes)
  })

  test('given a list of markers, add a new route', () => {
    const state = routeReducer(routes, { type: Types.ADD, payload: { route: { id: '4',name: 'marker4', created_at: new Date(), points: [] } } })
    expect(state.length).toBe(4)
  })
  
  test('given a list of markers, delete a route', () => {
    const state = routeReducer(routes, { type: Types.DELETE, payload: { id: '1' } })
    expect(state.length).toBe(2)
  })
  
  test('given a list of markers, update a route', () => {
    const state = routeReducer(routes, { type: Types.UPDATE, payload: { id: '1', route: { description: 'a description' } } })
    expect(state.find(m => m.id === '1')?.description).toBe('a description')
  })
  
  test('given a list of markers, update list of routes', () => {
    const state = routeReducer(routes, { type: Types.UDPATE_ALL, payload: [ { id: '1', route: { description: 'a description 1' } }, { id: '2', route: { description: 'a description 2' } } ] })
    expect(state.find(m => m.id === '1')?.description).toBe('a description 1')
    expect(state.find(m => m.id === '2')?.description).toBe('a description 2')
  })

})
 
describe('News reducer', () => {
  
  let newsList: INews[]

  beforeEach(() => {
    newsList = [
      { id: '1',text: 'news1', author: 'prueba1' },
      { id: '2',text: 'news2', author: 'prueba2' },
      { id: '3',text: 'news3', author: 'prueba3' },
    ]
  })

  it('tries to set a list of news', () => {
    const state = newsReducer([], { type: Types.SET, payload: { newsList } })
    expect(state).toEqual(state)
  })

  test('given a list of news, add a new news', () => {
    const state = newsReducer(newsList, { type: Types.ADD, payload: { news: {  id: '4',text: 'news4', author: 'prueba4' } } })

    expect(state.length).toBe(4)
  })
  

})