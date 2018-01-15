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
{
  console.log("services from promise", services)
return  fromApi.updateShop(id, name, address, '', description, services, coordinates)
    .then(() => updateStateShop(id, name, address, description, services, coordinates))
}

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

const getStateServices = (services) => {
  return {
    type: "LOAD_SERVICES",
    services
  }
}
export const getServices = () =>
  fromApi.getServices()
    .then(services => getStateServices(services))

export const favoriteClick = (id) => {
  return {
    type: "ADD_FAVORITE",
    id: id
  }
}
