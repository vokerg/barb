import { combineReducers } from 'redux'
import shops, * as fromShops from './shops'
import isLoading, * as fromLoading from './isLoading'
import currentShopId, * as fromCurrentShopId from './currentShopId'
import services, * as fromServices from './services'
import bookings, * as fromBookings from './bookings'
import common, * as fromCommon from './common'
import userAdmin, * as fromUserAdmin from './userAdmin'
import userProfile, * as fromUserProfile from './userProfile'
import utility, * as fromUtility from './utility'

const mainReducer = combineReducers({
  common, shops, isLoading, currentShopId, services, bookings, userAdmin, userProfile, utility
})

export const getCurrentId = state => fromCurrentShopId.getCurrentId(state.currentShopId)
export const getShopById = (state, shopId) => fromShops.getShopById(state.shops, shopId)
export const getShops = (state, filter) => fromShops.getShops(state.shops, filter)
export const isShopsRequested = state => fromLoading.isShopsRequested(state.isLoading)
export const getServices = state => fromServices.getServices(state.services)
export const getSnackbarMessage = state => fromCommon.getSnackbarMessage(state.common)
export const getUsername = state => fromCommon.getUsername(state.common)
export const getUserId = state => fromCommon.getUserId(state.common)
export const isModerateShop = (state, shopId) => fromCommon.isModerateShop(state.common, shopId)
export const isAdmin = state => fromCommon.isAdmin(state.common)
export const getBookings = state => fromBookings.getBookings(state.bookings)
export const getUserAdminFilter = state => fromUserAdmin.getUserAdminFilter(state.userAdmin)
export const getUserAdminUsers = state => fromUserAdmin.getUserAdminUsers(state.userAdmin)
export const getUserProfile = state => fromUserProfile.getUserProfile(state.userProfile)
export const getVotedRatings = state => fromCommon.getVotedRatings(state.common)
export const getActiveBookingCount = state => fromBookings.getActiveBookingCount(state.bookings)
export const getBookingsForCurrentUser = state => fromBookings.getBookingsForCurrentUser(state.bookings)
export const isShopRatedByCurrentUser = (state, shopId) => fromCommon.isShopRatedByCurrentUser(state.common, shopId)
export const getServiceFilter = state => fromUtility.getServiceFilter(state.utility)

export default mainReducer
