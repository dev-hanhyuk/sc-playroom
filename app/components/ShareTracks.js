import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFavoriteToPlayroom } from '_actions/favorite'
import { clearErrors } from '_actions/error'
import { displayDuration } from '../util'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
from 'material-ui/Table';
import Duration from 'material-ui/svg-icons/device/access-time';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import PlayroomAdd from 'material-ui/svg-icons/av/playlist-add';
import CancelFavorite from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';

class ShareTracks extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFavorites: null, modal: false, searchPlaylist: '', selectedFavoritesToPlaylist: null }
  }

  selectTrack = (key) => this.setState({ selectedFavorites: key })

  addFavoriteToPlayroom = () => {
    const { favorite, playroom, auth } = this.props;
    // const playlistIds = playroom.playlist ? playroom.playlist.map(pl => { if (pl.by == auth.user.id ) return pl.id;}): [];
    const othersPlaylistIds = playroom.playlist ? playroom.playlist.map(pl => { if (pl.by !== auth.user.id ) return pl.id;}): [];
    const myFavorite = favorite.filter(fav => othersPlaylistIds.indexOf(fav.id) == -1 );

    this.props.clearErrors();
    let favoritesToAdd = this.state.selectedFavorites == 'all' ? myFavorite : this.state.selectedFavorites.map(idx => myFavorite[idx]);
    let currentPlaylist = playroom.playlist ? playroom.playlist: [];
    this.props.addFavoriteToPlayroom(favoritesToAdd, currentPlaylist, auth.user.id, playroom.id)
  }

  render () {
    const { favorite, playroom, auth } = this.props;
    const playlistIds = playroom.playlist ? playroom.playlist.map(pl => { if (pl.by == auth.user.id ) return pl.id;}): [];
    const othersPlaylistIds = playroom.playlist ? playroom.playlist.map(pl => { if (pl.by !== auth.user.id ) return pl.id;}): [];
    const myFavorite = favorite.filter(fav => othersPlaylistIds.indexOf(fav.id) == -1 );


    return (
      <section style={{paddingTop: '10vh'}} className="col-xs-offset-1 col-xs-10">

        <div className="row center-xs"><h1 style={{fontSize: '2rem'}}>SHARE FAVORITES</h1></div>
        <div className="row center-xs"><p style={{fontWeight: 300, marginBottom: '3vh'}}>Check songs to share</p></div>

        {
          this.props.errors.favoriteError ? <div className="row center-xs"><p style={{fontWeight: 300, color: '#F44336'}}>{this.props.errors.favoriteError}</p></div>: ''
        }

        <Table multiSelectable={true} onRowSelection={this.selectTrack}>
          <TableHeader displaySelectAll={true} enableSelectAll={true} adjustForCheckbox={true}>
            <TableRow>
              <TableHeaderColumn style={{width: '45%'}}>SONG</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}}>GENRE</TableHeaderColumn>
              <TableHeaderColumn style={{width: '15%'}}><Duration style={{height: '1rem'}}/></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true}>
          {
            myFavorite.map((track, idx) => (
              <TableRow key={track.id} selected={playlistIds.indexOf(track.id) > -1 ? true : false} selectable={othersPlaylistIds.indexOf(track.id) > -1 ? false : true}>
                <TableRowColumn style={{width: '45%'}}>{track.title}</TableRowColumn>
                <TableRowColumn style={{width: '20%'}}>{track.genre ? track.genre : 'unknown'}</TableRowColumn>
                <TableRowColumn style={{width: '15%'}}>{displayDuration(track.duration)}</TableRowColumn>
              </TableRow>
            ))
          }
          </TableBody>
        </Table>

       <FloatingActionButton onTouchTap={this.addFavoriteToPlayroom} style={styles.fab}><PlayroomAdd /></FloatingActionButton>

    </section>
    )
  }
}

const styles = {
  fab: {
    marginRight: 20,
    position: 'fixed',
    bottom: '5vh',
    right: '5vh'
  }
}

const mapStateToProps = ({ auth, favorite, playroom, errors }) => ({ auth, favorite, playroom, errors });
export default connect(mapStateToProps, { addFavoriteToPlayroom, clearErrors }) (ShareTracks);
