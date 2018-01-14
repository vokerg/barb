const services = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_SERVICES': return [...action.services]
    default: return state
  }
}

export default services

export const getServices = services => services
