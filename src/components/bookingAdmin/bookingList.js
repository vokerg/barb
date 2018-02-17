import React from 'react'
import { connect } from 'react-redux'
import SingleBooking from './singleBooking'
import { loadBookings } from '../../actions'
import { getBookings } from '../../reducers'

class BookingList extends React.Component {
  constructor() {
    super()
    console.log("constructor")
  }

  componentDidMount() {
    const {userId, status, time, loadBookings} = this.props
    loadBookings(userId, status, time)
  }

  componentWillReceiveProps() {
    console.log("component will receive props")
  }

  componentWillUpdate() {
    console.log("component will update")
    //const {userId, status, time, loadBookings} = this.props
    //loadBookings(userId, status, time)
  }

  render() {
    const {status, time} = this.props
    return (
      <SingleBooking booking={{
        username: "vasea",
        service: "manicure",
        date: "10/10/2010"
      }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingList)
