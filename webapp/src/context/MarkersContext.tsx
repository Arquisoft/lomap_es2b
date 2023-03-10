import { createContext, Dispatch, useReducer } from "react";
import { Marker } from '../types/Marker';

export enum Types {
  ADD = 'ADD_MARKER',
  SET = 'SET_MARKERS',
  DELETE = 'DELETE_MARKER',
}

type MarkerActions = {
  type: Types.ADD;
  payload: {
      marker: Marker;
  };
} | {
  type: Types.SET;
  payload: {
      markers: Marker[];
  };
} | {
  type: Types.DELETE;
  payload: {
      name: string;
  };
}

export const MarkerContext = createContext<{ state: Marker[], dispatch: Dispatch<MarkerActions> }>({state: [], dispatch: () => null})

export const markerReducer = (state:Marker[], action: MarkerActions) : Marker[] => {
  switch (action.type) {
    case Types.SET: 
      return action.payload.markers

    case Types.ADD:
      return [action.payload.marker, ...state]

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