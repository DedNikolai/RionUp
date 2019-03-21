import PlaceActions from '../../actions/ActionTypes/PlaceActions'

const initialState = {
  places: [],
  placeCategories: [],
  currentPlaceById: {
    title: '',
    description: '',
    address: '',
    placeCategory: {
    }
  }
}

function places (state = initialState, action) {
  switch (action.type) {
    case PlaceActions.GET_ALL_PLACES:
      return {...state, places: action.payload.places}
    case PlaceActions.GET_PLACES_CATEGORIES:
      return {...state, placeCategories: action.payload.placeCategories}
    case PlaceActions.ADD_NEW_PLACE:
      let updatedPlaces = state.places
      updatedPlaces.push(action.payload.newPlace)
      return {...state, places: [...updatedPlaces]}
    case PlaceActions.DELETE_PLACE:
      return {...state, places: [...action.payload.places]}
    case PlaceActions.UPDATE_PLACE:
      let updatedPlacesList = state.places.map((place) => {
        if (place.id === action.payload.updatedPLace.id) {
          return action.payload.updatedPLace
        }
        return place
      })
      const emptyPlace = {
        title: '',
        description: '',
        address: '',
        placeCategory: {
        }
      }
      return {...state, places: [...updatedPlacesList], currentPlaceById: {...emptyPlace}}
    case PlaceActions.GET_PLACE_BY_ID:
      return {...state, currentPlaceById: {...action.payload.placeById}}
    default:
      return {...state}
  }
}

export default places