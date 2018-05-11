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
      return (state.map(shop => (shop.id === action.shopId) ?
        {
          ...shop,
          ratings: [
            ...shop.ratings,
            {...action.rating, id: action.rating._id}
          ]
        } : shop
      ))
    }

    case "ADD_RATING_SCORE": {
      return (state.map(shop => (shop.id === action.shopId) ?
        {
          ...shop,
          ratings: shop.ratings.map(rating => (rating.id === action.ratingId) ?
            {
              ...rating,
              score: action.newRatingScore
            } : rating
          )
        } : shop
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
