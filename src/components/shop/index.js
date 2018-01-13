import React from 'react'
import { connect } from 'react-redux'

import RatingList from '../rating'
import ShopServiceList from './ShopServiceList'
import ShopInfo from './ShopInfo'
import GoogleMaps from '../GoogleMaps'
import { getShopById, getCurrentId } from '../../reducers'
import { Link } from 'react-router-dom'

const Shop = ({shop, shopId}) => {
  return(
    <div className="container">
      {(shopId !== 0) ?
      <div className="col-lg-9">
          <div className="card mt-4">
            <div className="card-body">
              <ShopInfo name={shop.name} address={shop.address} description={shop.description}/>
              <Link exact="true" to={ "/shop/edit/" + shop.id }>Edit</Link>
              <ShopServiceList services={ shop.services } />
              <GoogleMaps markers={[shop.coordinates]}/>
            </div>
          </div>
          <RatingList shop={ shop } />
      </div>
      : <div>Loading...</div>
    }
    </div>

  )
}

const mapStateToPropShop = (state, {match}) => {
  let shopId = match.params.shopId
  shopId = (shopId !== 'new') ? shopId : getCurrentId(state)
  return {
    shopId,
    shop: getShopById(state, shopId)
  }
}
export default connect(mapStateToPropShop, ()=>({}))(Shop)
