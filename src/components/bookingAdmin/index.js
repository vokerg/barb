import React from 'react'
import BookingList from './bookingList'
import BookingFilter from './bookingFilter'
import connect from 'react-redux'

class BookingAdmin extends React.Component {
  constructor() {
    super()
    this.state = {
      statusFilter: "All",
      timeFilter: "Future"
    }
  }

  changeFilter = filter => event => {
    this.setState({
      ...this.state,
      [filter]: event.target.value
    })
  }

  changeStatusFilter = this.changeFilter("statusFilter")
  changeTimeFilter = this.changeFilter("timeFilter")
/*
  changeStatusFilter = event => {
    this.setState({
      statusFilter: event.target.value
    })
  }
*/
  render() {
    const {statusFilter, timeFilter} = this.state
    return (
      <div>
        Booking admin
        <BookingFilter
          statusFilter={statusFilter}
          timeFilter={timeFilter}
          changeStatusFilter={this.changeStatusFilter.bind(this)}
          changeTimeFilter={this.changeTimeFilter.bind(this)}
        />
        <BookingList shopId={this.props.match.params.id}/>
      </div>
    )
  }
}
