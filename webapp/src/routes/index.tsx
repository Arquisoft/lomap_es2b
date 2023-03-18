import {BrowserRouter, Routes, Route} from 'react-router-dom'

import About from '../pages/About';
import Login from '../pages/LoginPage';

export function MyRoutes(){
    return (<BrowserRouter>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/about' element={<About />} />
    </Routes>
    </BrowserRouter>
    );
}