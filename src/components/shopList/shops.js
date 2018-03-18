import React from 'react'
import ShopPreview from '../ShopPreview'

const Shops = ({shops, onFavoriteClick, isShopsRequested, children}) => {
  return (
    <div>
      { children }
      <hr></hr>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops
            .map((shop, key)=>
              <ShopPreview
                key={key}
                shop={shop}
                onFavoriteClick= { ()=>{onFavoriteClick(shop.id)} }
              />
            )
          }
        </div>}
    </div>
  )
}

export default Shops
