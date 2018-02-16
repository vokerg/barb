import React from 'react'
import SingleBooking from './singleBooking'

class BookingList extends React.Component {
  constructor() {
    super()
    console.log("constructor")
  }

  componentDidMount() {
    console.log("component did mount")
  }

  componentWillReceiveProps() {
    console.log("component will receive props")
  }

  componentWillUpdate() {
    console.log("component will update")
  }

  render() {
    const {status, time} = this.props
    console.log("RENDERRRR",status, time)
    return (
      <SingleBooking booking={{
        username: "vasea",
        service: "manicure",
        date: "10/10/2010"
      }} />
    )
  }
}

export default BookingList
