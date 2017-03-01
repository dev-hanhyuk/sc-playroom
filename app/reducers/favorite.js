import { UPDATE_FAVORITE_TRACKS, ADD_TO_FAVORITE } from '_actions'

const INITIAL_STATE = [];

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FAVORITE_TRACKS: return action.favorites;
    case ADD_TO_FAVORITE: [...action.addToFavorite]
    default: return state;
  }
}