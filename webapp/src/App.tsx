import { useContext } from 'react'
import Login from './pages/LoginPage';
import Map from './pages/MapPage';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState } from 'react';
import {
  handleIncomingRedirect, 
  onSessionRestore
} from "@inrupt/solid-client-authn-browser";
import { MarkerContext, Types } from './context/MarkersContext';



function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();

  const { dispatch } = useContext(MarkerContext)

  session.onLogin(()=>{
    setIsLoggedIn(true)
    //TODO Cargar los marcadores desde solid y guardarlos usando
    // dispatch({ type: Types.SET, payload: { markers: <Array de marcadores> } })
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
    // Al cerrar sesion elimina los marcadores del usuario de la memoria
    dispatch({ type: Types.SET, payload: { markers: [] } })
  })

  return (
    // <SessionProvider sessionId="log-in-example">
    //   {(!isLoggedIn) ? <Login/> : <Map/>}
    // </SessionProvider>
    <Map />
  );
}

export default App;
