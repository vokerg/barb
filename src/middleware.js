import { applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import logger from 'redux-logger'

const middlewares = [
  promiseMiddleware,
  logger
]

export default applyMiddleware(...middlewares)
