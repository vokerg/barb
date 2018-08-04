/* global google */
import React from 'react'
import { Marker, InfoWindow } from "react-google-maps"

class ShopMarker extends React.Component {
  state={ isOpen: false }
  handleOpenClick = () => this.setState({ isOpen: true })
  handleCloseClick = () => this.setState({ isOpen: false })
  render() {
    const { marker } = this.props
    console.log(this.state)
    return (
      <Marker
        position={{
          lat: Number(marker.lat),
          lng: Number(marker.lng)
        }}
        onClick={this.handleOpenClick}
        animation= {marker.selected ? google.maps.Animation.BOUNCE : "any"}
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
