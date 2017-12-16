import { createStore, combineReducers } from 'redux';
import shops from './reducers/shops'

const persistedState = {shops: [
  {
    id: "1",
    name: "Shop1",
    address: "Norrebrogade 1",
    favorited: false,
    description: "This is a long description supposed to be displayed on a shop page",
    services: [
      "Washing", "Cutting", "Peducure"
    ],
    ratings: [
      {
        id: "1",
        author: "John Lennon",
        rating: "5",
        comment: "Imagine all the people"
      },
      {
        id: "2",
        author: "Paul McCartney",
        rating: "2",
        comment: "I'm not dead"
      },
      {
        id: "3",
        author: "Ringo Starr",
        rating: "1",
        comment: "I'd like to be under the sea"
      }
    ]
  },
  {
    id: "2",
    name: "Shop2",
    address: "Norrebrogade 2",
    favorited: true,
    description: "This is a long description supposed to be displayed on a shop page",
    services: [
      "Shaving", "Washing", "Cutting", "Manicure"
    ],
    ratings: [
      {
        id: "4",
        author: "Elton Jonh",
        rating: "1",
        comment: "Yellow brick wall"
      }
    ],
  },
]};

const getConfiguredStore = () => createStore(combineReducers({shops}), persistedState);

export default getConfiguredStore;
