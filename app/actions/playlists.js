import axios from 'axios'
import { UPDATE_PLAYLISTS } from '_actions'
import { CLIENT_ID } from '_actions'
import { playlistError } from '_actions/error'

export const fetchPlaylists = (userId) => dispatch =>
  axios.get(`https://api.soundcloud.com/users/${userId}/playlists?client_id=${CLIENT_ID}`)
  .then(res => dispatch({ type: UPDATE_PLAYLISTS, playlists: res.data }))
  .catch(err => console.error(err))



export const addFavoriteToNewPlaylist = (userId, trackId, playlistNameToCreate) => dispatch =>
  SC.post('/playlists', { playlist: { title: playlistNameToCreate, tracks: [{ id: trackId }] }})
  .then(() => dispatch(fetchPlaylists(userId)))
  .catch(() => dispatch(playlistError()))



export const addFavoriteToPlaylist = (userId, trackId, playlistToAdd) => dispatch =>
  SC.put('/playlists/' + playlistToAdd, { playlist: { tracks: [{ id: trackId }] }})
  .then(() => dispatch(fetchPlaylists(userId)))
  .catch(() => dispatch(playlistError()))

