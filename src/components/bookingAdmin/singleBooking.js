import React from 'react'

const SingleBooking = ({username, service, date, comment, bookingApproveClick, bookingRejectClick}) => {
  return (
    <div>
      <span>{username}</span>
      <span>{service}</span>
      <span>{date}</span>
      <span>{comment}</span>
      <button onClick={bookingApproveClick}>Approve</button>
      <button onClick={bookingRejectClick}>Reject</button>
    </div>
  )
}

export default SingleBooking
