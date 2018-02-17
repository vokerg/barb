import React from 'react'
import BookingList from './bookingList'
import BookingFilter from './bookingFilter'
import { connect } from 'react-redux'
import { loadBookings } from '../../actions'
import { getBookings } from '../../reducers'

class BookingAdmin extends React.Component {
  constructor() {
    super()
    this.state = {
      statusFilter: "All",
      timeFilter: "Future"
    }
  }

  componentWillMount() {
    const shopId = this.props.match.params.id
    this.props.loadBookings(shopId, this.state.statusFilter, this.state.timeFilter)
  }

  changeStatusFilter = event => {
    const statusFilter = event.target.value
    const shopId = this.props.match.params.id
    this.props.loadBookings(shopId, statusFilter, this.state.timeFilter)
    this.setState({
      statusFilter
    })
  }

  changeTimeFilter = event => {
    const timeFilter = event.target.value
    const shopId = this.props.match.params.id
    this.props.loadBookings(shopId, this.state.statusFilter, timeFilter)
    this.setState({
      timeFilter
    })
  }

  render() {
    const {statusFilter, timeFilter} = this.state
    return (
      <div>
        Booking admin
        <BookingFilter
          statusFilter={ statusFilter }
          timeFilter={ timeFilter }
          changeStatusFilter={ this.changeStatusFilter.bind(this) }
          changeTimeFilter={ this.changeTimeFilter.bind(this) }
        />
        <BookingList bookings={ this.props.bookings }/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  bookings : getBookings(state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    loadBookings: (userId, status, time) => dispatch(loadBookings(userId, status, time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingAdmin)
