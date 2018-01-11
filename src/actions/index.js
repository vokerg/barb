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

export const fetchShops = (filter, service) => fromApi.shopsPromise(filter, service)
  .then(response => loadShops(response))

export const addShop = (name, address, description) => {
  return {
    id: uuidv4(),
    type: "ADD_SHOP",
    name,
    address,
    description
  }
}

const updateStateShop = (id, name, address, description) => {
  return {
    type: "UPDATE_SHOP",
    id,
    name,
    address,
    description
  }
}

export const updateShop = (id, name, address, description) =>
  fromApi.updateShop(id, name, address, '', description, '', '')
    .then(() => updateStateShop(id, name, address, description))


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

export const favoriteClick = (id) => {
  return {
    type: "ADD_FAVORITE",
    id: id
  }
}
