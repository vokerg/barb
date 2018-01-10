const isLoading = (state=false, action) => {
  switch (action.type) {
    case 'REQUEST_SHOPS': return true
    case 'LOAD_SHOPS': return false
    default: return state
  }
}

export default isLoading

export const isShopsRequested = state => state
