import { combineReducers } from 'redux'

const filter = (state={status: 'All', time: 'All'}, action) => {
  switch(action.type) {
    case 'LOAD_BOOKINGS':
    case 'LOAD_USER_BOOKINGS': return {
      status: action.status,
      time: action.time
    }
    default: return state
  }
}

const getStateWithUpdatedBookingStatus = (bookings, bookingId, status) =>
  bookings.map(booking => (booking.id === bookingId)
      ?({ ...booking, status })
      :booking
  )

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

export const getActiveBookingCount = state => state.userActiveBookings.length

const getFilteredBookings = (status, bookings) => status==='All' ? bookings : bookings.filter(booking => booking.status === status)

export const getBookings = state => getFilteredBookings(state.filter.status, state.bookings)

export const getBookingsForCurrentUser = state => getFilteredBookings(state.filter.status, state.userBookings)

export default combineReducers({bookings, filter, userActiveBookings, userBookings})
