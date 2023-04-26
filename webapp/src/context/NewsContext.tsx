import { createContext, Dispatch, useEffect, useReducer, useState, useRef } from "react";
import { Types } from "../types/ContextActionTypes";
import { INews } from '../types/INews';
import { saveNewsToLomap } from "../helpers/SolidHelper";
// import { useSession } from "@inrupt/solid-ui-react";


type NewsActions = {
  type: Types.ADD
  payload: {
      news: INews
  }
} | {
  type: Types.SET
  payload: {
      newsList: INews[]
  }
} 

export const NewsContext = createContext<{ state: INews[], dispatch: Dispatch<NewsActions> }>({state: [], dispatch: () => null})

export const newsReducer = (state:INews[], action: NewsActions) : INews[] => {
  switch (action.type) {
    case Types.SET: 
      return action.payload.newsList

    case Types.ADD:
      return [action.payload.news, ...state]

    default:
      return state
  }
}

export const NewsContextProvider: React.FC = ({ children }) => {
  // const { session } = useSession()
  
  const [state, dispatch] = useReducer(newsReducer, [])
  const stateRef = useRef(state);

  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    if(loaded){
      const hasChanged = state.length !== stateRef.current.length || state.some((item, index) => item !== stateRef.current[index]);
      if (hasChanged) {
        saveNewsToLomap(state)
      }
  
      // Update the reference to the original array
      stateRef.current = state;
    }else{
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]) 

  return (
    <NewsContext.Provider value={{state, dispatch}}>
      { children }
    </NewsContext.Provider>
  )
}