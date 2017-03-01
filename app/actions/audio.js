import { CLIENT_ID, PLAYING, SET_CURRENT_TRACK, SET_REMAINDER, SET_TRACKS } from '_actions'
import { fetchPlayroom, syncPlaylist } from '_actions/playroom'
const AUDIO = document.createElement('audio');


let setRemainderInterval;

export const pause = () => dispatch => {
  if (setRemainderInterval) window.clearInterval(setRemainderInterval)
  AUDIO.pause();
  dispatch({ type: PLAYING, playing: false })
}


export const play = (track_number, tracks, room) => dispatch => {
  const completeSongHandler = () => {
    if (room) {
      dispatch(fetchPlayroom(room.id));
      const newPlaylist = dispatch(syncPlaylist(room.id));
      return dispatch(next(track_number, newPlaylist, room));
    } else {
      return dispatch(next(track_number, tracks))
    }
  }

  AUDIO.pause();
  window.clearInterval(setRemainderInterval);
  if(AUDIO.addEventListner) AUDIO.removeEventListener('ended', completeSongHandler);

  AUDIO.src = `${tracks[track_number].stream_url}?client_id=${CLIENT_ID}`;
  AUDIO.load();
  AUDIO.play();

  dispatch({ type: SET_CURRENT_TRACK, current_track: track_number });
  dispatch({ type: SET_TRACKS, tracks: tracks })
  dispatch({ type: PLAYING, playing: true })

  setRemainderInterval = window.setInterval(() => {
    dispatch({ type: SET_REMAINDER, remainder: AUDIO.duration - AUDIO.currentTime })
  }, 1000);

  AUDIO.addEventListener('ended', completeSongHandler)
}


export const next = (track_number, tracks, room) => dispatch => {
  if ( track_number == tracks.length - 1) {
    // dispatch(resetCurrentTrack());
    // dispatch({ type: SET_CURRENT_TRACK, current_track: 0 });
    // return dispatch(play(0, tracks));
  } else {
    dispatch({ type: SET_CURRENT_TRACK, current_track: track_number + 1 });
    dispatch(play(track_number + 1, tracks, room))
  }

}


export const previous = (track_number, tracks, room) => dispatch => {
  if (track_number == 0) return;
  dispatch({ type: SET_CURRENT_TRACK, current_track: track_number - 1 });
  dispatch(play(track_number - 1, tracks))
}

export const resetCurrentTrack = () => dispatch => {
  dispatch(pause());
  dispatch({ type: SET_CURRENT_TRACK, current_track: null })
  dispatch({ type: SET_REMAINDER, remainder: 0 })
  dispatch({ type: SET_TRACKS, tracks: [] })
}

export const setTracks = (tracks) => dispatch => dispatch({ type: SET_TRACKS, tracks: tracks})