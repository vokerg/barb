import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import getConfiguredStore from './configureStore'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store= { getConfiguredStore() }>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Route path="/" component = {App} />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
