import React from 'react'
import ShopPreview from './shopPreview'
import Divider from 'material-ui/Divider'

const Shops = ({shops, onFavoriteClick, isShopsRequested, children, isShowFavorites, onMouseOverShop, onMouseOut}) => {
  return (
    <div>
    <div style={{display: 'inline-block', width:"25%", height: "50vh", overflowY:"auto", verticalAlign:"top"}}>
      {isShopsRequested ? <div>Loading...</div>:
        <div>
          {shops
            .map((shop, key)=>
              <div key={ key }>
                <ShopPreview
                  onMouseOverShop={ onMouseOverShop }
                  onMouseOut={ onMouseOut }
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
      <div style={{display: 'inline-block', width:"75%", height: "80vh", verticalAlign:"top"}}>
        { children }
      </div>
    </div>
  )
}

export default Shops
