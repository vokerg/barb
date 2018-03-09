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
  const {name, address, description, services, coordinates} = shop

  return(
    ((shopId !== 0) && (shop !== undefined)) ?
    <div>
      <Container>
        <ShopInfo name={name} address={address} description={description}/>
        <FlatButton onClick={() => doRedirect('/shop/book/' + shopId)}>Book time</FlatButton>
        <FlatButton onClick={() => doRedirect('/shop/edit/' + shopId)}>Edit</FlatButton>
        <FlatButton onClick={() => doRedirect('/shop/' + shopId + "/bookings/")}>Bookings</FlatButton>
        <ShopServiceList services={ services } />
        <GoogleMaps markers={[coordinates]}/>
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
