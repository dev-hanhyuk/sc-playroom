import { PLAYROOM_PATH_UPDATE } from '_actions'

const INITIAL_STATE = {
  current: null,
  previous: null,
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYROOM_PATH_UPDATE: return {...state, current: action.payload.current, previous: action.payload.previous};
    default: return state;
  }
}