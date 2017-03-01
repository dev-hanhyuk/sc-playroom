import axios from 'axios'
import { UPDATE_FAVORITE_TRACKS, ADD_TO_FAVORITE, SET_CURRENT_TRACK } from '_actions'
import { play, pause, resetCurrentTrack, setTracks } from '_actions/audio'
import { favoriteError } from '_actions/error'
import { push } from 'react-router-redux'
import { fetchPlayroom } from '_actions/playroom'
import firebase from 'firebase'
import { CLIENT_ID } from '_actions'
import _ from 'lodash'

export const fetchFavoriteTracks = (userId) => dispatch =>
  axios.get(`https://api.soundcloud.com/users/${userId}/favorites?client_id=${CLIENT_ID}`)
    .then(res => dispatch({ type: UPDATE_FAVORITE_TRACKS, favorites: res.data }))
    .catch(err => console.error(err))


export const cancelFavoriteRequest = (trackIdArray, userId) => dispatch => {
  const cancelReq = (trackId) => SC.delete(`/me/favorites/${trackId}`)

  Promise.all(trackIdArray.map(cancelReq))
  .then(() => dispatch(fetchFavoriteTracks(userId)))
  .catch(err => dispatch(favoriteError()))
}

export const addFavoriteToPlayroom = (tracks, currentPlaylist, userId, roomId) => dispatch => {
  const playlistRef = firebase.database().ref(`playrooms/${roomId}/playlist`);

  const myCurrentPlaylist = currentPlaylist.filter(track => track.by == userId);
  const othersPlaylist = currentPlaylist.filter(track => track.by !== userId);// include!
  const newTrackToUpdate = _.differenceBy(tracks, myCurrentPlaylist, 'id').map(track => ({...track, by: userId, shared_at: _.now() }));
  const sameTrackToUpdate = _.intersectionBy(myCurrentPlaylist, tracks, 'id').map(track => ({...track, by: track.by, shared_at: track.shared_at }));

  const updatedPlaylist = _.orderBy(_.uniqBy(_.concat(othersPlaylist, sameTrackToUpdate, newTrackToUpdate), 'id'), 'shared_at');
  playlistRef.set(updatedPlaylist);
  dispatch(resetCurrentTrack());
  dispatch(fetchPlayroom(roomId));
  dispatch(setTracks(updatedPlaylist));
  dispatch(push(`/playroom/${roomId}`));

}


export const addTrackToFavorite = (userId, trackId) => dispatch => {
  SC.put(`/me/favorites/${trackId}`)
  .then(() => dispatch(fetchFavoriteTracks(userId)))
  .catch(err => dispatch(favoriteError()))
}

export const removeTrackFromFavorite = (userId, trackId, tracks, current_track) => dispatch => {
  SC.delete(`/me/favorites/${trackId}`)
  .then(() => {
    // const updatedTracks = tracks.filter(t => t.id !== trackId);
    dispatch(fetchFavoriteTracks(userId));//update favorite tracks
    if (tracks.length == current_track) return dispatch(pause());
    else {
      dispatch(resetCurrentTrack());
      const updatedTracks = tracks.filter(t => t.id !== trackId);
      dispatch(setTracks(updatedTracks))
      dispatch(play(current_track, updatedTracks));
    }
  })
}

