import { createStore } from 'redux';
import applyMiddleware from './middleware'
import mainReducer from './reducers'
import persistedState from './persistedState'


export default () => createStore(mainReducer, persistedState, applyMiddleware)
