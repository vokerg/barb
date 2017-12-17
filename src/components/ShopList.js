import React from 'react'
import ShopPreview from './ShopPreview'
import GoogleMaps from './GoogleMaps'

const ShopList = ({shops, onFavoriteClick}) => {
  return (
    <div>
      <div>
        {shops.map(element=>
          <ShopPreview
            key={element.id}
            shop={element}
            onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
          />
        )}
      </div>
      <hr></hr>
      <GoogleMaps markers={shops.map(
        shop => shop.coordinates
      )}/>
    </div>
  )
}
export default ShopList
