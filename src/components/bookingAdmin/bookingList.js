import React from 'react'
import SingleBooking from './singleBooking'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'

const BookingList = ({bookings, bookingApprove, bookingReject}) => {
  return (
    <Table height={'300px'}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>User</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Service</TableHeaderColumn>
          <TableHeaderColumn>Comment</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map(booking => {
            const {id, username, service, date, comment, status, userId} = booking
            return <SingleBooking
              key = {id}
              username = {username}
              userId= {userId}
              service = {service}
              date = {date}
              comment = {comment}
              status= {status}
              bookingApproveClick = {bookingApprove(id)}
              bookingRejectClick = {bookingReject(id)}
            />
        })}
      </TableBody>
    </Table>
  )
}

export default BookingList
