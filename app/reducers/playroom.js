import { CREATE_PLAYROOM, FETCH_PLAYROOM, ENTER_PLAYROOM, UPDATE_PLAYROOM } from '_actions'

const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PLAYROOM: return action.playroom;
    default: return state;
  }
}