import * as fromApi from '../api'

const stateAddBooking = shopId => ({
  type: 'ADD_BOOKING',
  shopId
})

export const addBooking = (shopId, userId, date, service, comment) =>
  fromApi
    .addBooking({shopId, userId, date: date.toString(), service, comment})
    .then(() => stateAddBooking(shopId))

const stateLoadBookings = (bookings, status, time) => ({
  type: 'LOAD_BOOKINGS',
  bookings,
  status,
  time
})
export const loadBookings = (shopId, status, time) =>
  fromApi
    .getBookings(shopId, status, time)
    .then(bookings => stateLoadBookings(bookings, status, time))

const stateUpdateBookingStatus = (bookingId, status) => ({
    type: 'UPDATE_BOOKING_STATUS',
    bookingId,
    status
})
export const updateBookingStatus = (bookingId, status) =>
  fromApi
    .updateBookingStatus(bookingId, status)
    .then(() => stateUpdateBookingStatus(bookingId, status))

const stateLoadUserBookings = (bookings, status, time) => ({
  type: 'LOAD_USER_BOOKINGS',
  bookings,
  status,
  time
})
export const loadUserBookings = (userId, status, time) =>
  fromApi
    .getUserBookings(userId, status, time)
    .then(bookings => stateLoadUserBookings(bookings, status, time))

const stateLoadUserActiveBookings = bookings => ({
  type: 'LOAD_USER_ACTIVE_BOOKINGS',
  bookings
})
export const loadUserActiveBookings = userId =>
  fromApi
    .getUserBookings(userId, 'Approved', 'Future')
    .then(bookings => stateLoadUserActiveBookings(bookings))
