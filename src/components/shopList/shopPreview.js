import React from 'react'
import { Link } from 'react-router-dom'

const ShopPreview = ({shop, onFavoriteClick, isShowFavorites}) => {
  return (
      <div>
        <div>
          <Link exact="true" to={ "/shop/" + shop.id }>
            { shop.name }
          </Link>
        </div>
        <div>{ shop.address }</div>
        {isShowFavorites ?
          <div>
            <button onClick= { onFavoriteClick }>{shop.favorited===true ? "Unfavorite" : "Favorite"}</button>
          </div>
          :
          <div />
        }

      </div>
  )
}

export default ShopPreview
