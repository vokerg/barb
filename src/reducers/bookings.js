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

const getStateWithUpdatedBookingStatus = (bookings, bookingId, status) =>
  bookings.map(booking => {
    if (booking.id === bookingId) {
      return {
        ...booking,
        status
      }
    } else {
      return booking
    }
  })

const bookings = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_BOOKINGS' : return action.bookings.map(booking => {
      return {...booking, id: booking._id}
    })
    case 'UPDATE_BOOKING_STATUS' : return getStateWithUpdatedBookingStatus(state, action.bookingId, action.status)
    default: return state
  }
}

const userBookings = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_USER_BOOKINGS': return action.bookings.map(booking => {
      return {...booking, id: booking._id}
    })
    case 'UPDATE_BOOKING_STATUS' : return getStateWithUpdatedBookingStatus(state, action.bookingId, action.status)
    case 'LOGOUT': return []
    default: return state;
  }
}

const userActiveBookings = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_USER_ACTIVE_BOOKINGS': return action.bookings.map(booking => {
      return {...booking, id: booking._id}
    })
    case 'LOGOUT': return []
    default: return state;
  }
}

export const getBookings = state =>
  (state.filter.status === 'All') ? state.bookings : state.bookings.filter(booking =>
    booking.status === state.filter.status
  )

export const getActiveBookingCount = state => state.userActiveBookings.length
export const getBookingsForCurrentUser = state => state.userBookings

export default combineReducers({bookings, filter, userActiveBookings, userBookings})
