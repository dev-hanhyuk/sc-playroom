import { UPDATE_PLAYLISTS } from '_actions'

const INITIAL_STATE = []


export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PLAYLISTS: return action.playlists;
    default: return state;
  }
}