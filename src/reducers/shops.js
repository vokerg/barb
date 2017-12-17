import  uuidv4 from 'uuid/v4';

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
        if (element.id = action.shop_id) {
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

export default shops
