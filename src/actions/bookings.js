import * as fromApi from '../api'

const stateLoadUserBookings = (bookings, status, time) => ({
  type: 'LOAD_USER_BOOKINGS',
  bookings,
  status,
  time
})
export const lodUserBookings = (userId, status, time) =>
  fromApi
    .getUserBookings(userId, status, time)
    .then(bookings => stateLoadUserBookings(bookings, status, time))

const stateLoadUserActiveBookings = bookings => ({
  type: 'LOAD_USER_ACTIVE_BOOKINGS',
  bookings
})
export const lodUserActiveBookings = userId =>
  fromApi
    .getUserBookings(userId, 'Approved', 'Future')
    .then(bookings => stateLoadUserActiveBookings(bookings))
