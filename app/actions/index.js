export const CLIENT_ID = require('../env').CLIENT_ID;
export const FIRE_BASE = require('../env').FIRE_BASE;
export const REDIRECT_URI = require('../env').REDIRECT_URI;

export const AUTHENTICATE = 'AUTHENTICATE'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'

/* audio */
export const PLAYING = 'PLAYING'
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK'
export const SET_REMAINDER = 'SET_REMAINDER'
export const SET_TRACKS = 'SET_TRACKS'

/* favorite tracks */
export const UPDATE_FAVORITE_TRACKS = 'UPDATE_FAVORITE_TRACKS'
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE'


/* playlist */
export const UPDATE_PLAYLISTS = 'UPDATE_PLAYLISTS'

/* playroom */
export const CREATE_PLAYROOM = 'CREATE_PLAYROOM'
export const FETCH_PLAYROOM = 'FETCH_PLAYROOM'
export const ENTER_PLAYROOM = 'ENTER_PLAYROOM'
export const UPDATE_PLAYROOM = 'UPDATE_PLAYROOM'
export const FETCH_ALL_PLAYROOMS = 'FETCH_ALL_PLAYROOMS'
export const PLAYROOM_PATH_UPDATE = 'PLAYROOM_PATH_UPDATE'


/* error handlers */
export const ROOMNAME_ERROR = 'ROOMNAME_ERROR'
export const PLAYLIST_ERROR = 'PLAYLIST_ERROR'
export const FAVORITE_ERROR = 'FAVORITE_ERROR'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'