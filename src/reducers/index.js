import { combineReducers } from 'redux'
import shops, * as fromShops from './shops'

const mainReducer = combineReducers({shops})

export const getShopsByService = (state, service) => fromShops.getShopsByService(state.shops, service)
export const getShopById = (state, shop_id) => fromShops.getShopById(state.shops, shop_id)
export const getShopsByFilter = (state, filter) => fromShops.getShopsByFilter(state.shops, filter)

export default mainReducer
