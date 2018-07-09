import  uuidv4 from 'uuid/v4'
import * as fromApi from '../api'
import * as fromSocial from '../api/externalLogin'
import * as fromBookingActions from './bookings'

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
    .then(() => {
      if (id) {
        dispatch(loadRatings(id))
      }
    })
}

const loadStateRatings = (shopId, ratings) => ({
  type: "LOAD_RATINGS",
  shopId,
  ratings
})
export const loadRatings = shopId =>
  fromApi.getRatings(shopId)
    .then(ratings => loadStateRatings(shopId, ratings))

const addStateRatingScore = (id, shopId, ratingId, newRatingScore) => ({
  type: "ADD_RATING_SCORE",
  id,
  shopId,
  ratingId,
  newRatingScore
})
export const addRatingScore = (shopId, ratingId, direction) =>
  fromApi
    .addRatingScore(shopId, ratingId, direction)
    .then((rating) => addStateRatingScore(rating._id, shopId, ratingId, rating.score))

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

const addStateRating = rating => ({
  type: "ADD_RATING",
  rating
})
export const addRating = (userId, shopId, author, ratingStars, comment, date=(new Date())) =>
  fromApi
      .addRating(userId, shopId, author, ratingStars, comment, date, 0)
      .then(rating => addStateRating(rating))

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

export const stateLocalLoad = (userId, token, username, admin, moderateShops) => ({
    type: "LOCAL_LOAD",
    userId,
    token,
    username,
    admin,
    moderateShops
})

export const localLoad = (userId, token, username, admin, moderateShops) => dispatch => {
  dispatch(stateLocalLoad(userId, token, username, admin, moderateShops))
  if (userId !== null) {
    dispatch(loadPreferences(userId))
    dispatch(loadVotedRatings(userId))
    dispatch(fromBookingActions.lodUserActiveBookings(userId))
  }
}

const stateLogin = (userId, token, username, admin, moderateShops) => ({
  type: "LOGIN",
  userId,
  token,
  username,
  admin,
  moderateShops
})
const loginThunk = (userId, token, username, admin, moderateShops) => dispatch => {
  dispatch(stateLogin(userId, token, username, admin, moderateShops))
  dispatch(loadPreferences(userId))
  dispatch(loadVotedRatings(userId))
}
const loginUnsuccessful = () => ({ type: "LOGIN_UNSUCCESSFUL" })
export const login = (username, password) =>
{
  return fromApi
    .login(username, password)
    .then(
      ({userId, token, admin, moderateShops }) => loginThunk(userId, token, username, admin, moderateShops),
      loginUnsuccessful
    )
}


export const logout = () => ({ type: "LOGOUT" })

export const loginFacebook = () =>
  fromSocial
    .loginFacebook()
    .then(
      accessToken => fromApi
        .loginFacebook(accessToken)
        .then(
          ({userId, token, username, admin, moderateShops }) => loginThunk(userId, token, username, admin, moderateShops),
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

const stateLoadVotedRatings = votedRatings => ({
  type: 'LOAD_VOTED_RATINGS',
  votedRatings
})
export const loadVotedRatings = userId =>
  fromApi
    .getVotedRatings(userId)
    .then(votedRatings => stateLoadVotedRatings(votedRatings))
