import { Suspense, useContext, useEffect } from 'react'
import Login from './pages/LoginPage';
import Map from './pages/MapPage';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState } from 'react';

import { MarkerContext } from './context/MarkersContext';
import { getProfile, readMarkersFromPod, readNewsFromLoMap, readRoutesFromPod } from './helpers/SolidHelper';
import { Types } from './types/ContextActionTypes';
import { UserContext } from './context/UserContext';
import Loader from './components/Loader';
import { NewsContext } from './context/NewsContext';
import { RoutesContext } from './context/RoutesContext';

function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();
  
  const { dispatch: markersDispatch } = useContext(MarkerContext)
  const { dispatch: userDispatch } = useContext(UserContext)
  const { dispatch: newsDispatch } = useContext(NewsContext)
  const { dispatch: routesDispatch } = useContext(RoutesContext)

  // It only adds the events listeners once, preventing memory leaks
  useEffect(() => {
    // We have logged in
    session.onLogin(() => {
      setIsLoggedIn(true)
      getProfile(session.info.webId || '').then(profile => userDispatch({ type: Types.SET, payload: { user: profile }}))
      readMarkersFromPod(session.info.webId).then(markersList => markersDispatch({ type: Types.SET, payload: { markers: markersList }}))
      readNewsFromLoMap().then(newsList => newsDispatch({ type: Types.SET, payload: { newsList }}))
      readRoutesFromPod(session.info.webId).then(routesList => routesDispatch({ type: Types.SET, payload: { routes: routesList }}))
    })

    session.onSessionRestore(() => {
      setIsLoggedIn(true)
      getProfile(session.info.webId || '').then(profile => userDispatch({ type: Types.SET, payload: { user: profile }}))
      readMarkersFromPod(session.info.webId).then(markersList => markersDispatch({ type: Types.SET, payload: { markers: markersList }}))
      readNewsFromLoMap().then(newsList => newsDispatch({ type: Types.SET, payload: { newsList }}))
      readRoutesFromPod(session.info.webId).then(routesList => routesDispatch({ type: Types.SET, payload: { routes: routesList }}))
    })

    // We have logged out
    session.onLogout(()=>{
      setIsLoggedIn(false)
      // Al cerrar sesion elimina los marcadores del usuario de la memoria
      markersDispatch({ type: Types.SET, payload: { markers: [] } })
      newsDispatch({ type: Types.SET, payload: { newsList: [] } })
      routesDispatch({ type: Types.SET, payload: { routes: [] } })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SessionProvider sessionId="log-in-example" restorePreviousSession={true}>
      <Suspense fallback={<Loader />}>
        {(!isLoggedIn) ? <Login/> : <Map/>}
      </Suspense>
    </SessionProvider>
  );
}

export default App;
