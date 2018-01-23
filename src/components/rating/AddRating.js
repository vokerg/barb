import React from 'react'
import { connect } from 'react-redux'

import AddRatingForm from './AddRatingForm'
import { addRating } from '../../actions'
import Snackbar from 'material-ui/Snackbar'

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
        this.nameElement.value,
        this.ratingElement.value,
        this.commentElement.value
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
          <button onClick={ (this.addRatingClick).bind(this)}>
            { (this.addRatingVisibility) ? "Post review" : "Add review" }
          </button>
          {(this.addRatingVisibility) ?
            <button>Cancel</button>
            :null
          }
          <Snackbar
            open={this.state.snackbarOpen}
            message="Rating added"
            autoHideDuration={3000}
            onRequestClose={(this.snackbarCloseRequest).bind(this)}
          />
        </div>
      )
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddRating)
