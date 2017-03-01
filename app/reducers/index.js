import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import auth from './auth';
import audio from './audio';
import favorite from './favorite';
import playroom from './playroom';
import playrooms from './playrooms';
import playlists from './playlists'
import ploc from './ploc'
import errors from './errors'

export default combineReducers({
  auth,
  audio,
  favorite,
  playroom,
  playrooms,
  playlists,
  ploc,
  errors,
  routing: routerReducer
});