import React from 'react'
import ShopPreview from './shopPreview'
import Divider from 'material-ui/Divider'

const Shops = ({shops, onFavoriteClick, isShopsRequested, children, isShowFavorites, onMouseOverShop}) => {
  return (
    <div>
    <div style={{display: 'inline-block', borderStyle: 'solid', verticalAlign:"top"}}>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops
            .map((shop, key)=>
              <div key={ key }>
                <ShopPreview onMouseOverShop={ onMouseOverShop }
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
      <div style={{display: 'inline-block', width:"75%", verticalAlign:"top"}}>
        { children }
      </div>
    </div>
  )
}

export default Shops
