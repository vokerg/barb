import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'

const mapDispatchToProps = (dispatch, {shop_id}) => ({
  onAddRating(author, rating, comment){
    dispatch({
      type: "ADD_RATING",
      shop_id,
      author,
      rating,
      comment
    })
  }
})

class AddRatingView extends React.Component {
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRatingClick = () => {
    if (this.addRatingVisibility) {
      this.props.onAddRating(
        this.nameElement.value,
        this.commentElement.value,
        this.ratingElement.value
      );
    }
    this.addRatingVisibility = !this.addRatingVisibility
    this.forceUpdate()
  }

  render() {
      return (
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
      )
  }
}

const AddRating = connect(() => ({}), mapDispatchToProps)(AddRatingView)
export default AddRating;
