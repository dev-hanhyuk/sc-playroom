import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store';

import App from '_components/App'
import Main from '_components/Main'
import Favorite from '_components/Favorite'
import Create from '_components/Create'
import Playroom from '_components/Playroom'
import ShareTracks from '_components/ShareTracks'

const history = syncHistoryWithStore(browserHistory, store);
// history.listen(location => console.log(location.pathname))

export default () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/main" component={Main} />
      <Route path="/favorite" component={Favorite} />
      <Route path="/create" component={Create} />
      <Route path="/playroom/:roomId" component={Playroom} />
      <Route path="/sharetracks" component={ShareTracks} />
    </Route>
  </Router>
)