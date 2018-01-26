import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'
import { addRating } from '../../actions'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'

const mapDispatchToProps = (dispatch, {shopId}) => ({
  onAddRating(author, rating, comment){
    dispatch(addRating(shopId, author, rating, comment))
  }
})

class AddRating extends React.Component {
  componentDidMount() {
    this.addRatingVisibility = false;
  }

  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false
    }
  }

  snackbarCloseRequest() {
    this.setState({
      snackbarOpen: false
    })
  }

  addRatingClick = () => {

    if (this.addRatingVisibility) {
      this.props.onAddRating(
        this.nameElement.input.value,
        this.ratingElement.input.value,
        this.commentElement.input.value
      )
      this.setState({
        snackbarOpen: true
      })
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
          <FlatButton  onClick={ (this.addRatingClick).bind(this)}>
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </FlatButton>
          {(this.addRatingVisibility) ?
            <FlatButton>Cancel</FlatButton>
            :null
          }
          <Snackbar
            open={this.state.snackbarOpen}
            message="Review added"
            autoHideDuration={3000}
            onRequestClose={(this.snackbarCloseRequest).bind(this)}
          />
        </div>
      )
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddRating)
