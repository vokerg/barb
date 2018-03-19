import  uuidv4 from 'uuid/v4'
import * as fromApi from '../api'
import * as fromSocial from '../externalLoginApi'

export const requestShops = () => ({ type: "REQUEST_SHOPS" })

const loadShops = (shops, favoriteShops) => ({
  type: "LOAD_SHOPS",
  shops,
  favoriteShops
})
export const fetchShops = (filter, service, id) => (dispatch, getState) =>
{
  dispatch(requestShops())
  fromApi
    .getShops(filter, service, id)
    .then(shops => dispatch(loadShops(shops, getState().common.favoriteShops)))
}

const addStateShop = (id, name, address, description, services, coordinates) => ({
  type: "ADD_SHOP",
  id,
  name,
  address,
  description,
  services,
  coordinates
})
export const addShop = (name, address, description, services, coordinates) =>
  fromApi
    .createShop(name, address, description, services, coordinates)
    .then(({_id}) => addStateShop(_id, name, address, description, services, coordinates))

const updateStateShop = (id, name, address, description, services, coordinates) => ({
    type: "UPDATE_SHOP",
    id,
    name,
    address,
    description,
    services,
    coordinates
})
export const updateShop = (id, name, address, description, services, coordinates) =>
  fromApi.updateShop(id, name, address, '', description, services, coordinates)
    .then(() => updateStateShop(id, name, address, description, services, coordinates))


const addStateRating = (shopId, author, rating, comment) => ({
  type: "ADD_RATING",
  id: uuidv4(),
  shopId,
  author,
  rating,
  comment
})
export const addRating = (shopId, author, rating, comment) =>
  fromApi
    .addRating(shopId, author, rating, comment)
    .then(() => addStateRating(shopId, author, rating, comment))

const getStateServices = services => ({
  type: "LOAD_SERVICES",
  services
})
export const getServices = () =>
  fromApi.getServices()
    .then(services => getStateServices(services))

const stateAddFavorite = id => ({
  type: "ADD_FAVORITE",
  id
})
export const addFavorite = (userId, shopId) =>
  fromApi
    .addFavorite(userId, shopId)
    .then(() => stateAddFavorite(shopId))

export const stateLocalLoad = (userId, token, username) => ({
    type: "LOCAL_LOAD",
    userId,
    token,
    username
})

export const localLoad = (userId, token, username) => dispatch => {
  dispatch(stateLocalLoad(userId, token, username))
  if (userId !== null) {
    dispatch(loadPreferences(userId))
  }
}

const stateLogin = (userId, token, username) => ({
  type: "LOGIN",
  userId,
  token,
  username
})
const loginThunk = (userId, token, username) => dispatch => {
  dispatch(stateLogin(userId, token, username));
  dispatch(loadPreferences(userId));
}
const loginUnsuccessful = () => ({ type: "LOGIN_UNSUCCESSFUL" })
export const login = (username, password) =>
  fromApi
    .login(username, password)
    .then(
      ({userId, token }) => loginThunk(userId, token, username),
      loginUnsuccessful
    )

export const logout = () => ({ type: "LOGOUT" })

export const loginFacebook = () =>
  fromSocial
    .loginFacebook()
    .then(
      accessToken => fromApi
        .loginFacebook(accessToken)
        .then(
          ({userId, token, username }) => loginThunk(userId, token, username),
          loginUnsuccessful
        ),
      loginUnsuccessful
  )

const stateSignup = () => ({ type: "SIGNUP" })

const signupUnsuccessful = () => ({ type: "SIGNUP_UNSUCCESSFUL" })
export const signup = (username, password) =>
  fromApi
    .signup(username, password)
    .then(stateSignup)

export const doRedirect = redirectTo => ({
    type: 'DO_REDIRECT',
    redirectTo
})

export const redirect = () => ({ type: 'REDIRECT' })

export const setSnackbar = snackbarMessage => ({
    type: "SET_SNACKBAR",
    snackbarMessage
})

export const clearSnackbar = () => ({ type: 'CLEAR_SNACKBAR' })

const stateAddBooking = (shopId) => ({
  type: 'ADD_BOOKING',
  shopId
})

export const addBooking = (shopId, userId, date, service, comment) =>
  fromApi
    .addBooking(shopId, userId, date, service, comment)
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

const stateUpdateBookingStatus = (shopId, bookingId, status) => ({
    type: 'UPDATE_BOOKING_STATUS',
    shopId,
    bookingId,
    status
})
export const updateBookingStatus = (shopId, bookingId, status) =>
  fromApi
    .updateBookingStatus(shopId, bookingId, status)
    .then(() => stateUpdateBookingStatus(shopId, bookingId, status))

const stateLoadPreferences = favorites => ({
  type: 'LOAD_PREFERENCES',
  favorites
})
export const loadPreferences = userId =>
  fromApi
    .loadPreferences(userId)
    .then(favorites => stateLoadPreferences(favorites))
