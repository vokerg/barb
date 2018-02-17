import React from 'react'
import SingleBooking from './singleBooking'

const BookingList = ({ bookings }) => {
  return (
    bookings.map((booking, i) => {
      const {username, service, date} = booking
      return <SingleBooking
        key = {i}
        username = {username}
        service = {service}
        date = {date}
      />
    })
  )
}

export default BookingList
