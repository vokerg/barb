import React from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Link } from 'react-router-dom'


const SingleBooking = ({
  username,
  service,
  date,
  comment,
  status,
  bookingApproveClick,
  bookingRejectClick,
  userId
}) => {
  return (
    <TableRow>
      <TableRowColumn><Link to={`/users/${userId}`}>{username}</Link></TableRowColumn>
      <TableRowColumn>{date}</TableRowColumn>
      <TableRowColumn>{service}</TableRowColumn>
      <TableRowColumn>{comment}</TableRowColumn>
      <TableRowColumn>
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
      </TableRowColumn>
    </TableRow>
  )
}

export default SingleBooking
