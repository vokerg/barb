import React from 'react'
import { Link } from 'react-router-dom'

const ShopPreview = ({shop, onFavoriteClick}) => {
  return (
      <div>
        <div>
          <Link exact="true" to={ "/shop/" + shop.id }>
            { shop.name }
          </Link>
        </div>
        <div>{ shop.address }</div>
        <button onClick= { onFavoriteClick }>{shop.favorited ? "Unfavorite" : "Favorite"}</button>
      </div>
  )
}

export default ShopPreview
