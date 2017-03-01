import { FIRE_BASE, CLIENT_ID, REDIRECT_URI, AUTHENTICATE, UPDATE_HISTORY } from '_actions'
import { push } from 'react-router-redux'
import firebase from 'firebase'
import _ from 'lodash'

firebase.initializeApp(FIRE_BASE)
SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI })


export const authenticate = () => dispatch => {
    SC.connect().then(() => SC.get('/me'))
    .then(user => {
      const email = user.id + 'sc-playroom@email.com'
      const password = user.username + user.id;
      // if user already exists => update User Information
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          dispatch({ type: AUTHENTICATE, user })
          dispatch(updateHistory(user.id))
          return dispatch(push('/main'))
        })
        .catch(() => {
          //if user is not yet created => created
          return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              dispatch({ type: AUTHENTICATE, user })
              dispatch(updateHistory(user.id))
              dispatch(push('/main'))
            })
            .catch(() => console.log('authentication failed'))
        })
    })
}

export const updateHistory = (userId) => dispatch => {
  const userHistory = firebase.database().ref(`users/${userId}/history`);
  userHistory.once('value', (snapshot) => {
    let history = _.values(snapshot.val());
    let updatedHistory = _.uniqBy(_.orderBy(history, ['visited'], ['desc']).slice(0, 20), 'id');
    userHistory.set(updatedHistory);
    dispatch({ type: UPDATE_HISTORY, history: updatedHistory })
  });
}

