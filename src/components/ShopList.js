import React from 'react'
import ShopPreview from './ShopPreview'
import GoogleMaps from './GoogleMaps'

const ShopList = ({shops, onFavoriteClick}) => {
  let mapRef
  return (
    <div>
      <GoogleMaps markers={shops.map(
        shop => shop.coordinates
      )}
      onBoundsChanged={bounds => console.log("coordinates from map", mapRef.getBounds())}
      mapRef={map => mapRef = map}/>
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
