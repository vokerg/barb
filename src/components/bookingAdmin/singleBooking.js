import React from 'react'

const SingleBooking = ({booking}) => {
  const {username, service, date} = booking
  return (
    <div>
      <span>{username}</span>
      <span>{service}</span>
      <span>{date}</span>
    </div>
  )
}

export default SingleBooking
