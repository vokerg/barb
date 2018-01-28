import React from 'react'
import { connect } from 'react-redux'

import RatingList from '../rating'
import ShopServiceList from './ShopServiceList'
import ShopInfo from './ShopInfo'
import GoogleMaps from '../GoogleMaps'
import { getShopById, getCurrentId } from '../../reducers'
import { fetchShops, doRedirect } from '../../actions'
import Container from '../container'
import FlatButton from 'material-ui/FlatButton'

const Shop = ({shop, shopId, fetchShops, doRedirect}) => {
  if (shop === undefined) {
    fetchShops('All', '', shopId)
  }

  return(
    ((shopId !== 0) && (shop !== undefined)) ?
    <div>
      <Container>
        <ShopInfo name={shop.name} address={shop.address} description={shop.description}/>
        <FlatButton onClick={() => doRedirect('/shop/book/' + shop.id)}>Book time</FlatButton>
        <FlatButton onClick={() => doRedirect('/shop/edit/' + shop.id)}>Edit</FlatButton>
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
    fetchShops: (filter, services, id) => dispatch(fetchShops(filter, services, id)),
    doRedirect: redirectTo => dispatch(doRedirect(redirectTo))
  }
}

export default connect(mapStateToPropShop, mapDispatchToProps)(Shop)
