import React  from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from './components/mainPage'
import ShopsByService from './components/ShopsByService'
import Shop from './components/shop'
import getConfiguredStore from './configureStore'






const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Provider store= { getConfiguredStore() }>
        <BrowserRouter>
          <div>
            <Route exact path="/" component= {MainPage} />
            <Route exact path="/shop/:shop_id" component= {Shop} />
            <Route exact path="/service/:service" component= {ShopsByService} />
            <Route path="/filter/:filter" component= {MainPage} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
