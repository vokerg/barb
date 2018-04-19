const userProfile = (state={username:'', favorites:[], ratings: []}, action) => {
  switch(action.type) {
    case 'LOAD_USER': return {...state, ...action.user}
    case 'LOAD_USER_RATINGS': return {...state, ratings: action.ratings}
    default: return state
  }
}

export const getUserProfile = state => state

export default userProfile
