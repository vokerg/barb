import { combineReducers } from 'redux'

const bookings = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_BOOKINGS' : return action.bookings.map(booking => {
      return {...booking, id: booking._id}
    })
    case 'UPDATE_BOOKING_STATUS' : return state.map(booking => {
      if (booking.id === action.bookingId) {
        const {status} = action
        return {
          ...booking,
          status
        }
      } else {
        return booking
      }
    })
    default: return state
  }

}

export const getBookings = state => state

export default bookings
