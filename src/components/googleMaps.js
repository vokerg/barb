/* global google */
import React from "react"
import { compose, withProps, } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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
  <GoogleMap
    ref={props.mapRef}
    defaultZoom={11}
    defaultCenter={{lat: 55.718035, lng: 12.470284}}
    onBoundsChanged={props.onBoundsChanged}
  >
  {props.markers !== undefined ?
    props.markers.map((marker, i) => {
      return (
        <Marker
          key={i}
          position={{
            lat: Number(marker.lat),
            lng: Number(marker.lng)
          }}
          onClick={() => {}}
          animation= {(marker.selected) ? google.maps.Animation.BOUNCE : "any"}
        />
      )
    })
  : (props.marker !== undefined) ?
    <Marker
      onDragEnd={
        coordinates => props.onDragEnd({
          lat: coordinates.latLng.lat(),
          lng: coordinates.latLng.lng()
        })
      }
      position={{
        lat: Number(props.marker.lat),
        lng: Number(props.marker.lng)
      }}
      draggable
    />
    : <div></div>
  }
  < /GoogleMap>
)

export default GoogleMaps
