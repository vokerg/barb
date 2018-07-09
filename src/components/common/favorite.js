import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';

const Favorite = ({isShowFavorites, favorited, onFavoriteClick}) => {
  return (
    isShowFavorites &&
      <IconButton onClick= { onFavoriteClick }>
        {favorited===true ?
          <FavoriteIcon/> :
          <FavoriteBorder/>
        }
      </IconButton>
  )
}

export default Favorite
