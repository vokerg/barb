import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'

import { addRating } from '../../actions'
import AddRatingForm from './addRatingForm'
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
    comment: "",
    selected: 1
  })

  constructor() {
    super()
    this.state = this.clearState()
  }
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  addRating = () => {
    const {name, selected, comment} = this.state
    const userId = this.props.userId || null
    this.props.addRating(userId, name, selected, comment)
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

  onChangeName = (event, name) => this.setState({ name })

  onChangeComment = (event, comment) => this.setState({ comment })

  onRatingHover = selected => this.setState({ selected })

  render() {
    const {name, comment, selected} = this.state
    return (
      <div>
        {
          (this.addRatingVisibility) ?
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
