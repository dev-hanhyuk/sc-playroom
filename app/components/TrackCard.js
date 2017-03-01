import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTrackToFavorite, removeTrackFromFavorite } from '_actions/favorite'
import { fetchPlaylists, addFavoriteToNewPlaylist, addFavoriteToPlaylist } from '_actions/playlists'
import { clearErrors } from '_actions/error'
import {Card, CardTitle } from 'material-ui/Card';
import BlankArtwork from 'material-ui/svg-icons/image/music-note';
// import FavoriteOutline from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import CancelFavorite from 'material-ui/svg-icons/content/remove-circle';
import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
import LinkIcon from 'material-ui/svg-icons/content/link';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ScLogo from './ScLogo';

class TrackCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modal: false, current_track_id: null, searchPlaylist: '', hoverLogo: false };
      this.mouseEnterLogo = this.mouseEnterLogo.bind(this);
      this.mouseLeaveLogo = this.mouseLeaveLogo.bind(this);
    }

    componentWillMount() {
      this.props.fetchPlaylists(this.props.auth.user.id)
    }

    favoriteHandler = () => {
      this.props.clearErrors();
      const { auth, tracks, audio, favorite } = this.props;
      const trackId = tracks[audio.current_track].id;
      const favoriteIds = favorite.map(fav => fav.id);

      if (favoriteIds.indexOf(trackId) > -1) return this.props.removeTrackFromFavorite(auth.user.id, trackId, tracks, audio.current_track);
      else if (favoriteIds.indexOf(trackId) == -1) return this.props.addTrackToFavorite(auth.user.id, trackId);

    }

    addTrackToPlaylist = () => {
      this.props.clearErrors();
      const { tracks, audio } = this.props;
      const trackId = tracks[audio.current_track].id;
      this.setState({ current_track_id: trackId })
      this.setState({ modal: true })
    }

    handleCloseModal = () => this.setState({ modal: false })
    handleUpdateInput = (searchPlaylist) => this.setState({ searchPlaylist })
    handleNewRequest = () => {
      let playlistToAdd = this.props.playlists.filter(pl => pl.title == this.state.searchPlaylist);

      if (playlistToAdd.length == 0) {
        this.props.addFavoriteToNewPlaylist(this.props.auth.user.id, this.state.current_track_id, this.state.searchPlaylist)
        .then(() => this.handleCloseModal())
      } else {
        this.props.addFavoriteToPlaylist(this.props.auth.user.id, this.state.current_track_id, playlistToAdd[0].id )
        .then(() => this.handleCloseModal())
      }
      this.setState({ searchPlaylist: '' })
    }

    mouseEnterLogo () {
      this.setState({ hoverLogo: true })
    }
    mouseLeaveLogo () {
      this.setState({ hoverLogo: false })
    }

    renderSCLogo = () => {
      if (this.state.hoverLogo) return (<a className="row middle-xs" style={{textDecoration: 'none'}} target="_blank" href="https://soundcloud.com" onMouseEnter={this.mouseEnterLogo} onMouseLeave={this.mouseLeaveLogo}><ScLogo style={{fill: 'rgb(255, 65, 0)'}} /></a>);

      return (<a className="row middle-xs" style={{textDecoration: 'none'}} target="_blank" href="https://soundcloud.com" onMouseEnter={this.mouseEnterLogo} onMouseLeave={this.mouseLeaveLogo}><ScLogo style={{fill: 'rgba(0, 0, 0, 0.3)'}} /></a>)
    }

    renderIconMenu = () => {
      const { tracks, audio, favorite, playlists } = this.props;
      const currentTrack = tracks[audio.current_track];
      const favoriteIds = favorite.map(fav => fav.id);

      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon color="rgba(0, 0, 0, 0.3)" /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        {
          currentTrack && favoriteIds.indexOf(currentTrack.id) > -1 ?
            <MenuItem primaryText="Dislike" leftIcon={<CancelFavorite color="#D32F2F"/>} onTouchTap={this.favoriteHandler}/>
            :
            <MenuItem primaryText="Like" leftIcon={<Favorite color="#D32F2F"/>} onTouchTap={this.favoriteHandler}/>
        }

          <MenuItem primaryText="Add to Playlist" leftIcon={<PlaylistAdd hoverColor="#4CAF50" />} onTouchTap={this.addTrackToPlaylist}/>

          <a style={{textDecoration: 'none'}} target="_blank" href={currentTrack ? currentTrack.permalink_url: ''}><MenuItem primaryText="Link" leftIcon={<LinkIcon color="rgb(255, 65, 0)" />} /></a>
        </IconMenu>
      )
    }


    render () {
      const { tracks, audio, favorite, playlists } = this.props;
      const currentTrack = tracks[audio.current_track];
      const favoriteIds = favorite.map(fav => fav.id);
      const playlistTitles = playlists.map(pl => pl.title);
      return (
        <section>
          <Card style={{padding: 0, marginBottom: '5vh'}} >
            { currentTrack && currentTrack.artwork_url ? <img src={ currentTrack.artwork_url} style={{height: '40vh', width: '100%', margin: 0, padding: 0}} className="row center-md center-xs box-shadow"/>
                : <BlankArtwork color="rgba(0, 0, 0, 0.3)" style={{height: '40vh', width: '100%'}} className="row center-xs"/>
            }

            <CardTitle
              title={currentTrack ? currentTrack.title : '' }
              subtitle={currentTrack ?
                <div>
                  <div className="row middle-xs"><div className="col-xs-12"><a href={currentTrack.user.permalink_url} target="_blank" style={{textDecoration: 'none', color: 'rgba(0, 0, 0, 0.3)'}}>{currentTrack.user.username}</a></div></div>
                  <div className="row middle-xs">
                    <div className="col-xs-3">
                      <div className="row middle-xs"><Play color="rgba(0, 0, 0, 0.3)" style={{marginRight: '1vh'}} />{currentTrack.playback_count.toLocaleString()}</div>
                    </div>
                    <div className="col-xs-3">
                      <div className="row middle-xs"><Favorite color="rgba(0, 0, 0, 0.3)" style={{marginRight: '1vh'}} />{currentTrack.favoritings_count.toLocaleString()}</div>
                    </div>
                    <div className="col-xs-3">
                      { this.renderSCLogo() }
                    </div>
                    <div className="col-xs-3"><div className="row end-xs">{this.renderIconMenu()}</div></div>
                  </div>
                </div>
              : ''} />
          </Card>


          <Dialog
            title='ADD TO MY (NEW) PLAYLIST'
            titleStyle={{textAlign: 'center'}}
            modal={false}
            open={this.state.modal}
            onRequestClose={this.handleCloseModal}
          >

            <AutoComplete
              fullWidth={true}
              hintText="Select your playlist or create a new one"
              searchText={this.state.searchPlaylist}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              dataSource={playlistTitles}
              filter={(searchPlaylist, key) => (key.toLowerCase().indexOf(searchPlaylist.toLowerCase()) !== -1)}
              openOnFocus={true}
            />

            { this.props.errors.playlistError ? <div className="row center-xs"><p style={{fontWeight: 300, color: '#F44336'}}>{this.props.errors.roomnameError}</p></div>
            : ''}

          </Dialog>

        </section>


      )
    }
}

const styles={}

const mapStateToProps = ({ auth, audio, favorite, playlists, errors }) => ({ auth, audio, favorite, playlists, errors });
export default connect(mapStateToProps, { addTrackToFavorite, removeTrackFromFavorite, fetchPlaylists, addFavoriteToNewPlaylist, addFavoriteToPlaylist, clearErrors }) (TrackCard);
