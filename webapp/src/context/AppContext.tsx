import React from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';
import { IMarker } from "../types/IMarker";
import { RoutesContextProvider } from "./RoutesContext";
import { IRoute } from "../types/IRoute";

type ProviderProps =  React.PropsWithChildren<{
  markersSaveFunction: (markers: IMarker[], webId?: string) => void
  routesSaveFunction: (markers: IRoute[], webId?: string) => void
}>

const AppContext = ({ children, markersSaveFunction, routesSaveFunction }: ProviderProps) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider saveFunction={markersSaveFunction}>
        <RoutesContextProvider saveFunction={routesSaveFunction}>
          { children }
        </RoutesContextProvider>
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext