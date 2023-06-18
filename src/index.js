import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// project import
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import store, { persistor } from './redux/store';
import 'simplebar/src/simplebar.css';
import 'assets/fonts/inter/inter.css';
import * as _redux from './redux';
import axios from 'axios';
_redux.setupAxios(axios, store);
// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <BrowserRouter basename="/">
      <App store={store} persistor={persistor} />
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vit als
reportWebVitals();
