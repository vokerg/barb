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
      }))
    }

    case "ADD_RATING": {
      return (state.map(element => {
        if (element.id === action.shopId) {
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
          return element
        }
      }))
    }

    case "ADD_SHOP": {
      return [...state, {
        id: action.id,
        name: action.name,
        address: action.address,
        description: action.description,
        ratings: [],
        coordinates: {
          lat: 1, lng: 1
        },
        services: []
      }]
    }

    case "UPDATE_SHOP": {
      return state.map(shop => {
        if (shop.id === action.id) {
          return {
            ...shop,
            name: action.name,
            address: action.address,
            description: action.description,
          }
        } else {
          return shop
        }
      })
    }

    case "LOAD_SHOPS": {
      return action.response.map(shop => {
        return {...shop, id:shop._id}
      })
    }

    default: return state
  }
}

export const getShopById = (state, shopId) => {
  let shop_found;
  state.forEach(shop => {
    if (shop.id === shopId) {
      shop_found=shop
    }
  })
  return shop_found
}

export const getShops = state => state

export default shops
