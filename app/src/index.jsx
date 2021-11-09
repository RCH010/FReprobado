import React from 'react';
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ColorModeScript } from '@chakra-ui/react'
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme/theme';

render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
