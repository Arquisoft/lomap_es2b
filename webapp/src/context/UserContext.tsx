import { Thing } from "@inrupt/solid-client";
import { createContext, Dispatch, useReducer } from "react";
import { Types } from "../types/ContextActionTypes";

type UserActions = {
  type: Types.SET;
  payload: {
      user: Thing | null;
  }
}

export const UserContext = createContext<{state: Thing | null, dispatch: Dispatch<UserActions>}>({ state: null, dispatch: () => null })

export const userReducer = (state:Thing | null, action: UserActions) => {
  switch (action.type) {
    case Types.SET: 
      return action.payload.user

    default:
      return state
  }
}

export const UserContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, null)
  
  return (
    <UserContext.Provider value={{state, dispatch}}>  
      { children }
    </UserContext.Provider>
  )
}