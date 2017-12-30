import { applyMiddleware } from 'redux'

const logger = store => next => action => {
  if (console.group) {
      console.group(action.type)
      console.log("State before", store.getState())
      let result = next(action)
      console.log("State after", store.getState())
      console.groupEnd(action.type)
      return result
  }
  return next(action)
}

export default applyMiddleware(logger)
