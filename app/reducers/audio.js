import { PLAYING, SET_CURRENT_TRACK, SET_REMAINDER, SET_TRACKS } from '_actions'

const INITIAL_STATE = {
  playing: false,
  current_track: null,
  remainder: 0,
  tracks: []
};


export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK: return { ...state, current_track: action.current_track };
    case SET_TRACKS: return {...state, tracks: action.tracks};
    case SET_REMAINDER: return { ...state, remainder: action.remainder }
    case PLAYING: return { ...state, playing: action.playing };
    default: return state;
  }
}