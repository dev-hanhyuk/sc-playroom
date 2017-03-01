import { AUTHENTICATE, UPDATE_HISTORY } from '_actions'

const INITIAL_STATE = {
  user: {},
  history: []
};


export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE: return {...state, user: action.user};
    case UPDATE_HISTORY: return {...state, history: action.history};
    default: return state;
  }
}