import { useContext } from 'react'
import Login from './pages/LoginPage';
import Map from './pages/MapPage';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState } from 'react';

import { MarkerContext, Types } from './context/MarkersContext';
import { readMarkerFromPod } from './helpers/SolidHelper';


function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();

  const { dispatch } = useContext(MarkerContext)


  session.onLogin(async ()=>{
    setIsLoggedIn(true)
    const aux=readMarkerFromPod(session.info.webId)
    dispatch({ type: Types.SET, payload: { markers: await aux}});
  })

  

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
    // Al cerrar sesion elimina los marcadores del usuario de la memoria
    dispatch({ type: Types.SET, payload: { markers: [] } })
  })

  return (
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <Login/> : <Map/>}
    </SessionProvider>
  );
}

export default App;
