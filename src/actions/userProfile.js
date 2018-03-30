import * as fromApi from '../api'

const stateLoadUser = user => ({
  type: "LOAD_USER",
  user
})

const loadUser = userId =>
  fromApi.getUser(userId).then(user => stateLoadUser(user))
