import React from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'

import ShopMarker from './shopMarker'

const GoogleMaps = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(
  ({ markers, onBoundsChanged, mapRef, marker, onDragEnd, defaultCenter }) =>
      <GoogleMap
        ref={ mapRef }
        defaultZoom={ 11 }
        defaultCenter={ defaultCenter }
        onBoundsChanged={ onBoundsChanged }
      >
        { markers ?
          markers.map((marker, i) =>
            <ShopMarker key={i} marker={marker}/>
         )
        : marker &&
            <ShopMarker marker={ marker } editable onDragEnd={ onDragEnd }/>
        }
      < /GoogleMap>
)

export default GoogleMaps
