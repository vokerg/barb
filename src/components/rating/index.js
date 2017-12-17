import React from 'react'
import Rating from './Rating'
import AddRatingForm from './AddRatingForm'


class RatingList extends React.Component {
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRatingClick = () => {
    if (this.addRatingVisibility) {
      console.log(this.nameElement.value)
      console.log(this.commentElement.value)
      console.log(this.ratingElement.value)
    }
    this.addRatingVisibility = !this.addRatingVisibility
    this.forceUpdate()
  }

  render() {
    const ratings = this.props.ratings
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
        <div>
          {
            (this.addRatingVisibility) ?
              <AddRatingForm
                nameRef={el => this.nameElement = el}
                commentRef={el => this.commentElement = el}
                ratingRef={el => this.ratingElement = el}
              />
            :
              null
          }
          <button
            onClick={ (this.addRatingClick).bind(this)}
          >
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </button>
        </div>
      </div>
    )
  }
}
export default RatingList
