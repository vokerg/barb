import { combineReducers } from 'redux'
import shops, * as fromShops from './shops'
import isLoading, * as fromLoading from './isLoading'
import currentShopId, * as fromCurrentShopId from './currentShopId'
import services, * as fromServices from './services'

export const getCurrentId = state => fromCurrentShopId.getCurrentId(state.currentShopId)

const mainReducer = combineReducers({
  shops, isLoading, currentShopId, services
})

export const getShopById = (state, shopId) => fromShops.getShopById(state.shops, shopId)
export const getShops = state => fromShops.getShops(state.shops)
export const isShopsRequested = state =>
  fromLoading.isShopsRequested(state.isLoading)
export const getServices = state => fromServices.getServices(state.services)

export default mainReducer
