import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import IconButton from '@material-ui/core/IconButton';
import BookIcon from '@material-ui/icons/Book';

import RatingList from '../rating'
import ShopServiceList from './shopServiceList'
import ShopInfo from './shopInfo'
import GoogleMaps from '../googleMaps'
import { getShopById, getCurrentId, getUserId, isModerateShop } from '../../reducers'
import { fetchShops, doRedirect, addFavorite, loadRatings } from '../../actions'
import Favorite from '../common/favorite'

class Shop extends React.Component {
  componentWillMount() {
    const {shopId, shop, fetchShops, loadRatings} = this.props
    if (shop === undefined) {
      fetchShops(shopId)
    } else {
      loadRatings(shopId)
    }
  }
  render() {
    const {userId, shop, shopId, doRedirect, addFavorite, moderator} = this.props
    if (shop === undefined) {
      return <div>Loading...</div>
    }
    const {name, address, description, services, coordinates} = shop
    const authorized = userId !== null
    return(
      <div>
        <div style={{display: 'inline-block', width:"50%", height: "90vh", overflowY:"auto", verticalAlign:"top"}}>
          <ShopInfo name={name} address={address} description={description}/>
          <ShopServiceList services={ services } />
          <Favorite
            onFavoriteClick={() => addFavorite(userId, shopId)}
            favorited={shop.favorited === true}
            isShowFavorites={authorized}
          />
          {authorized &&
            <IconButton aria-label="Book" onClick={() => doRedirect('/shop/book/' + shopId)}>
              <BookIcon />
            </IconButton>
          }
          {moderator && <FlatButton onClick={() => doRedirect('/shop/edit/' + shopId)}>Edit</FlatButton>}
          {moderator && <FlatButton onClick={() => doRedirect('/shop/' + shopId + "/bookings/")}>Bookings</FlatButton>}
          <div>
            <div style={{ height:'400px' }}>
              <GoogleMaps markers={[ coordinates ]}/>
            </div>
          </div>
        </div>
        <div style={{display: 'inline-block', width:"50%", height: "90vh", overflowY:"auto", verticalAlign:"top"}}>
          <RatingList shop={ shop } />
        </div>
      </div>
    )
  }
}

const mapStateToPropShop = (state, {match}) => {
  let {shopId} = match.params
  shopId = (shopId !== 'new') ? shopId : getCurrentId(state)
  return {
    shopId,
    shop: getShopById(state, shopId),
    userId: getUserId(state),
    moderator: isModerateShop(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchShops: id => dispatch(fetchShops('All', '', id)),
    doRedirect: redirectTo => dispatch(doRedirect(redirectTo)),
    loadRatings: shopId => dispatch(loadRatings(shopId)),
    addFavorite: (userId, shopId) => {
      dispatch(addFavorite(userId, shopId))
    }
  }
}

export default connect(mapStateToPropShop, mapDispatchToProps)(Shop)
