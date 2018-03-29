import * as fromApi from '../api'

const stateLoadUsers = users => ({ type: "LOAD_USERS", users})

const loadUsers = filter =>
  fromApi
    .loadUsers(filter)
    .then(users => stateLoadUsers(users))

const stateUpdateFilter = filter => ({ type: "UPDATE_USERADMIN_FILTER", filter})

export const updateFilter = (filter='') => dispatch => {
  dispatch(stateUpdateFilter(filter))
  dispatch(loadUsers(filter))
}
