import { combineReducers } from 'redux'

const filter = (state='', action) => {
  switch(action.type) {
    case 'UPDATE_USERADMIN_FILTER': return action.filter
    default: return state
  }
}

const users = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_USERS': return action.users
    default: return state
  }
}

export const getUserAdminFilter = state => state.filter
export const getUserAdminUsers = state => state.users

export default combineReducers({filter, users})
