/* global google */
import React from 'react'
import { Marker, InfoWindow } from "react-google-maps"

class ShopMarker extends React.Component {
  state={ isOpen: false }

  handleOpenClick = () => this.setState({ isOpen: true })
  handleCloseClick = () => this.setState({ isOpen: false })

  onDragEnd = coordinates => this.props.onDragEnd({
      lat: coordinates.latLng.lat(),
      lng: coordinates.latLng.lng()
    })

  render() {
    const { marker, editable } = this.props
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
             <h1>{marker.lat}</h1>
          </InfoWindow>
        }
      </Marker>
    )
  }
}

export default ShopMarker
