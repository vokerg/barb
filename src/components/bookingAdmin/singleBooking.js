import React from 'react'

const SingleBooking = ({username, service, date, comment, status, bookingApproveClick, bookingRejectClick}) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{date}</td>
      <td>{service}</td>
      <td>{comment}</td>
      <td>
        {(status === "Unprocessed" || status === "Rejected") ?
          <button onClick={bookingApproveClick}>Approve</button>
          :
          <div></div>
        }
        {(status === "Unprocessed" || status === "Approved") ?
          <button onClick={bookingRejectClick}>Reject</button>
          :
          <div></div>
        }
      </td>
    </tr>
  )
}

export default SingleBooking
