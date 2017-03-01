import { CREATE_PLAYROOM, FETCH_PLAYROOM, ENTER_PLAYROOM, UPDATE_PLAYROOM, FETCH_ALL_PLAYROOMS, PLAYROOM_CHANGED, PLAYROOM_PATH_UPDATE } from '_actions'
import { resetCurrentTrack, setTracks } from '_actions/audio'
import { updateHistory } from '_actions/auth'
import { push } from 'react-router-redux'
import firebase from 'firebase'
import _ from 'lodash'


export const fetchAllPlayrooms = () => dispatch => {
  const playroomsRef = firebase.database().ref(`playrooms/`);
  playroomsRef.on('value', (snapshot) => {
    dispatch({ type: FETCH_ALL_PLAYROOMS, playrooms: _.values(snapshot.val()) })
  })
}

export const fetchPlayroom = (roomId) => dispatch => {
  let PlayroomRef = firebase.database().ref(`playrooms/${roomId}`);
  PlayroomRef.once('value', (snapshot) => {
    dispatch({ type: UPDATE_PLAYROOM, playroom: snapshot.val()});
    dispatch(setTracks(snapshot.val().playlist));
  })
}

export const syncPlaylist = (roomId) => dispatch => {
  let PlaylistRef = firebase.database().ref(`playrooms/${roomId}/playlist`);
  let updatedPlaylist;
  PlaylistRef.once('value', (snapshot) => { dispatch(setTracks(snapshot.val())); updatedPlaylist = snapshot.val() });
  return updatedPlaylist;
}


export const createPlayroom = (roomname, accessKey, creator) => dispatch => {
  let newPlayroom = firebase.database().ref(`playrooms/`).push();

  newPlayroom.set({
    id: newPlayroom.key,
    roomname: roomname,
    accessKey: accessKey,
    creator: creator
  });

  let newPlayroomKey = newPlayroom.key;
  const newPlayroomKeyForCreator = firebase.database().ref(`users/${creator.id}/creator/`).push();
  newPlayroomKeyForCreator.set(newPlayroom.key);

  dispatch(resetCurrentTrack());
  dispatch(fetchPlayroom(newPlayroomKey))
  dispatch(enterPlayroom(creator.id, newPlayroomKey, accessKey));
}


export const enterPlayroom = (userId, roomId, accessKey) => dispatch => {
  let queriedRoomRef = firebase.database().ref(`playrooms/${roomId}`);

  queriedRoomRef.on('value', (snapshot) => {
    let queriedRoom = snapshot.val();
    if(queriedRoom.id == roomId && queriedRoom.accessKey == accessKey) {
      const playroomHistory = firebase.database().ref(`users/${userId}/history`);
      playroomHistory.push({id: roomId, roomname: queriedRoom.roomname, accessKey: queriedRoom.accessKey, visited: _.now()});
      dispatch(updateHistory(userId));

      if (queriedRoom.creator.id == userId) return dispatch(push(`/playroom/${roomId}`));
      if (!queriedRoom.members) {
        const members = firebase.database().ref(`playrooms/${roomId}/members`);
        members.set([userId])
       }
      else if (queriedRoom.members && queriedRoom.members.indexOf(userId) == -1) { queriedRoom.members.concat([userId])
      }

      dispatch(push(`/playroom/${roomId}`));
    }
    else { console.log('you entered the wrong playroom') }
  })
}


export const changePlayroom = (currentPath, previousPath, roomId) => dispatch => {
  const payload = { current: currentPath, previous: previousPath };
  dispatch({ type: PLAYROOM_PATH_UPDATE, payload });

  if (currentPath !== previousPath) {
    dispatch(resetCurrentTrack());
    dispatch(fetchPlayroom(roomId));
  }
  if (currentPath == null && previousPath == null) dispatch(fetchPlayroom(currentPath));
}

export const resetPlayroom = () => dispatch => {
  const payload = { current: null, previous: null };
  dispatch(resetCurrentTrack());
  dispatch({ type: UPDATE_PLAYROOM, playroom: {} });
  dispatch({ type: PLAYROOM_PATH_UPDATE, payload });

}