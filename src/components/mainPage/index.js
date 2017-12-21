import React from 'react'
import { connect }  from 'react-redux'
import Filter from './Filter'
import ShopList from '../ShopList'
import { getShopsByFilter } from '../../reducers'

const MainPage = ({shops, onFavoriteClick}) => {
  return (
    <div className="container">
      <div className="col-lg-9">
        <div className="card mt-4">
          <div className="card-body">
            <Filter />
            <ShopList shops={shops} onFavoriteClick={onFavoriteClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter;
  const returnShops = getShopsByFilter(state, filter)
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
