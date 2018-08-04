import React from "react"
import { compose, withProps, } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import ShopMarker from './shopMarker'

const GoogleMaps = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBt1T8DbzVsxQ9kpsXLeNvkSR9SOHZoxDU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
{
  const { markers, onBoundsChanged, mapRef, marker } = props;
  return (
    <GoogleMap
      ref={ mapRef }
      defaultZoom={11}
      defaultCenter={{lat: 55.718035, lng: 12.470284}}
      onBoundsChanged={ onBoundsChanged }
    >
    {markers !== undefined ?
      markers.map((marker, i) =>
        <ShopMarker key={i} marker={marker}/>
     )
    : (marker !== undefined) ?
      <Marker
        onDragEnd={
          coordinates => props.onDragEnd({
            lat: coordinates.latLng.lat(),
            lng: coordinates.latLng.lng()
          })
        }
        position={{
          lat: Number(marker.lat),
          lng: Number(marker.lng)
        }}
        draggable
      />
      : <div></div>
    }
    < /GoogleMap>
  )
}

)

export default GoogleMaps
