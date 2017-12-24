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

const App = () => {
/*
const reducedState = shops(persistedState.shops, {
  type: "ADD_RATING",
  shop_id: "1",
  author: "Mick Jagger",
  rating: "1",
  comment: "Satisfaction"
})

console.log(reducedState);
*/
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
            <Route exact path="/shop/edit/:filter" component= {EditShop} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
