import React  from 'react';
import logo from './logo.svg';

import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { withRouter } from 'react-router';
import './App.css';

import shops from './reducers/shops'
import MainPage from './components/mainPage'
import ShopsByService from './components/ShopsByService'
import RatingList from './components/rating'
import Shop from './components/shop'

const persistedState = {shops: [
  {
    id: "1",
    name: "Shop1",
    address: "Norrebrogade 1",
    favorited: false,
    description: "This is a long description supposed to be displayed on a shop page",
    services: [
      "Washing", "Cutting", "Peducure"
    ],
    ratings: [
      {
        id: "1",
        author: "John Lennon",
        rating: "5",
        comment: "Imagine all the people"
      },
      {
        id: "2",
        author: "Paul McCartney",
        rating: "2",
        comment: "I'm not dead"
      },
      {
        id: "3",
        author: "Ringo Starr",
        rating: "1",
        comment: "I'd like to be under the sea"
      }
    ]
  },
  {
    id: "2",
    name: "Shop2",
    address: "Norrebrogade 2",
    favorited: true,
    description: "This is a long description supposed to be displayed on a shop page",
    services: [
      "Shaving", "Washing", "Cutting", "Manicure"
    ],
    ratings: [
      {
        id: "4",
        author: "Elton Jonh",
        rating: "1",
        comment: "Yellow brick wall"
      }
    ],
  },
]};





const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Provider store= { createStore(combineReducers({shops}), persistedState) }>
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
