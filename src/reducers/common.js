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

const admin = (state=false, action) => {
  switch (action.type) {
    case 'LOGIN': case 'LOCAL_LOAD': return (action.admin || false)
    case 'LOGIN_UNSUCCESSFUL': case 'SIGNUP': case 'LOGOUT': return false
    default: return state
  }
}

const moderateShops = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN': case 'LOCAL_LOAD': return (action.moderateShops || [])
    case 'LOGIN_UNSUCCESSFUL': case 'SIGNUP': case 'LOGOUT': return []
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
    case 'ADD_BOOKING': return `/shop/${action.shopId}`
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
    case 'LOGIN_UNSUCCESSFUL': return "Login unsuccessful"
    case 'LOGIN': return "Logged in"
    case 'UPDATE_BOOKING_STATUS': return `Booking ${action.status}`
    case 'CLEAR_SNACKBAR': return ""
    default: return state
  }
}

const favoriteShops = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_PREFERENCES': return action.favorites
    case "ADD_FAVORITE": {
      const favIndex = state.indexOf(action.id);
      return favIndex > 0
        ? [...state.slice(0, favIndex), ...state.slice(favIndex+1), state.length]
        : [...state, action.id]
    }
    case 'LOGOUT': return []
    default: return state
  }
}

const votedRatings = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_VOTED_RATINGS': return action.votedRatings
    case 'ADD_RATING_SCORE': return [...state, action.id]
    case 'LOGOUT': return []
    default: return state
  }
}

export const getSnackbarMessage = state => state.snackbarMessage
export const getUsername = state => state.username
export const getUserId = state => state.userId
export const isModerateShop = (state, shopId) => state.admin || state.moderateShops.includes(shopId)
export const isAdmin = state => state.admin
export const getVotedRatings = state => state.votedRatings

export default combineReducers({token, userId, admin, moderateShops, username, redirectTo, snackbarMessage, favoriteShops, votedRatings})
