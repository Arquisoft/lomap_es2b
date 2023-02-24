import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import { Map } from './pages/Map';


function App(): JSX.Element {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Map/>} />
    //     <Route path='/welcome' element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
    <Login/>
  );
}

export default App;
