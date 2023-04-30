import { Category } from "../types/Category"
import { IMarker } from "../types/IMarker"
import { Types } from "../types/ContextActionTypes"
import { markerReducer } from "./MarkersContext"
import { INews } from "../types/INews"
import { newsReducer } from "./NewsContext"
import { userReducer } from "./UserContext"
import { Thing } from "@inrupt/solid-client"
import { experimentalStyled } from "@mui/material"

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

describe("User reducer",()=>{
  const newState:Thing= { url:"Url prueba" } as Thing

  it("set a user thing",() =>{
    const state = userReducer(null,{type: Types.SET, payload:{user:newState} })

    expect(state).toEqual(newState)
  })
})