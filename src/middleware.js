import { applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { setToken } from './api'

const tokenMiddleware = store => next => action => {
  if (action.type === 'LOGIN') {
    setToken(action.token)
    localStorage.setItem('token', action.token)
    localStorage.setItem('userId', action.userId)
    localStorage.setItem('username', action.username)
  }
  if (action.type === 'LOGIN_UNSUCCESSFUL' || action.type === 'LOGOUT') {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
  }
  return next(action)
}

const middlewares = [
  thunk,
  promiseMiddleware,
  tokenMiddleware,
  logger
]

export default applyMiddleware(...middlewares)
