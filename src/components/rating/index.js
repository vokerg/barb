import React from 'react'
import Rating from './Rating'
import AddRating from './AddRating'

const RatingList = (props) => {
    const ratings = props.shop.ratings
    return (
      <div className="card card-outline-secondary my-4">
        <AddRating shopId={props.shop.id}/>
        <div className="card-header">
          Shop Reviews
        </div>
        <div className="card-body">
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
