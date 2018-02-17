import { combineReducers } from 'redux'

const bookings = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_BOOKINGS' : return action.bookings
    default: return state
  }
}

export const getBookings = state => state

export default bookings
