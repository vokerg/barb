import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'
import { addRating } from '../../actions'

const mapDispatchToProps = (dispatch, {shopId}) => ({
  onAddRating(author, rating, comment){
    dispatch(addRating(shopId, author, rating, comment))
  }
})

class AddRating extends React.Component {
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRatingClick = () => {
    if (this.addRatingVisibility) {
      this.props.onAddRating(
        this.nameElement.value,
        this.ratingElement.value,
        this.commentElement.value
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
            :null
          }
          <button onClick={ (this.addRatingClick).bind(this)}>
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </button>
          {(this.addRatingVisibility) ?
            <button>
              Cancel
            </button>
            :null
          }
        </div>
      )
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddRating)
