import React from 'react'

const SingleBooking = ({username, service, date}) => {
  return (
    <div>
      <span>{username}</span>
      <span>{service}</span>
      <span>{date}</span>
    </div>
  )
}

export default SingleBooking
