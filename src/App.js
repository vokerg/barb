import React, { Component } from 'react';
import logo from './logo.svg';

import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

const persistedState = {shops: [
  {
    id: "1",
    name: "Shop1",
    address: "Norrebrogade 1",
    favorited: false,
    description: "This is a long description supposed to be displayed on a shop page"
  },
  {
    id: "2",
    name: "Shop2",
    address: "Norrebrogade 2",
    favorited: true,
    description: "This is a long description supposed to be displayed on a shop page"
  },
]};

const shops = (state = [], action) => {
  switch(action.type) {
    case "ADD_FAVORITE": {
      return (state.map(element => {
          if (element.id === action.id) {
            return {
              ...element,
              favorited: !element.favorited
            }
          }
          else {
            return {...element}
          }
        }
      ))}
    default: return state;
  }
}


const ShopList = (props) => {
  return (
    <div>
      {store.getState().shops.map(element=>
          <ShopPreview
            shop={element}
            onFavoriteClick= {
              () => {
                store.dispatch({
                  type: "ADD_FAVORITE",
                  id: element.id
                })
              }
            }
          />
      )}
    </div>
  )
}

const ShopPreview = (props) => {
  return (
      <div>
        <div>
          <Link exact to={ "/shop/" + props.shop.id }>
            { props.shop.name }
          </Link>
        </div>
        <div>{ props.shop.address }</div>
        <button onClick= { props.onFavoriteClick }>{props.shop.favorited ? "Unfavorite" : "Favorite"}</button>
      </div>
  )
};

const store = createStore(combineReducers({shops}), persistedState);


const getShopById = (shop_id) => {
  let shop_found;
  store.getState().shops.forEach(shop => {
    if (shop.id === shop_id) {
      shop_found=shop;
    }
  })
  return shop_found;
};


class Shop extends Component{
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {

    let shop = getShopById(this.props.match.params.shop_id);
    return (
      <div>
        <div>{ shop.name }</div>
        <div>{ shop.address }</div>
        <div>{ shop.description }</div>
      </div>
    )
  }
};


class App extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe (() => {
      this.forceUpdate();
    })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <div>
            <Route exact path="/" component= {ShopList} />
            <Route exact path="/shop/:shop_id" component= {Shop} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

store.dispatch({type:"DO_NOTHING"});
//store.subscribe(App);

export default App;
