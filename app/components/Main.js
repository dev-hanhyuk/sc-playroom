import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { fetchAllPlayrooms, enterPlayroom } from '_actions/playroom'
import { fetchFavoriteTracks } from '_actions/favorite'
import {List, ListItem} from 'material-ui/List';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Footer from './Footer'
import _ from 'lodash'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queryRoom: '', accessKey: '', queriedPlayrooms: [], modal: false, selectedPlayroom: {}, hoverListItem: null }
  }

  componentWillMount() {
    this.props.fetchFavoriteTracks(this.props.auth.user.id);
    this.props.fetchAllPlayrooms();
  }

  changeQueryPlayroom = (e) => {
    this.setState({ queryRoom: e.target.value });
    const queriedPlayrooms = _.filter(this.props.playrooms, (playroom) => playroom.roomname.startsWith(e.target.value));
    this.setState({ queriedPlayrooms });
  }

  changeAccessKey = (e) => this.setState({ accessKey: e.target.value });

  enterPlayroom = (e) => {
    e.preventDefault();
    this.props.enterPlayroom(this.props.auth.user.id, this.state.selectedPlayroom.id, this.state.accessKey);
  }

  enterPlayroomModal = (playroom) => {
    this.setState({ selectedPlayroom: playroom });
    this.setState({ modal: true })
  }

  handleCloseModal = () => this.setStatus({ modal: false })

  mouseEnterListItem = (roomId) => this.setState({ hoverListItem: roomId })
  mouseLeaveListItem = () => this.setState({ hoverListItem: null })

  renderQueryResult = () => {
    return this.state.queriedPlayrooms.map(playroom => (
      <ListItem key={playroom.id}
        primaryText={playroom.roomname}
        secondaryText={playroom.creator.username}
        rightIcon={this.state.hoverListItem == playroom.id ? <PlayCircleFilled color="rgb(255, 65, 0)" /> :<PlayCircleOutline />}
        onTouchTap={() => this.enterPlayroomModal(playroom)}
        onMouseEnter={() => this.mouseEnterListItem(playroom.id)}
        onMouseLeave={this.mouseLeaveListItem}
        hoverColor="rgba(0, 0, 0, 0.02)"
      />
    ))
  }

  render() {
    return (
      <section className="col-xs-offset-3 col-xs-6" style={{paddingTop: '10vh'}}>
        <div className="row center-xs"><h1 style={{fontSize: '2rem'}}>WELCOME TO PLAYROOM</h1></div>
        <div className="row center-xs"><p style={{fontWeight: 300}}>Share your favorite songs with your friends!</p></div>

        <div className="row center-xs" style={{marginTop: '5vh'}}>
          <input
            onChange={this.changeQueryPlayroom}
            id="queryPlayroom" type="text"
            autoFocus
            style={styles.input}
            placeholder="search playrooms"
          />
        </div>

        { this.state.queryRoom.length > 2 ?
          <div>
            <div className="row center-xs"><p>We've found {this.state.queriedPlayrooms.length} related playrooms</p></div>
            <List>{this.renderQueryResult()}</List>
          </div>
          : ''}


        <Dialog
            title="4-digit Passcode"
            titleStyle={{textAlign: 'center'}}
            modal={false}
            open={this.state.modal}
            onRequestClose={this.handleCloseModal}
          >
            <div className="row center-xs" style={{marginTop: '2vh'}}>Enter 4-digit Passcode to access {this.state.selectedPlayroom.roomname}!</div>

            <form onSubmit={e => this.enterPlayroom(e)}>
              <div className="row center-xs" style={{marginTop: '5vh'}}>
                <TextField
                  hintText="Enter 4-digit passcode"
                  floatingLabelText="Passcode"
                  type="password"
                  onChange={(e) => this.setState({accessKey: e.target.value })}
                />
              </div>
              <div className="row center-xs" style={{marginTop: '5vh'}}><RaisedButton label="ENTER" primary={true} style={{margin: 12}} type="submit" /></div>
            </form>

          </Dialog>


          <div className="row center-xs" style={{marginTop: '30vh'}}><div className="col-xs-12"><Footer /></div></div>

        <FloatingActionButton secondary={true} style={styles.fab} onTouchTap={() => browserHistory.push('/create')}><ContentAdd /></FloatingActionButton>


      </section>
    )
  }
}

const styles = {
  input: {
    color: '#000',
    fontSize: '2rem',
    fontWeight: '500',
    lineHeight: '120%',
    outline: 0,
    marginTop: '5%',
    display: 'block',
    background: 0,
    border: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    textAlign: 'center'
  },
  fab: {
    marginRight: 20,
    position: 'fixed',
    bottom: '5vh',
    right: '5vh'
  }
}

const mapStateToProps = ({ auth, playrooms }) => ({ auth, playrooms });
export default connect(mapStateToProps, { fetchFavoriteTracks , fetchAllPlayrooms, enterPlayroom }) (Main);