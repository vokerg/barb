import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

const ShopFullView = ({shop}) => {
  console.log(shop.services);
  return(
      <div>
        <ShopInfo name={shop.name} address={shop.address} description={shop.description}/>
        <ShopServiceList services={ shop.services } />
        <RatingList ratings={ shop.ratings } />
      </div>
    )
}

const mapStateToPropShop = ({shops}, {match}) => {
  const shop_id = match.params.shop_id
  return {
    shop: getShopById(shops, shop_id)
  }
}
const Shop = withRouter(connect(mapStateToPropShop, ()=>({}))(ShopFullView))

export default Shop
