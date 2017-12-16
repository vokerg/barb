import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ShopList from './ShopList'

const getShopsByService = (shops, service) => shops.filter(
  shop => shop.services.includes(service)
)

const ShopsByServiceView = ({service, shops, onFavoriteClick}) => {
  return (
    <div>
      <div>
        { service }
      </div>
      <ShopList shops={ shops } onFavoriteClick={ onFavoriteClick } />
    </div>
  )
}

const mapStateToProp = ({shops}, {match}) => {
  const service = match.params.service;
  return {
    service,
    shops: getShopsByService(shops, service)
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

const ShopsByService = withRouter(connect(mapStateToProp, mapDispatchToProps)(ShopsByServiceView))
export default ShopsByService
