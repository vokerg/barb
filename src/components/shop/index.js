import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RatingList from '../rating'
import ShopServiceList from './ShopServiceList'
import ShopInfo from './ShopInfo'
import GoogleMaps from '../GoogleMaps'
import { getShopById, getCurrentId } from '../../reducers'
import { fetchShops } from '../../actions'
import Container from '../container'

const Shop = ({shop, shopId, fetchShops}) => {
  if (shop === undefined) {
    fetchShops('All', '', shopId)
  }

  return(
    ((shopId !== 0) && (shop !== undefined)) ?
    <div>
      <Container>
        <ShopInfo name={shop.name} address={shop.address} description={shop.description}/>
        <Link exact="true" to={ "/shop/edit/" + shop.id }>Edit</Link>
        <ShopServiceList services={ shop.services } />
        <GoogleMaps markers={[shop.coordinates]}/>
      </Container>
      <Container>
        <RatingList shop={ shop } />
      </Container>
    </div>
  : <div>Loading...</div>
  )
}

const mapStateToPropShop = (state, {match}) => {
  let {shopId} = match.params
  shopId = (shopId !== 'new') ? shopId : getCurrentId(state)
  return {
    shopId,
    shop: getShopById(state, shopId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: (filter, services, id) => dispatch(fetchShops(filter, services, id))
  }
}

export default connect(mapStateToPropShop, mapDispatchToProps)(Shop)
