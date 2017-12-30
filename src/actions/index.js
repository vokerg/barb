import  uuidv4 from 'uuid/v4'

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
