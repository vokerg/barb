import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

import { addRating } from '../../actions'
import AddRatingForm from './addRatingForm'
import { getUserId, isShopRatedByCurrentUser } from '../../reducers'

class AddRating extends React.Component {

  clearState = () => this.setState({
    name: "",
    comment: "",
    selected: 1,
    addRatingVisibility: false,
  })

  constructor() {
    super()
    this.clearState()
  }

  addRating = () => {
    const {name, selected, comment} = this.state
    const userId = this.props.userId || null
    this.props.addRating(userId, name, selected, comment)
    this.clearState()
  }

  cancelRatingClick = () => this.clearState()

  addRatingClick = () => {
    const {addRatingVisibility} = this.state
    if (addRatingVisibility) {
      this.addRating()
    }
    this.setState({addRatingVisibility: !addRatingVisibility})
    this.forceUpdate()
  }

  onChangeName = (event, name) => this.setState({ name })

  onChangeComment = (event, comment) => this.setState({ comment })

  onRatingHover = selected => this.setState({ selected })

  render() {
    const {name, comment, selected, addRatingVisibility} = this.state
    const {isShopRated} = this.props
    return (
      (!isShopRated) &&
      <div>
        {
          addRatingVisibility &&
          <AddRatingForm
            name={ name }
            comment={ comment }
            isNameVisible={this.props.userId === null}
            onChangeName={this.onChangeName.bind(this)}
            onChangeComment={this.onChangeComment.bind(this)}
            selected={ selected }
            totalStars={5}
            onRatingHover={this.onRatingHover.bind(this)}
          />
        }
        <FlatButton onClick={ (this.addRatingClick).bind(this)}>
          { (addRatingVisibility) ? "Post review" : "Add review" }
        </FlatButton>
        {
          addRatingVisibility &&
          <FlatButton onClick={ (this.cancelRatingClick).bind(this) }>Cancel</FlatButton>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, {shopId}) => ({
  userId: getUserId(state),
  isShopRated: isShopRatedByCurrentUser(state, shopId),
})

const mapDispatchToProps = (dispatch, {shopId}) => ({
  addRating: (userId, author, rating, comment) => dispatch(addRating(userId, shopId, author, rating, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRating)
