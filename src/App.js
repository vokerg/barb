import React  from 'react';
import logo from './logo.svg';

import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { withRouter } from 'react-router';
import './App.css';

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

const getShopsByFilter = (shops, filter = "all") => {
  switch (filter) {
    case "favorites": {
      return shops.filter(shop => shop.favorited);
    }
    case "all":
    default: {
      return shops;
    }
  }
}

const Filter = () => {
  return (
    <div>
      <span><h5>
        <Link to="/">
          All
        </Link>
        {"    "}
        <Link to="/filter/favorites">
          Favorites
        </Link>
      </h5></span>
    </div>
  )
}

const MainPageView = ({shops, onFavoriteClick}) => {
  return (
    <div>
      <Filter />
      <ShopList shops={shops} onFavoriteClick={onFavoriteClick} />
    </div>
  )
}
const mapStateToProps = ({shops}, {match}) => {
  const filter = match.params.filter;
  const returnShops = getShopsByFilter(shops, filter)
  return {
    shops: returnShops
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFavoriteClick: (id) => {
      dispatch({
        type: "ADD_FAVORITE",
        id: id
      })
    }
  }
}
const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageView);

const ShopList = ({shops, onFavoriteClick}) => {
  return (
    <div>
      {shops.map(element=>
        <ShopPreview
          key={element.id}
          shop={element}
          onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
        />
      )}
    </div>
  )
}

const ShopPreview = ({shop, onFavoriteClick}) => {
  return (
      <div>
        <div>
          <Link exact="true" to={ "/shop/" + shop.id }>
            { shop.name }
          </Link>
        </div>
        <div>{ shop.address }</div>
        <button onClick= { onFavoriteClick }>{shop.favorited ? "Unfavorite" : "Favorite"}</button>
      </div>
  )
};

const getShopById = (shops, shop_id) => {
  let shop_found;
  shops.forEach(shop => {
    if (shop.id === shop_id) {
      shop_found=shop;
    }
  })
  return shop_found;
};

const getShopsByService = (shops, service) => shops.filter(
  shop => shop.services.includes(service)
);

const SingleShop = (props) => {
  return (
    <div>
      <h2>{ props.name }</h2>
      <h3>{ props.address }</h3>
      <h4>{ props.description }</h4>
    </div>
  )
};
const ShopView = ({shop}) => {
  return(
      <div>
        <SingleShop name={shop.name} address={shop.address} description={shop.description}/>
        <ShopServiceList services={ shop.services } />
        <RatingList ratings={ shop.ratings } />
      </div>
    );
};
const mapStateToPropShop = ({shops}, {match}) => {
  const shop_id = match.params.shop_id
  return {
    shop: getShopById(shops, shop_id)
  }
}
const Shop = withRouter(connect(mapStateToPropShop, ()=>({}))(ShopView));

const ShopServiceList = ({services}) => {
  return (
    <div>
      <div>
        Services:
      </div>
      {
        services.map(service =>
          <Link key={service} to={"/service/" + service}> { service + "  "}</Link>)
      }
    </div>
  )
};

const ShopsByServiceView = ({service, shops}) => {
  return (
    <div>
      <div>
        { service }
      </div>
      <ShopList shops={ shops } />
    </div>
  )
}
const mapStateToPropService = ({shops}, {match}) => {
  const service = match.params.service;
  return {
    service,
    shops: getShopsByService(shops, service)
  }
};
const ShopsByService = withRouter(connect(mapStateToPropService, ()=>({}))(ShopsByServiceView));

const RatingList = ({ratings}) => {
  return (
    <div>
    <div>
      Ratings:
    </div>
      { ratings.map((rating) =>
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

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <Provider store= {createStore(combineReducers({shops}), persistedState)}>
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
