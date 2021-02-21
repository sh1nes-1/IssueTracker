import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { renderRoutes } from "react-router-config";

import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';

import { BrowserRouter } from 'react-router-dom';
import routes from './config/routes';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>

      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>

    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
