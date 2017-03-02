import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { authenticate, updateHistory } from '_actions/auth'
import { enterPlayroom, fetchPlayroom } from '_actions/playroom'
import { pause, play, next, previous } from '_actions/audio'
import { displayRemainder } from '../util'
import store from '../store'

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import SearchIcon from 'material-ui/svg-icons/action/search'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import AddIcon from 'material-ui/svg-icons/content/add'
import Play from 'material-ui/svg-icons/av/play-arrow'
import Pause from 'material-ui/svg-icons/av/pause'
import Previous from 'material-ui/svg-icons/av/fast-rewind'
import Next from 'material-ui/svg-icons/av/fast-forward'
import Login from 'material-ui/svg-icons/action/power-settings-new'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { drawer: false }
  }

  // componentWillMount() {
  //   this.props.authenticate();
  //   this.props.updateHistory(this.props.auth.user.id);
  // }

  openAuth = () => {
    this.props.authenticate();
  }

  handleToggle = () => this.setState({drawer: !this.state.drawer});
  handleClose = (location) => {
    this.setState({drawer: false});
    if(location) store.dispatch(push(location));
  }

  renderRecentPlayrooms = () => {
    const { user, history } = this.props.auth;
    return history.slice(0, 5).map(h => (<MenuItem key={h.id} onTouchTap={() => {
      this.handleClose();
      this.props.fetchPlayroom(h.id)
      // return this.props.enterPlayroom(user.id, h.id, h.accessKey);
      this.props.enterPlayroom(user.id, h.id, h.accessKey)
      // store.dispatch(push(`/playroom/${h.id}`))
    }}>{h.roomname}</MenuItem>))
  }

  render() {
    const { audio, auth, pause, play, next, previous } = this.props;
    return (
      <section>
        <Toolbar style={{position: 'fixed', width: '100%', zIndex: 10, backgroundColor: '#FFF'}} className="box-shadow">
          <ToolbarGroup firstChild={true} style={{width: '30%'}}>
            <IconButton onTouchTap={this.handleToggle}><NavigationMenu /></IconButton>
          </ToolbarGroup>

          <ToolbarGroup style={{textAlign: 'center'}}><ToolbarTitle style={{fontSize: '0.8rem'}} text={audio.tracks && audio.tracks.length > 0 && audio.current_track !== null ? `${audio.tracks[audio.current_track].title} [${audio.current_track + 1}/${audio.tracks.length}]` : `Welcome, ${auth.user.username}!`} /></ToolbarGroup>

            {
              audio.tracks ?
                <ToolbarGroup style={{width: '30%'}}>
                  <IconButton onTouchTap={() => previous(audio.current_track, audio.tracks)}><Previous /></IconButton>
                  {
                    audio.playing ? <IconButton onTouchTap={() => pause()}><Pause /></IconButton>
                    :<IconButton onTouchTap={() => play(audio.current_track, audio.tracks)}><Play /></IconButton>
                  }
                  <IconButton onTouchTap={() => next(audio.current_track, audio.tracks)}><Next /></IconButton>
                  <ToolbarTitle text={'-'+String(displayRemainder(audio.remainder))} style={{fontSize: '0.8rem'}} />
                </ToolbarGroup>
                : <ToolbarGroup style={{width: '20%'}}></ToolbarGroup>
            }

        </Toolbar>

        <Drawer docked={false} width={250} open={this.state.drawer} onRequestChange={(drawer) => this.setState({ drawer })}>
          <Divider />
          <Subheader>MAIN MENU</Subheader>
          <Divider />
          <MenuItem style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.8)'}} onTouchTap={() => this.handleClose('/main')}><SearchIcon style={{verticalAlign: 'middle'}}/>  SEARCH</MenuItem>
          <MenuItem style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.8)'}} onTouchTap={() => this.handleClose('/favorite')}><FavoriteIcon color="#D32F2F" style={{verticalAlign: 'middle'}} />  MY FAVORITES</MenuItem>
          <MenuItem style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.8)'}} onTouchTap={() => this.handleClose('/create')}><AddIcon color="#00BCD4" style={{verticalAlign: 'middle'}} />  CREATE PLAYROOM</MenuItem>
          <MenuItem style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.8)'}} onTouchTap={() => this.handleClose('/login')}><Login color="rgb(255, 65, 0)" style={{verticalAlign: 'middle'}}/>  LOGIN</MenuItem>

          <Divider />
          <Subheader>RECENT PLAYROOMS</Subheader>
          {this.renderRecentPlayrooms()}
          <Divider />
        </Drawer>


        <div className="row"><div className="col-xs-12">{ this.props.children }</div></div>


      </section>
    )
  }
}

const mapStateToProps = ({ auth, audio }) => ({ auth, audio });
const mapDispatchToProps = { authenticate, updateHistory, enterPlayroom, pause, play, next, previous, fetchPlayroom }
export default connect(mapStateToProps, mapDispatchToProps) (App);
