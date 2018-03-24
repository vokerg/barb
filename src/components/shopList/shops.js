import React from 'react'
import ShopPreview from './shopPreview'
import Divider from 'material-ui/Divider'

const Shops = ({shops, onFavoriteClick, isShopsRequested, children, isShowFavorites}) => {
  return (
    <div>
      { children }
      <hr></hr>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops
            .map((shop, key)=>
              <div key={ key }>
                <ShopPreview
                  isShowFavorites={ isShowFavorites }
                  shop={ shop }
                  onFavoriteClick= { ()=>{onFavoriteClick(shop.id)} }
                />
                <Divider />
              </div>
            )
          }
        </div>}
    </div>
  )
}

export default Shops
