import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware, routerMiddleware(browserHistory)))

export default store;

//createLogger(),