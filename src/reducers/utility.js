import { combineReducers } from 'redux'

const serviceFilter = (state=[], action) => {
  switch(action.type) {
    case 'UPDATE_SERVICE_LIST': {
      return [...action.services]
    }
    default: return state
  }
}

export const getServiceFilter = state => state.serviceFilter

export default combineReducers({ serviceFilter })
