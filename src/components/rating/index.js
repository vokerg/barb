import React from 'react'
import Rating from './Rating'

const RatingList = ({ratings}) => {
  return (
    <div class="card card-outline-secondary my-4">
      <div class="card-header">
        Shop Reviews
      </div>
      <div class="card-body">
        {ratings.map((rating) =>
            <Rating
              key={rating.id}
              rating={rating}
            />
        )}
      </div>
    </div>
  )
}

export default RatingList
