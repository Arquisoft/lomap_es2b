import React, { FC } from "react";

import { MarkerContextProvider } from './MarkersContext';
import { UserContextProvider } from './UserContext';

const AppContext: FC = ({ children }) => {
  return (
    <UserContextProvider>
      <MarkerContextProvider>
        { children }
      </MarkerContextProvider>
    </UserContextProvider>
  )
}

export default AppContext