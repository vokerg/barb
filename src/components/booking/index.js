import React from 'react'
import { connect } from 'react-redux'
import { getShopById, getUserId } from '../../reducers'
import { addBooking, doRedirect } from '../../actions'
import BookingView from './bookingView'

class Booking extends React.Component {

  constructor() {
    super()
    this.state = {
      date: "",
      selectedService: "",
      comment: ""
    }
  }

  dateChange = (event, value) => {
    this.setState({
      ...this.state,
      date: value
    })
  }

  serviceChange = (event, index, value) => {
    this.setState({
      ...this.state,
      selectedService: value
    })
  }

  commentChange = (event, value) => {
    this.setState({
      ...this.state,
      comment: value
    })
  }

  submit(e) {
    e.preventDefault();
    const {shop, userId} = this.props
    const {date, selectedService, comment} = this.state
    this.props.addBooking(shop.id, userId, date, selectedService, comment)
    doRedirect(`/shop/${shop.id}`)
  }

  render() {
    const {shop} = this.props
    return (
      <BookingView
        selectedService={this.state.selectedService}
        services={shop.services}
        onSubmit={this.submit.bind(this)}
        onDateChange={this.dateChange.bind(this)}
        onServiceChange={this.serviceChange.bind(this)}
        onCommentChange={this.commentChange}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.match.params
  const shop = getShopById(state, id)
  const userId = getUserId(state)
  return {
    shop,
    id,
    userId
  }
}

const mapDispatchToProps = dispatch => ({
  addBooking: (shopId, userId, date, service, commment) =>
    dispatch(addBooking(shopId, userId, date, service, commment)),
  doRedirect: path => dispatch(doRedirect(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
