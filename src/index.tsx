import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { App } from './App';
import { store } from './store';
import './styles/index.scss';

const socket = io('localhost:7777');

socket.on('message', function (msg: any) {
  console.log('message', JSON.stringify(msg, null, 2));
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
