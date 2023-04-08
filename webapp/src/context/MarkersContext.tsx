import { createContext, Dispatch, useReducer } from "react";
import { Types } from "../types/ContextActionTypes";
import { IMarker } from '../types/IMarker';


type MarkerActions = {
  type: Types.ADD
  payload: {
      marker: IMarker
  }
} | {
  type: Types.SET
  payload: {
      markers: IMarker[]
  }
} | {
  type: Types.DELETE
  payload: {
      name: string
  }
} | {
  type: Types.UPDATE
  payload: {
      id: number
      marker: any
  }
}

export const MarkerContext = createContext<{ state: IMarker[], dispatch: Dispatch<MarkerActions> }>({state: [], dispatch: () => null})

export const markerReducer = (state:IMarker[], action: MarkerActions) : IMarker[] => {
  switch (action.type) {
    case Types.SET: 
      return action.payload.markers

    case Types.ADD:
      return [action.payload.marker, ...state]

    case Types.UPDATE:
      const index: number = state.findIndex(m => m.id === action.payload.id)
      state[index] = { ...state[index], ...action.payload.marker}
      // console.log('updating', state[index])
      return state

    case Types.DELETE:
      return state.filter(m => m.name !== action.payload.name)

    default:
      return state
  }
}

export const MarkerContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(markerReducer, [])

  

  return (
    <MarkerContext.Provider value={{state, dispatch}}>  
      { children }
    </MarkerContext.Provider>
  )
}