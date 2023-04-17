import React from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';
import { IMarker } from "../types/IMarker";

type ProviderProps =  React.PropsWithChildren<{
  saveFunction: (markers: IMarker[], webId?: string) => void
}>

const AppContext = ({ children, saveFunction }: ProviderProps) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider saveFunction={saveFunction}>
        { children }
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext