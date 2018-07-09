import React from 'react'
import { connect } from 'react-redux'

import BookingFilter from '../common/bookingFilter'
import { loadUserBookings } from '../../actions/bookings'
import { getBookingsForCurrentUser, getUserId } from '../../reducers'
import BookingsUserView from './bookingsUserView'

class BookingsUser extends React.Component {

  loadBookingsUser = userId => (statusFilter, timeFilter) =>
    this.props.loadUserBookings(userId, statusFilter, timeFilter)

  render() {
    return(
      <div>
        <BookingFilter loadBookings={this.loadBookingsUser(this.props.userId)}/>
        <BookingsUserView bookings = {this.props.bookings} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bookings : getBookingsForCurrentUser(state),
  userId : getUserId(state)
})

const mapDispatchToProps = dispatch => {
  return {
    loadUserBookings: (userId, status, time) => dispatch(loadUserBookings(userId, status, time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsUser)
