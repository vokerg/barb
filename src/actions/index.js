import  uuidv4 from 'uuid/v4'
import api from '../api'

const loadShops = (response) => {
  console.log("response in action", response)
  return {
    type: "LOAD_SHOPS",
    response
  }
}

export const fetchShops = () => api(response => {
  console.log("response in fetchshops", response)
  return loadShops(response)
}
)

export const addShop = (name, address, description) => {
  return {
    id: uuidv4(),
    type: "ADD_SHOP",
    name,
    address,
    description
  }
}

export const updateShop = (id, name, address, description) => {
  return {
    type: "UPDATE_SHOP",
    id,
    name,
    address,
    description
  }
}

export const addRating = (shopId, author, rating, comment) => {
  return {
    type: "ADD_RATING",
    id: uuidv4(),
    shopId,
    author,
    rating,
    comment
  }
}

export const favoriteClick = (id) => {
  return {
    type: "ADD_FAVORITE",
    id: id
  }
}
