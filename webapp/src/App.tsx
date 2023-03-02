import Login from './pages/LoginPage';
import Map from './pages/MapPage';
import { SessionProvider, useSession } from '@inrupt/solid-ui-react';
import { useState } from 'react';
import {
  handleIncomingRedirect, 
  onSessionRestore
} from "@inrupt/solid-client-authn-browser";



function App(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session } = useSession();



  session.onLogin(()=>{
    setIsLoggedIn(true)
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
  })

  return (
    // <SessionProvider sessionId="log-in-example">
    //   {(!isLoggedIn) ? <Login/> : <Map/>}
    // </SessionProvider>
    <Map />
  );
}

export default App;
