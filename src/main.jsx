import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App.jsx';
import store from './store/index.js';
import { Provider } from 'react-redux';
// 样式
import './styles/reset.css';
import './styles/global.less';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>
);
