import  uuidv4 from 'uuid/v4'
import * as fromApi from '../api'

export const requestShops = () => {
  return {
    type: "REQUEST_SHOPS"
  }
}

const loadShops = (response) => {
  return {
    type: "LOAD_SHOPS",
    response
  }
}
export const fetchShops = (filter, service, id) => dispatch =>
{
  dispatch(requestShops())
  fromApi.getShops(filter, service, id)
    .then(response => dispatch(loadShops(response)))
}

const addStateShop = (id, name, address, description, services, coordinates) => {
  return {
    type: "ADD_SHOP",
    id,
    name,
    address,
    description,
    services,
    coordinates
  }
}
export const addShop = (name, address, description, services, coordinates) =>
  fromApi.createShop(name, address, description, services, coordinates)
    .then(({_id}) =>
      addStateShop(_id, name, address, description, services, coordinates)
    )

const updateStateShop = (id, name, address, description, services, coordinates) => {
  return {
    type: "UPDATE_SHOP",
    id,
    name,
    address,
    description,
    services,
    coordinates
  }
}
export const updateShop = (id, name, address, description, services, coordinates) =>
  fromApi.updateShop(id, name, address, '', description, services, coordinates)
    .then(() => updateStateShop(id, name, address, description, services, coordinates))


const addStateRating = (shopId, author, rating, comment) => {
  return {
    type: "ADD_RATING",
    id: uuidv4(),
    shopId,
    author,
    rating,
    comment
  }
}
export const addRating = (shopId, author, rating, comment) =>
  fromApi.addRating(shopId, author, rating, comment)
    .then(() => addStateRating(shopId, author, rating, comment))

const getStateServices = services => {
  return {
    type: "LOAD_SERVICES",
    services
  }
}
export const getServices = () =>
  fromApi.getServices()
    .then(services => getStateServices(services))

export const favoriteClick = id => {
  return {
    type: "ADD_FAVORITE",
    id: id
  }
}

export const localLoad = (userId, token, username) => {
  return {
    type: "LOCAL_LOAD",
    userId,
    token,
    username
  }
}

const stateLogin = (userId, token, username) => {
  return {
    type: "LOGIN",
    userId,
    token,
    username
  }
}
const loginUnsuccessful = () => {
  return {
    type: "LOGIN_UNSUCCESSFUL"
  }
}
export const logout = () => ({
  type: "LOGOUT"
})

export const login = (username, password) => {
  return fromApi.login(username, password).then(
    ({userId, token }) => stateLogin(userId, token, username),
    loginUnsuccessful
  )
}

const stateSignup = () => {
  return {
    type: "SIGNUP"
  }
}

const signupUnsuccessful = () => {
  return {
    type: "SIGNUP_UNSUCCESSFUL"
  }
}

export const signup = (username, password) => {
  return fromApi.signup(username, password).then(
    stateSignup
  )
}

export const doRedirect = redirectTo => {
  return {
    type: 'DO_REDIRECT',
    redirectTo
  }
}

export const redirect = () => {
  return {
    type: 'REDIRECT'
  }
}

export const setSnackbar = snackbarMessage => {
  return {
    type: "SET_SNACKBAR",
    snackbarMessage
  }
}

export const clearSnackbar = () => {
  return {
    type: 'CLEAR_SNACKBAR'
  }
}
