import React from 'react'
import Rating from './Rating'
import AddRating from './AddRating'

const RatingList = (props) => {
    const ratings = props.shop.ratings
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
        <AddRating shop_id={props.shop.id}/>
      </div>
    )
}

export default RatingList
