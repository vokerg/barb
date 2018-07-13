import React from 'react'
import BookingFilterView from './bookingFilterView'

class BookingFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      statusFilter: "All",
      timeFilter: "Future"
    }
  }

  componentWillMount() {
    this.props.loadBookings(this.state.statusFilter, this.state.timeFilter)
  }

  changeStatusFilter = event => {
    const statusFilter = event.target.value
    this.props.loadBookings(statusFilter, this.state.timeFilter)
    this.setState({
      statusFilter
    })
  }

  changeTimeFilter = event => {
    const timeFilter = event.target.value
    this.props.loadBookings(this.state.statusFilter, timeFilter)
    this.setState({
      timeFilter
    })
  }

  render() {
    const {statusFilter, timeFilter} = this.state
    return (
        <BookingFilterView
          statusFilter={ statusFilter }
          timeFilter={ timeFilter }
          changeStatusFilter={ this.changeStatusFilter.bind(this) }
          changeTimeFilter={ this.changeTimeFilter.bind(this) }
          statusList= {["All", "Unprocessed", "Approved", "Rejected", "Cancelled"]}
        />
    )
  }
}

export default BookingFilter
