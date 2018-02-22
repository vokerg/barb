import React from 'react'

const SingleBooking = ({username, service, date, comment, bookingApproveClick, bookingRejectClick}) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{date}</td>
      <td>{service}</td>
      <td>{comment}</td>
      <td>
        <button onClick={bookingApproveClick}>Approve</button>
        <button onClick={bookingRejectClick}>Reject</button>
      </td>
    </tr>
  )
}

export default SingleBooking
