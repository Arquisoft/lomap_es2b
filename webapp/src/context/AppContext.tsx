import React from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';
import { IMarker } from "../types/IMarker";
import { NewsContextProvider } from "./NewsContext";
import { INews } from "../types/INews";

type ProviderProps =  React.PropsWithChildren<{
  saveFunction: (markers: IMarker[], webId?: string) => void,
  saveFunctionNews: (newsList: INews[]) => void,
}>

const AppContext = ({ children, saveFunction,saveFunctionNews }: ProviderProps) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider saveFunction={saveFunction}>
        <NewsContextProvider  saveFunction={saveFunctionNews}>
            { children }
        </NewsContextProvider>
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext