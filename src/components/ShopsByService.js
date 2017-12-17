import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ShopList from './ShopList'

const getShopsByService = (shops, service) => shops.filter(
  shop => shop.services.includes(service)
)

const ShopsByService = ({service, shops, onFavoriteClick}) => {
  return (
    <div className="container">
      <div className="col-lg-9">
        <div className="card mt-4">
          <div className="card-body">
            <div>
              { service }
            </div>
            <ShopList shops={ shops } onFavoriteClick={ onFavoriteClick } />
          </div>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(ShopsByService))
