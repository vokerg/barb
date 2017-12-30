import { combineReducers } from 'redux'
import shops, * as fromShops from './shops'

const mainReducer = combineReducers({shops})

export const getShopsByService = (state, service) => fromShops.getShopsByService(state.shops, service)
export const getShopById = (state, shopId) => fromShops.getShopById(state.shops, shopId)
export const getShopsByFilter = (state, filter) => fromShops.getShopsByFilter(state.shops, filter)

export default mainReducer
