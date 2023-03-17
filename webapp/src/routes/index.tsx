import {BrowserRouter, Routes, Route} from 'react-router-dom'

import About from '../pages/About';

export function MyRoutes(){
    return (<BrowserRouter>
    <Routes>
        <Route path='/about' element={<About />} />
    </Routes>
    </BrowserRouter>
    );
}