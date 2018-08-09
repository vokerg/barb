/* global google */
import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { connect } from 'react-redux'

import ShopPreview from '../shopList/shopPreview'
import { getShopById } from '../../reducers'

class ShopMarker extends React.Component {
  state={ isOpen: false }

  handleOpenClick = () => this.setState({ isOpen: true })
  handleCloseClick = () => this.setState({ isOpen: false })

  onDragEnd = coordinates => this.props.onDragEnd({
      lat: coordinates.latLng.lat(),
      lng: coordinates.latLng.lng()
    })

  render() {

    const { marker, editable, shop } = this.props
    return (
      <Marker
        position={{
          lat: Number(marker.lat),
          lng: Number(marker.lng)
        }}
        onClick={this.handleOpenClick}
        animation= {(!editable && marker.selected) ? google.maps.Animation.BOUNCE : "any"}
        draggable = {editable}
        onDragEnd={this.onDragEnd}
      >
        {this.state.isOpen &&
          <InfoWindow onCloseClick = {this.handleCloseClick}>
             <ShopPreview shop={ shop } isShowFavorites={ false } onMouseOverShop={ () => {} }/>
          </InfoWindow>
        }
      </Marker>
    )
  }
}

const mapStateToProps = (state, {marker}) => ({
  shop: getShopById(state, marker.shopId)
})

export default connect(mapStateToProps, () => ({}))(ShopMarker)
