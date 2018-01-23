import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import getConfiguredStore from './configureStore'


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store= { getConfiguredStore() }>
    <BrowserRouter>
      <Route path="/" component = {App} />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
