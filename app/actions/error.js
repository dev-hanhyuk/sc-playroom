import { ROOMNAME_ERROR, PLAYLIST_ERROR, FAVORITE_ERROR, CLEAR_ERRORS } from '_actions'

/*
1) if roomname is duplicated
2) playlist add error => catch method => dispatch
3) favorite add/cancel err => catch method => dispatch
*/

export const duplicatedRoomname = () => dispatch => dispatch({ type: ROOMNAME_ERROR, roomnameError: 'Your roomname is already in use. \nPlease try another roomname to create.' })

export const clearErrors = () => dispatch => dispatch({ type: CLEAR_ERRORS });

export const playlistError = () => dispatch => dispatch({ type: PLAYLIST_ERROR, playlistError: 'Something wrong with your playlist. Please try it again.'})


export const favoriteError = () => dispatch => dispatch({ type: FAVORITE_ERROR, favoriteError: "Can't add/cancel your favorite request. Please try it again"})