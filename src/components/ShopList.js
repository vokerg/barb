import React from 'react'
import ShopPreview from './ShopPreview'
import GoogleMaps from './GoogleMaps'

const ShopList = ({shops, onFavoriteClick}) => {
  let mapRef
  let mapBoundsChange=false
  return (
    <div>
      <GoogleMaps markers={shops.map(
        shop => shop.coordinates
      )}
      mapRef={map => mapRef = map}
      onBoundsChanged={bounds => {
        if (mapBoundsChange) {
          return
        }
        mapBoundsChange = true
        setTimeout(() => {
          console.log("coordinates from map", mapRef.getBounds())
          mapBoundsChange = false;
        }, 1000)

      }}
      />
      <hr></hr>
      <div>
        {shops.map(element=>
          <ShopPreview
            key={element.id}
            shop={element}
            onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
          />
        )}
      </div>
    </div>
  )
}
export default ShopList
