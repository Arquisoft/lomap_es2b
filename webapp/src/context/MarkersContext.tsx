import React, { createContext, Dispatch, useEffect, useReducer, useState, useRef } from "react";
import { Types } from "../types/ContextActionTypes";
import { IMarker } from '../types/IMarker';
import { useSession } from "@inrupt/solid-ui-react";


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
  type: Types.ADD_ALL
  payload: {
      markers: IMarker[]
  }
} | {
  type: Types.DELETE
  payload: {
      id: string
  }
} | {
  type: Types.UPDATE
  payload: {
      id: string
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

    case Types.ADD_ALL:
      return [...state, ...action.payload.markers]

    case Types.UPDATE:
      let marker = state.find(m => m.id === action.payload.id)
      if (marker) {
        marker = { ...marker, ...action.payload.marker }
        const newState = [...state.filter(m => m.id !== action.payload.id), marker as IMarker]
        return newState
      } else {
        return state
      }

    case Types.DELETE:
      return state.filter(m => m.id !== action.payload.id)

    default:
      return state
  }
}

type ProviderProps =  React.PropsWithChildren<{
  saveFunction: (markers: IMarker[], webId?: string) => void
}>

export const MarkerContextProvider = ({ children, saveFunction }: ProviderProps) => {
  const { session } = useSession()
  
  const [state, dispatch] = useReducer(markerReducer, [])
  const stateRef = useRef(state);

  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    if(loaded){
      const hasChanged = state.length !== stateRef.current.length || state.some((item, index) => item !== stateRef.current[index]);
      if (hasChanged) {
        saveFunction(state, session.info.webId)
      }
  
      // Update the reference to the original array
      stateRef.current = state;
    }else{
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]) 

  return (
    <MarkerContext.Provider value={{state, dispatch}}>
      { children }
    </MarkerContext.Provider>
  )
}