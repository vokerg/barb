import React from 'react'
import SingleBooking from './singleBooking'

const BookingList = ({bookings, bookingApprove, bookingReject}) => {
  return (
    bookings.map((booking, i) => {
      const {id, username, service, date, comment} = booking
      return <SingleBooking
        key = {i}
        username = {username}
        service = {service}
        date = {date}
        comment = {comment}
        bookingApproveClick = {bookingApprove(id)}
        bookingRejectClick = {bookingReject(id)}
      />
    })
  )
}

export default BookingList
