import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../ShopList'

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
export default MainPage;
