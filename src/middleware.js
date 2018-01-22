import { applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { setToken } from './api'

const tokenMiddleware = store => next => action => {
  if (action.type === 'LOGIN') {
    setToken(action.token)
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
