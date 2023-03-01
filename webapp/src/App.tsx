import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { Map } from './pages/Map'
import { useSession } from '@inrupt/solid-ui-react';


function App() : JSX.Element {

  const { session } = useSession()
  console.log(session.info)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ session.info.isLoggedIn ? <Map /> : <Navigate to="/welcome" /> } />
        <Route path='/welcome' element={ session.info.isLoggedIn ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
