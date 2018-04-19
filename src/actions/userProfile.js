import * as fromApi from '../api'

const stateLoadUser = user => ({
  type: "LOAD_USER",
  user
})

export const loadUser = userId =>
  fromApi.getUser(userId).then(user => stateLoadUser(user))

const stateLoadUserRatings = ratings => ({
  type: "LOAD_USER_RATINGS",
  ratings
})

export const loadUserRatings = userId =>
  fromApi.getUserRatings(userId).then(ratings => stateLoadUserRatings(ratings))
