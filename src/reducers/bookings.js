import { combineReducers } from 'redux'

const filter = (state={status: 'All', time: 'All'}, action) => {
  switch(action.type) {
    case 'LOAD_BOOKINGS': return {
      status: action.status,
      time: action.time
    }
    default: return state
  }
}

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

export const getBookings = (state) =>
  (state.filter.status === 'All') ? state.bookings : state.bookings.filter(booking =>
    booking.status === state.filter.status
  )

export default combineReducers({bookings, filter})
