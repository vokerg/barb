import React from 'react'
import { connect } from 'react-redux'

import RatingList from '../rating'
import ShopServiceList from './ShopServiceList'
import ShopInfo from './ShopInfo'
import GoogleMaps from '../GoogleMaps'
import { getShopById, getCurrentId, getUserId } from '../../reducers'
import { fetchShops, doRedirect, addFavorite } from '../../actions'
import Container from '../container'
import FlatButton from 'material-ui/FlatButton'
import Favorite from '../common/favorite'

const Shop = ({userId, shop, shopId, fetchShops, doRedirect, addFavorite}) => {
  if (shop === undefined) {
    fetchShops('All', '', shopId)
    return <div>Loading...</div>
  }
  const {name, address, description, services, coordinates} = shop
  return(
    <div>
      <Container>
        <ShopInfo name={name} address={address} description={description}/>
        <Favorite
          onFavoriteClick={() => addFavorite(userId, shopId)}
          favorited={shop.favorited === true}
          isShowFavorites={userId !== null}
        />
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
  )
}

const mapStateToPropShop = (state, {match}) => {
  let {shopId} = match.params
  shopId = (shopId !== 'new') ? shopId : getCurrentId(state)
  return {
    shopId,
    shop: getShopById(state, shopId),
    userId: getUserId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: (filter, services, id) => dispatch(fetchShops(filter, services, id)),
    doRedirect: redirectTo => dispatch(doRedirect(redirectTo)),
    addFavorite: (userId, shopId) => {
      dispatch(addFavorite(userId, shopId))
    }
  }
}

export default connect(mapStateToPropShop, mapDispatchToProps)(Shop)
