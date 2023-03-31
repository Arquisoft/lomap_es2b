import { useContext } from 'react'
import Login from './pages/LoginPage';
import Map from './pages/MapPage';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState } from 'react';

import { MarkerContext } from './context/MarkersContext';
import { getProfile, readMarkerFromPod } from './helpers/SolidHelper';
import { Types } from './types/ContextActionTypes';
import { UserContext } from './context/UserContext';

function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();

  const { dispatch: markersDispatch } = useContext(MarkerContext)
  const { dispatch: userDispatch } = useContext(UserContext)

  session.onLogin(async () => {
    setIsLoggedIn(true)
    const profile = await getProfile(session.info.webId || '')
    userDispatch({ type: Types.SET, payload: { user: profile }});
    const markers = await readMarkerFromPod(session.info.webId)
    markersDispatch({ type: Types.SET, payload: { markers }});
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
    // Al cerrar sesion elimina los marcadores del usuario de la memoria
    markersDispatch({ type: Types.SET, payload: { markers: [] } })
  })

  return (
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <Login/> : <Map/>}
    </SessionProvider>
  );
}

export default App;
