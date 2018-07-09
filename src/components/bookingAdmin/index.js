import React from 'react'
import BookingList from './bookingList'
import BookingFilter from '../common/bookingFilter'
import { connect } from 'react-redux'
import { loadBookings, updateBookingStatus } from '../../actions'
import { getBookings, isModerateShop } from '../../reducers'

class BookingAdmin extends React.Component {

  shopId = this.props.match.params.id

  loadBookingsShop = shopId => (statusFilter, timeFilter) => this.props.loadBookings(shopId, statusFilter, timeFilter)
  updateBookingStatus = status => id => () => this.props.updateBookingStatus(this.shopId, id, status)
  bookingApprove = this.updateBookingStatus('Approved')
  bookingReject = this.updateBookingStatus('Rejected')

  render() {
    return (
      <div>
        <BookingFilter
          loadBookings={this.loadBookingsShop(this.shopId)}
        />
        <BookingList
          bookings={ this.props.bookings }
          bookingApprove = {this.bookingApprove}
          bookingReject = {this.bookingReject}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  bookings : getBookings(state),
  isModerateShop: isModerateShop(state, ownProps.match.params.id)
})

const mapDispatchToProps = dispatch => {
  return {
    loadBookings: (shopId, status, time) => dispatch(loadBookings(shopId, status, time)),
    updateBookingStatus: (shopId, bookingId, status) => dispatch(updateBookingStatus(shopId, bookingId, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingAdmin)
