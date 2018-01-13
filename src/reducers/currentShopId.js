const currentShopId = (state=0, action) => {
  switch(action.type) {
    case 'ADD_SHOP': return action.id
    default: return state
  }
}
export default currentShopId
export const getCurrentId = state => state
