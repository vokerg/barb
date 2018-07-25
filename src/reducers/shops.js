const shops = (state = [], action) => {
  switch(action.type) {
    case "ADD_FAVORITE": {
      return (state.map(shop => (shop.id === action.id) ?
        {
          ...shop,
          favorited: !shop.favorited
        } : shop
      ))
    }

    case "ADD_RATING": {
      return (state.map(shop => (shop.id === action.rating.shopId) ?
        {
          ...shop,
          ratings: [
            ...shop.ratings,
            { ...action.rating, id: action.rating._id }
          ]
        } : shop
      ))
    }

    case "ADD_RATING_SCORE": {
      return (state.map(shop => (shop.id === action.shopId)
        ? {
          ...shop,
          ratings: shop.ratings.map(rating =>
            (rating.id === action.ratingId) ? { ...rating, score: action.newRatingScore } : rating
          )
        }
        : shop
      ))
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
      return state.map(shop => (shop.id === action.id) ?
          {
            ...shop,
            name: action.name,
            address: action.address,
            description: action.description,
            services: action.services,
            coordinates: action.coordinates
          } : shop
      )
    }

    case "LOAD_SHOPS": {
      return action.shops.map(shop => ({
        ...shop,
        id: shop._id,
        favorited: (action.favoriteShops.indexOf(shop._id) !== -1),
        ratings: []
      }))
    }

    case "LOAD_RATINGS": {
      return state.map(shop => (shop.id === action.shopId) ?
        {
          ...shop,
          ratings: action.ratings.map(rating => ({...rating, id:rating._id}))
        } : shop
      )
    }

    case "LOGOUT": {
      return state.map(shop => ({
        ...shop,
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

export const getShopById = (state, shopId) => state.find(shop => shop.id === shopId)

export const getShops = (state, filter) => (filter !== 'favorites') ? state : state.filter(shop => shop.favorited)

export default shops
