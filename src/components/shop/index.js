import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import RatingList from '../rating'
import ShopServiceList from './ShopServiceList'
import ShopInfo from './ShopInfo'

const getShopById = (shops, shop_id) => {
  let shop_found;
  shops.forEach(shop => {
    if (shop.id === shop_id) {
      shop_found=shop
    }
  })
  return shop_found
}

const Shop = ({shop}) => {
  return(
    <div className="container">
      <div className="col-lg-9">
        <div className="card mt-4">
          <div className="card-body">
            <ShopInfo name={shop.name} address={shop.address} description={shop.description}/>
            <ShopServiceList services={ shop.services } />
          </div>
        </div>
        <RatingList shop={ shop } />
      </div>
    </div>
    )
}

const mapStateToPropShop = ({shops}, {match}) => {
  const shop_id = match.params.shop_id
  return {
    shop: getShopById(shops, shop_id)
  }
}
export default withRouter(connect(mapStateToPropShop, ()=>({}))(Shop))
