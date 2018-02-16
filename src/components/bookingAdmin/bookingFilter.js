import React from 'react'

const BookingFilter = ({statusFilter, timeFilter, changeStatusFilter, changeTimeFilter}) => {
  return (
    <div>
      <span>Booking status:</span>
      <select value={statusFilter} onChange={changeStatusFilter}>
        <option value="All">All</option>
        <option value="Unprocessed">Unprocessed</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <span>Booking date:</span>
      <select value={timeFilter} onChange={changeTimeFilter}>
        <option value="Future">Future</option>
        <option value="Past">Past</option>
        <option value="All">All</option>
      </select>
    </div>
  )
}

export default BookingFilter
