import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ShopList from './ShopList'

const getShopsByService = (shops, service) => shops.filter(
  shop => shop.services.includes(service)
)

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
}

const ShopsByService = withRouter(connect(mapStateToPropService, ()=>({}))(ShopsByServiceView))
export default ShopsByService;
