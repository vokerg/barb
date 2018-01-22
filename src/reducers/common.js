import { combineReducers } from 'redux'

const token = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN': return action.token
    case 'LOGIN_UNSUCCESSFUL': return null
    default: return state
  }
}

const userId = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN': return action.userId
    case 'LOGIN_UNSUCCESSFUL': return null
    default: return state
  }
}

const redirectTo = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN': return '/'
    case 'DO_REDIRECT': return action.redirectTo
    case 'REDIRECT': return null
    default: return state
  }
}

export default combineReducers({token, userId, redirectTo})
