import React  from 'react';
//import './App.css';

import './vendor/bootstrap/css/bootstrap.min.css'
import './css/shop-item.css'

import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import MainPage from './components/mainPage'
import ShopsByService from './components/ShopsByService'
import EditShop from './components/editShop'
import Shop from './components/shop'
import getConfiguredStore from './configureStore'
import Navigation from './components/Navigation'

import request from 'superagent'

const App = () => {
console.log("in the app")

request
  .get('/shops/')
//  .set('Access-Control-Allow-Credentials', 'false')
//  .set('Access-Control-Allow-Origin': 'http://localhost:8000/shops')
  .end((err, res) => {
    console.log(res)
  })


  return (
  <div className="App">
    <Provider store= { getConfiguredStore() }>
      <BrowserRouter>
          <div>
            <Navigation />
            <Route exact path="/" component= {MainPage} />
            <Route exact path="/createshop" component= {EditShop} />
            <Route exact path="/shop/:shopId" component= {Shop} />
            <Route exact path="/service/:service" component= {ShopsByService} />
            <Route path="/filter/:filter" component= {MainPage} />
            <Route exact path="/shop/edit/:id" component= {EditShop} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
