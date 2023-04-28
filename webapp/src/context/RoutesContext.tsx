import { Dispatch, createContext, useContext, useEffect, useReducer, useRef, useState } from "react"
import { Types } from "../types/ContextActionTypes"
import { IRoute } from "../types/IRoute"
import { useSession } from "@inrupt/solid-ui-react"
import { MarkerContext } from "./MarkersContext"



type RouteActions = {
  type: Types.ADD
  payload: {
      route: IRoute
  }
} | {
  type: Types.SET
  payload: {
      routes: IRoute[]
  }
} | {
  type: Types.ADD_ALL
  payload: {
      routes: IRoute[]
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
      route: any
  }
} | {
  type: Types.UDPATE_ALL
  payload: {
      id: string
      route: any
  }[]
}

export const RoutesContext = createContext<{ state: IRoute[], dispatch: Dispatch<RouteActions> }>({state: [], dispatch: () => null})

export const markerReducer = (state:IRoute[], action: RouteActions) : IRoute[] => {
  switch (action.type) {
    case Types.SET: 
      return action.payload.routes

    case Types.ADD:
      return [action.payload.route, ...state]

    case Types.ADD_ALL:
      return [...state, ...action.payload.routes]

    case Types.UPDATE:
      let route = state.find(m => m.id === action.payload.id)
      if (route) {
        route = { ...route, ...action.payload.route }
        const newState = [...state.filter(m => m.id !== action.payload.id), route as IRoute]
        return newState
      } else {
        return state
      }

    case Types.UDPATE_ALL:
      const updateRoutes: IRoute[] = []
      for (let u of action.payload) {
        let route = state.find(r => r.id === u.id)
        if (route) {
          route = { ...route, ...u.route }
          updateRoutes.push(route as IRoute)
        }
      }
      if (updateRoutes.length === 0)
        return state
      else
        return [...state.filter(r => !updateRoutes.some(ru => ru.id === r.id)), ...updateRoutes]

    case Types.DELETE:
      return state.filter(m => m.id !== action.payload.id)

    default:
      return state
  }
}

type ProviderProps =  React.PropsWithChildren<{
  saveFunction: (markers: IRoute[], webId?: string) => void
}>

export const RoutesContextProvider = ({ children, saveFunction }: ProviderProps) => {
  const { session } = useSession()
  const [state, dispatch] = useReducer(markerReducer, [])
  const [ loaded, setLoaded ] = useState(false)
  const stateRef = useRef(state);
  
  const { state: markers } = useContext(MarkerContext)
  const markersRef = useRef(markers)
  
  useEffect(() => {
    const hasChanged = markers.length < markersRef.current.length
    if (hasChanged) {
      const deletedMarkers = markersRef.current.filter(m1 => !markers.some(m2 => m1.id === m2.id))
      const routesToUpdate = state.filter(r => deletedMarkers.some(m1 => r.points.map(m => m.id).includes(m1.id)))
      routesToUpdate.forEach(r => {
        r.points = r.points.filter(m => !deletedMarkers.map(m => m.id).includes(m.id))
      })
      dispatch({ type: Types.UDPATE_ALL, payload: routesToUpdate.map(r => ({ id: r.id, route: { points: r.points } })) })
    }
    markersRef.current = markers
  }, [markers, state])

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
    <RoutesContext.Provider value={{state, dispatch}}>
      { children }
    </RoutesContext.Provider>
  )
}