import React from 'react'
import ShopPreview from './shopPreview'

const Shops = ({shops, onFavoriteClick, isShopsRequested, children, isShowFavorites}) => {
  return (
    <div>
      { children }
      <hr></hr>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops
            .map((shop, key)=>
              <ShopPreview
                isShowFavorites={ isShowFavorites }
                key={ key }
                shop={ shop }
                onFavoriteClick= { ()=>{onFavoriteClick(shop.id)} }
              />
            )
          }
        </div>}
    </div>
  )
}

export default Shops
