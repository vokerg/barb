import { applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middlewares = [
  thunk,
  promiseMiddleware,
  logger
]

export default applyMiddleware(...middlewares)
