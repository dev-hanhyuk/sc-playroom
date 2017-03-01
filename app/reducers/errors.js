import { ROOMNAME_ERROR, PLAYLIST_ERROR, FAVORITE_ERROR, CLEAR_ERRORS } from '_actions'

const INITIAL_STATE = {
  roomnameError: null,
  playlistError: null,
  favoriteError: null
};


export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case ROOMNAME_ERROR: return {...state, roomnameError: action.roomnameError};
    case PLAYLIST_ERROR: return {...state, playlistError: action.playlistError};
    case FAVORITE_ERROR: return {...state, favoriteError: action.favoriteError};
    case CLEAR_ERRORS: return INITIAL_STATE;
    default: return state;
  }
}