import React from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';
import { IMarker } from "../types/IMarker";
import { RoutesContextProvider } from "./RoutesContext";
import { IRoute } from "../types/IRoute";
import { INews } from "../types/INews";
import { NewsContextProvider } from "./NewsContext";

type ProviderProps =  React.PropsWithChildren<{
  markersSaveFunction: (markers: IMarker[], webId?: string) => void
  routesSaveFunction: (markers: IRoute[], webId?: string) => void
  saveFunctionNews: (newsList: INews[]) => void
}>

const AppContext = ({ children, markersSaveFunction, routesSaveFunction, saveFunctionNews }: ProviderProps) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider saveFunction={markersSaveFunction}>
        <RoutesContextProvider saveFunction={routesSaveFunction}>
          <NewsContextProvider  saveFunction={saveFunctionNews}>
              { children }
          </NewsContextProvider>
        </RoutesContextProvider>
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext