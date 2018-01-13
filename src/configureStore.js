import { createStore } from 'redux';
import applyMiddleware from './middleware'
import mainReducer from './reducers'

export default () => createStore(mainReducer, applyMiddleware)
