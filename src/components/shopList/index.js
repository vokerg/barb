import React from 'react'
import { connect } from 'react-redux'
import { geolocated } from 'react-geolocated'

import GoogleMaps from '../googleMaps'
import { isShopsRequested, getUserId } from '../../reducers'
import { getDefaultCoordinates } from '../../utils'
import Shops from './shops'

class ShopList extends React.Component {

  state = {
    selectedShopId: 0,
    bounds: {
      b: { b: 0, f: 0 },
      f: { b: 0, f: 0 }
    },
    tryLocation: true
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
            b: bounds.j.j,
            f: bounds.j.l
          },
          f: {
            b: bounds.l.j,
            f: bounds.l.l
          }
        }
      })


  selectShop = id => this.setState({ selectedShopId: id })
  deSelectShop = () => this.setState({ selectedShopId: 0 })
  onBoundsChanged = () => {
    let bounds = this.mapRef.getBounds()
    setTimeout(() => this.setBoundsState(bounds), 100)
  }

  componentWillReceiveProps({ isGeolocationAvailable, isGeolocationEnabled, coords }) {
    if (this.state.tryLocation) {
      if (!isGeolocationAvailable || !isGeolocationEnabled) {
        this.setState({ tryLocation: false })
      } else {
        if (coords) {
          this.setState({ tryLocation: false })
        }
      }
    }
  }

  render() {
      const { shops, isShopsRequested, userId, coords } = this.props
      const defaultCenter = coords ? {lat: coords.latitude, lng: coords.longitude} : getDefaultCoordinates()

      return (
        !this.state.tryLocation &&
        <Shops
          isShowFavorites={ userId!==null }
          isShopsRequested={ isShopsRequested }
          shops={ shops.filter(this.filterShops) }
          onMouseOverShop={ this.selectShop }
          onMouseOut={ this.deSelectShop }
        >
          <GoogleMaps
            markers={shops.map(shop => ({ ...shop.coordinates, shopId: shop.id, selected: shop.id === this.state.selectedShopId }))}
            mapRef={map => this.mapRef = map}
            onBoundsChanged={ this.onBoundsChanged }
            defaultCenter={defaultCenter}
          />
        </Shops>
      )
  }
}

const mapStateToProps = state => ({
  isShopsRequested: isShopsRequested(state),
  userId: getUserId(state)
})

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(connect(mapStateToProps, () => ({}))(ShopList))
