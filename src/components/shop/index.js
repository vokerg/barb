import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
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
    const { shopId, shop, fetchShops, loadRatings } = this.props
    if (shop) {
      loadRatings(shopId)
    } else {
      fetchShops(shopId)
    }
  }

  redirect = redirectTo => () => this.props.doRedirect(redirectTo)

  render() {
    const { userId, shop, shopId, addFavorite, moderator, fetchShops } = this.props
    if (shop === undefined) {
      fetchShops(shopId)
      return <div>Loading...</div>
    }
    const { services, coordinates, favorited } = shop
    const authorized = userId !== null
    return(
      <div>
        <div style={{display: 'inline-block', width:"50%", height: "90vh", overflowY:"auto", verticalAlign:"top"}}>
          <ShopInfo shop={ shop }/>
          <ShopServiceList services={ services } />
          <Favorite
            onFavoriteClick={() => addFavorite(userId, shopId)}
            favorited={ favorited }
            isShowFavorites={ authorized }
          />
          {authorized &&
            <IconButton aria-label="Book" onClick={ this.redirect(`/shop/book/${shopId}`) }>
              <BookIcon />
            </IconButton>
          }
          {moderator && <Button onClick={ this.redirect(`/shop/edit/${shopId}`) }>Edit</Button>}
          {moderator && <Button onClick={ this.redirect(`/shop/${shopId}/bookings/`) }>Bookings</Button>}
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
  let { shopId } = match.params
  if (shopId === 'new') {
    shopId = getCurrentId(state)
    if (shopId === 0) {
      return {}
    }
  }
  return {
    shopId,
    shop: getShopById(state, shopId),
    userId: getUserId(state),
    moderator: isModerateShop(state)
  }
}

const mapDispatchToProps = dispatch => ({
  fetchShops: id => dispatch(fetchShops('All', '', id)),
  doRedirect: redirectTo => dispatch(doRedirect(redirectTo)),
  loadRatings: shopId => dispatch(loadRatings(shopId)),
  addFavorite: (userId, shopId) => dispatch(addFavorite(userId, shopId))
})

export default connect(mapStateToPropShop, mapDispatchToProps)(Shop)
