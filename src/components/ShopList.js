import React from 'react'
import ShopPreview from './ShopPreview'

const ShopList = ({shops, onFavoriteClick}) => {
  return (
    <div>
      {shops.map(element=>
        <ShopPreview
          key={element.id}
          shop={element}
          onFavoriteClick= { ()=>{onFavoriteClick(element.id)} }
        />
      )}
    </div>
  )
}
export default ShopList
