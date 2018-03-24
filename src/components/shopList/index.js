import React from 'react'
import { connect } from 'react-redux'
import GoogleMaps from '../GoogleMaps'
import { addFavorite } from '../../actions'
import { isShopsRequested, getUserId } from '../../reducers'
import Shops from './shops'

class ShopList extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleShops: [],
      bounds: {
        b: { b: 0, f: 0 },
        f: { b: 0, f: 0 }
      }
    }
  }

  filterShops(shop) {
    let {lat, lng} = shop.coordinates
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    const {f, b} = this.state.bounds
    return (!f || !b) || ((lat >= f.b) && (lat <=f.f) && (lng >= b.b) && (lng <= b.f))
  }

  setBoundsState(bounds) {
    this.setState({
      ...this.state,
      bounds: {
        b: {
          b: bounds.b.b,
          f: bounds.b.f
        },
        f: {
          b: bounds.f.b,
          f: bounds.f.f
        }
      }
    })
  }

  onFavoriteClick = userId => shopId => this.props.addFavorite(userId, shopId)

  render() {
      const {shops, onFavoriteClick, isShopsRequested, userId} = this.props
      let mapRef1
      let mapBoundsChange=false
      let bounds
      return (
        <Shops
          isShowFavorites={ userId!==null }
          onFavoriteClick={ this.onFavoriteClick(userId) }
          isShopsRequested={ isShopsRequested }
          shops={ shops.filter(this.filterShops.bind(this)) }
        >
          <GoogleMaps
            markers={shops.map(shop => shop.coordinates)}
            mapRef={map => mapRef1 = map}
            onBoundsChanged={() => {
              bounds = mapRef1.getBounds()
              if (mapBoundsChange) return
              mapBoundsChange = true
              setTimeout(() => {
                mapBoundsChange = false;
                this.setBoundsState(bounds)
              }, 300)
            }}
          />
        </Shops>
      )
  }
}

const mapStateToProps = (state) => ({
  isShopsRequested: isShopsRequested(state),
  userId: getUserId(state)
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (userId, shopId) => {
    dispatch(addFavorite(userId, shopId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)
