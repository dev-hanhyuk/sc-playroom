import { FETCH_ALL_PLAYROOMS } from '_actions'

const INITIAL_STATE = [];

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_PLAYROOMS: return action.playrooms;
    default: return state;
  }
}