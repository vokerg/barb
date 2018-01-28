import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'
import { addRating } from '../../actions'
import FlatButton from 'material-ui/FlatButton'

const mapDispatchToProps = (dispatch, {shopId}) => ({
  addRating: (author, rating, comment) => dispatch(addRating(shopId, author, rating, comment)),
})

class AddRating extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      rating: "",
      comment: ""
    }
  }
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRatingClick = () => {

    if (this.addRatingVisibility) {
      this.props.addRating(
        this.state.name,
        this.state.rating,
        this.state.comment
      )
    }
    this.addRatingVisibility = !this.addRatingVisibility
    this.forceUpdate()
  }

  onChangeName = (event, value) =>
    this.setState({
      ...this.state,
      name: value
    })

  onChangeComment = (event, value) =>
    this.setState({
      ...this.state,
      comment: value
    })

  onChangeRating = (event, value) =>
    this.setState({
      ...this.state,
      rating: value
    })

  render() {
      return (
        <div>
          {
            (this.addRatingVisibility) ?
              <AddRatingForm
                name={this.state.name}
                comment={this.state.comment}
                rating={this.state.rating}
                onChangeName={this.onChangeName.bind(this)}
                onChangeComment={this.onChangeComment.bind(this)}
                onChangeRating={this.onChangeRating.bind(this)}
              />
            :null
          }
          <FlatButton  onClick={ (this.addRatingClick).bind(this)}>
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </FlatButton>
          {(this.addRatingVisibility) ?
            <FlatButton>Cancel</FlatButton>
            :null
          }
        </div>
      )
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddRating)
