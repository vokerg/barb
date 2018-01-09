import { combineReducers } from 'redux'
import shops, * as fromShops from './shops'

const mainReducer = combineReducers({shops})

export const getShopsByService = (state, service) => fromShops.getShopsByService(state.shops, service)
export const getShopById = (state, shopId) => fromShops.getShopById(state.shops, shopId)
export const getShops = state => fromShops.getShops(state.shops)

export default mainReducer
