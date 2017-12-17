import React from "react"
import { compose, withProps } from "recompose"
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
    defaultZoom={11}
    defaultCenter={props.markers[0]}
  >
  {props.markers.map(marker => {
    return (
      <Marker key={marker.lat} position={marker} onClick={() => {}} />
    )
  })}
  < /GoogleMap>
)

export default GoogleMaps
