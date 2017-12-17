import React  from 'react';
import logo from './logo.svg';
//import './App.css';

import './vendor/bootstrap/css/bootstrap.min.css'
import './css/shop-item.css'

import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from './components/mainPage'
import ShopsByService from './components/ShopsByService'
import Shop from './components/shop'
import {persistedState} from './configureStore'
import getConfiguredStore from './configureStore'
import Navigation from './components/Navigation'

import shops from './reducers/shops'


const App = () => {

const reducedState = shops(persistedState.shops, {
  type: "ADD_RATING",
  shop_id: "1",
  author: "Mick Jagger",
  rating: "1",
  comment: "Satisfaction"
})

console.log(reducedState);

  return (
  <div className="App">
    <Provider store= { getConfiguredStore() }>
      <BrowserRouter>
          <div>
            <Navigation />
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
