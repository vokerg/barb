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
    description: "This is a long description supposed to be displayed on a shop page",
    services: [
      "Washing", "Cutting"
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
  console.log(props.route);
  let shops = (props.shops === undefined ? store.getState().shops : props.shops);
  return (
    <div>
      {shops.map(element=>
          <ShopPreview
            key={element.id}
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
          <Link exact="true" to={ "/shop/" + props.shop.id }>
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

const getShopsByService = (service) => {
  return store.getState().shops;
};


class Shop extends Component{
  /*
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  */
  render() {

    let shop = getShopById(this.props.match.params.shop_id);
    return (
      <div>
        <div>
          <div>{ shop.name }</div>
          <div>{ shop.address }</div>
          <div>{ shop.description }</div>
        </div>
        <ShopServiceList services={ shop.services } />
        <RatingList ratings={ shop.ratings } />
      </div>
    )
  }
};

const ShopServiceList = (props) => {
  return (
    <div>
      <div>
        Services:
      </div>
      {
        props.services.map(service =>
          <Link key={service} to={"/service/" + service}> { service + "  "}</Link>
        )}
    </div>
  )
};

const ShopsByService = (props) => {
  return (
    <div>
      <div>
        { props.service }
      </div>
      <ShopList shops={ getShopsByService(props.service) } />
    </div>
  )
}

const RatingList = (props) => {
  return (
    <div>
    <div>
      Ratings:
    </div>
      { props.ratings.map((rating) =>
          <Rating
            key={rating.id}
            rating={rating}
          />
      )}
    </div>
  )
};

const Rating = (props) => {
  const { rating } = props;
  return (
    <div>
      <div>
        <span>Author: { rating.author }</span>
        <span> Rating: { rating.rating }</span>
      </div>
      <div>
        <span>Comment: { rating.comment }</span>
      </div>
    </div>
  )
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
            <Route exact path="/" component= {ShopList} shops={store.getState().shops} />
            <Route exact path="/shop/:shop_id" component= {Shop} />
            <Route exact path="/service/:service" component= {ShopsByService} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

store.dispatch({type:"DO_NOTHING"});
//store.subscribe(App);

export default App;
