import React from 'react'
import { connect } from 'react-redux'

import GoogleMaps from '../googleMaps'
import { addFavorite } from '../../actions'
import { isShopsRequested, getUserId } from '../../reducers'
import Shops from './shops'

class ShopList extends React.Component {

  state = {
    selectedShopId: 0,
    bounds: {
      b: { b: 0, f: 0 },
      f: { b: 0, f: 0 }
    },
  }

  filterShops = shop => {
    let {lat, lng} = shop.coordinates
    lat = parseFloat(lat)
    lng = parseFloat(lng)
    const {f, b} = this.state.bounds
    return (!f || !b) || ((lat >= f.b) && (lat <=f.f) && (lng >= b.b) && (lng <= b.f))
  }

  setBoundsState = bounds =>
    this.setState({
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

  onFavoriteClick = userId => shopId => this.props.addFavorite(userId, shopId)
  selectShop = id => this.setState({ selectedShopId: id })
  deSelectShop = () => this.setState({ selectedShopId: 0 })

  render() {
      const { shops, isShopsRequested, userId } = this.props
      let mapRef1
      let mapBoundsChange=false
      let bounds
      return (
        <Shops
          isShowFavorites={ userId!==null }
          onFavoriteClick={ this.onFavoriteClick(userId) }
          isShopsRequested={ isShopsRequested }
          shops={ shops.filter(this.filterShops.bind(this)) }
          onMouseOverShop={ this.selectShop }
          onMouseOut={ this.deSelectShop }
        >
          <GoogleMaps
            markers={shops.map(shop => ({ ...shop.coordinates, selected: shop.id === this.state.selectedShopId }))}
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

const mapStateToProps = state => ({
  isShopsRequested: isShopsRequested(state),
  userId: getUserId(state)
})

const mapDispatchToProps = dispatch => ({
  addFavorite: (userId, shopId) => dispatch(addFavorite(userId, shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)
