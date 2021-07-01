import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import frFR from 'antd/lib/locale/fr_FR';
import './styles/style.css';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={frFR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
