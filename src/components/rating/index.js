import React from 'react'
import Rating from './Rating'

const RatingList = ({ratings}) => {
  return (
    <div>
    <div>
      Ratings:
    </div>
      {ratings.map((rating) =>
          <Rating
            key={rating.id}
            rating={rating}
          />
      )}
    </div>
  )
}

export default RatingList
