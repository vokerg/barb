import React from 'react'
import SingleBooking from './singleBooking'

const BookingList = ({bookings, bookingApprove, bookingReject}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Date</th>
          <th>Service</th>
          <th>Comment</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, i) => {
            const {id, username, service, date, comment, status} = booking
            return <SingleBooking
              key = {i}
              username = {username}
              service = {service}
              date = {date}
              comment = {comment}
              status= {status}
              bookingApproveClick = {bookingApprove(id)}
              bookingRejectClick = {bookingReject(id)}
            />
        })}
      </tbody>
    </table>
  )
}

export default BookingList
