import { combineReducers } from 'redux'

const token = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN': case 'LOCAL_LOAD': return action.token
    case 'LOGIN_UNSUCCESSFUL': case 'SIGNUP': case 'LOGOUT': return null
    default: return state
  }
}

const userId = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN': case 'LOCAL_LOAD': return action.userId
    case 'LOGIN_UNSUCCESSFUL': case 'SIGNUP': case 'LOGOUT': return null
    default: return state
  }
}

const username = (state="", action) => {
  switch(action.type) {
    case 'LOGIN': case 'LOCAL_LOAD': return action.username
    case 'LOGIN_UNSUCCESSFUL': case 'SIGNUP': case 'LOGOUT': return ""
    default: return state
  }
}

const redirectTo = (state=null, action) => {
  switch(action.type) {
    case 'SIGNUP': return "/login"
    case 'LOGIN': case 'LOGOUT': return '/'
    case 'ADD_BOOKING': return '/shop/' + action.shopId
    case 'DO_REDIRECT': return action.redirectTo
    case 'REDIRECT': return null
    default: return state
  }
}

const snackbarMessage = (state="", action) => {
  switch(action.type) {
    case 'SIGNUP': return "Signup successful"
    case 'ADD_RATING': return "Rating added"
    case 'ADD_BOOKING': return "Booking added"
    case 'SET_SNACKBAR': return action.snackbarMessage
    case 'LOGOUT': return "Logged out"
    case 'LOGIN': return "Logged in"
    case 'CLEAR_SNACKBAR': return ""
    default: return state
  }
}

export const getSnackbarMessage = state => state.snackbarMessage
export const getUsername = state => state.username
export const getUserId = state => state.userId

export default combineReducers({token, userId, username, redirectTo, snackbarMessage})
