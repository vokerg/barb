import * as fromApi from '../api'
import * as fromSocial from '../api/externalLogin'
import * as fromBookingActions from './bookings'

export * from './bookings'

export const requestShops = () => ({ type: "REQUEST_SHOPS" })

const loadShops = (shops, favoriteShops) => ({
  type: "LOAD_SHOPS",
  shops,
  favoriteShops
})
export const fetchShops = (filter='All', services=[], id="") => (dispatch, getState) =>
{
  dispatch(requestShops())
  fromApi
    .getShops(filter, services, id)
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

export const addRating = (userId, shopId, author, rating, comment, date=(new Date())) =>
  fromApi
      .addRating({userId, shopId, author, rating, comment, date: JSON.stringify(date), score: 0})
      .then(rating => addStateRating(rating))

const loadStateServices = services => ({
  type: "LOAD_SERVICES",
  services
})
export const loadServices = () =>
  fromApi.getServices()
    .then(services => loadStateServices(services))

const stateAddFavorite = id => ({
  type: "ADD_FAVORITE",
  id
})
export const addFavorite = (userId, shopId) =>
  fromApi
    .addFavorite(userId, shopId)
    .then(() => stateAddFavorite(shopId))

const loadCurrentUserInfo = userId => dispatch => {
  if (userId !== null) {
    dispatch(loadPreferences(userId))
    dispatch(loadVotedRatings(userId))
    dispatch(fromBookingActions.loadUserActiveBookings(userId))
    dispatch(loadRatedShops(userId))
  }
}

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
  dispatch(loadCurrentUserInfo(userId))
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
  dispatch(loadCurrentUserInfo(userId))
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
    .then(stateSignup, signupUnsuccessful)

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

const stateLoadRatedShops = ratedShops => ({
  type: 'LOAD_RATED_SHOPS',
  ratedShops
})
export const loadRatedShops = userId =>
  fromApi
    .getUserRatings(userId)
    .then(ratedShops => stateLoadRatedShops(ratedShops))
