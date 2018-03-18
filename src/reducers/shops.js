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
        coordinates: action.coordinates,
        services: action.services
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
            services: action.services,
            coordinates: action.coordinates
          }
        } else {
          return shop
        }
      })
    }

    case "LOAD_SHOPS": {
      return action.shops.map(shop => ({
        ...shop,
        id:shop._id,
        favorited: (action.favoriteShops.indexOf(shop._id) !== -1)
      }))
    }

    case "LOGOUT": {
      return state.map(shop => ({...shop,
        id:shop._id,
        favorited: false
      }))
    }

    case 'LOAD_PREFERENCES': {
      return state.map(shop => ({
        ...shop,
        favorited: (action.favorites.indexOf(shop._id) !== -1)
      }))
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
