import React from 'react'

const BookingsUserView = ({bookings}) => {
  return(
    <div>
      {bookings.map((booking, key) =>
        <div key={key}>
          {booking.id}
        </div>
      )}
    </div>
  )
}

export default BookingsUserView
