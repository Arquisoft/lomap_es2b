import React from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';
import { IMarker } from "../types/IMarker";
import { RoutesContextProvider } from "./RoutesContext";

type ProviderProps =  React.PropsWithChildren<{
  saveFunction: (markers: IMarker[], webId?: string) => void
}>

const AppContext = ({ children, saveFunction }: ProviderProps) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider saveFunction={saveFunction}>
        <RoutesContextProvider saveFunction={(routes) => {}}>
          { children }
        </RoutesContextProvider>
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext