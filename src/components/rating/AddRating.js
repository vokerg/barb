import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'
import { addRating } from '../../actions'
import FlatButton from 'material-ui/FlatButton'
import { getUserId } from '../../reducers'

const mapStateToProps = state => ({
  userId: getUserId(state)
})

const mapDispatchToProps = (dispatch, {shopId}) => ({
  addRating: (userId, author, rating, comment) => dispatch(addRating(userId, shopId, author, rating, comment))
})

class AddRating extends React.Component {

  clearState = () => ({
    name: "",
    rating: "",
    comment: ""
  })

  constructor() {
    super()
    this.state = this.clearState()
  }
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRating = () => {
    const {name, rating, comment} = this.state
    const userId = this.props.userId || null
    this.props.addRating(userId, name, rating, comment)
    this.setState(this.clearState())
  }

  cancelRatingClick = () => {
    this.addRatingVisibility = false
    this.setState(this.clearState())
  }

  addRatingClick = () => {
    if (this.addRatingVisibility) {
      this.addRating()
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
                isNameVisible={this.props.userId === null}
                onChangeName={this.onChangeName.bind(this)}
                onChangeComment={this.onChangeComment.bind(this)}
                onChangeRating={this.onChangeRating.bind(this)}
              />
            :null
          }
          <FlatButton onClick={ (this.addRatingClick).bind(this)}>
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </FlatButton>
          {(this.addRatingVisibility) ?
            <FlatButton onClick={ (this.cancelRatingClick).bind(this) }>Cancel</FlatButton>
            :null
          }
        </div>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRating)
