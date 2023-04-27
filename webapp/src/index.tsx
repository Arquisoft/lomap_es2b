import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContext from './context/AppContext';

import './i18n'
import { saveMarkersToPod, saveRoutesToPod } from './helpers/SolidHelper';

ReactDOM.render(
  // <React.StrictMode>
  <AppContext markersSaveFunction={saveMarkersToPod} routesSaveFunction={saveRoutesToPod}>
    <App />
  </AppContext>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
