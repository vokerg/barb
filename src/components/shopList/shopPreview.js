import React from 'react'
import { Link } from 'react-router-dom'
import Favorite from '../common/favorite'

const ShopPreview = ({shop, onFavoriteClick, isShowFavorites, onMouseOverShop}) => {
  return (
      <div onMouseOver={() => onMouseOverShop(shop.id)}>
        <div>
          <Link exact="true" to={ "/shop/" + shop.id }>
            { shop.name }
          </Link>
          <Favorite
            onFavoriteClick={onFavoriteClick}
            favorited={shop.favorited}
            isShowFavorites={isShowFavorites}
          />
        </div>
        <div>{ shop.address }</div>
      </div>
  )
}

export default ShopPreview
