import React from 'react'
import ShopPreview from './ShopPreview'
import GoogleMaps from './GoogleMaps'

const ShopList = ({shops, onFavoriteClick, isShopsRequested}) => {
  let mapRef1
  let mapBoundsChange=false
  return (
    <div>
      <GoogleMaps markers={shops.map(
        shop => shop.coordinates
      )}
      mapRef={map => mapRef1 = map}
      onBoundsChanged={() => {
        if (mapBoundsChange) {
          return
        }
        mapBoundsChange = true
        let bounds = mapRef1.getBounds()
        setTimeout(() => {
          mapBoundsChange = false;
          if (mapRef1 !== null) {
            console.log("coordinates from map", bounds)
          }
        }, 1000)

      }}
      />
      <hr></hr>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops.map(element=>
            <ShopPreview
              key={element.id}
              shop={element}
              onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
            />
          )}
        </div>
      }
    </div>
  )
}
export default ShopList
