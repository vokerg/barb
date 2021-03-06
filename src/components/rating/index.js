import React from 'react'
import Rating from './rating'
import AddRating from './addRating'

const RatingList = (props) => {
    const {ratings} = props.shop
    return (
      <div className="card card-outline-secondary my-4">
        <AddRating shopId={props.shop.id}/>
        <div className="card-header">
          Shop Reviews
        </div>
        <div className="card-body">
          {ratings.map((rating, i) =>
              <Rating key={i} rating={rating} />
          )}
        </div>
      </div>
    )
}

export default RatingList
