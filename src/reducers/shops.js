import  uuidv4 from 'uuid/v4'

const shops = (state = [], action) => {

  switch(action.type) {
    case "ADD_FAVORITE": {
      return (state.map(element => {
          if (element.id === action.id) {
            return {
              ...element,
              favorited: !element.favorited
            }
          }
          else {
            return {...element}
          }
        }
      ))}
    case "ADD_RATING": {
      return (state.map(element => {
        if (element.id === action.shop_id) {
          return {
            ...element,
            ratings: [
              ...element.ratings,
              {
                id: uuidv4(),
                author: action.author,
                rating: action.rating,
                comment: action.comment
              }
            ]
          }
        }
        else {
          return element;
        }
      }))
    }
    default: return state
  }
}

export const getShopsByService = (state, service) => state.filter(
  shop => shop.services.includes(service)
)

export const getShopById = (state, shop_id) => {
  let shop_found;
  state.forEach(shop => {
    if (shop.id === shop_id) {
      shop_found=shop
    }
  })
  return shop_found
}

export const getShopsByFilter = (state, filter = "all") => {
  switch (filter) {
    case "favorites": {
      return state.filter(shop => shop.favorited);
    }
    case "all":
    default: {
      return state;
    }
  }
}

export default shops
