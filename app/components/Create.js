import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPlayroom } from '_actions/playroom'
import { duplicatedRoomname, clearErrors } from '_actions/error'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash'
import Footer from './Footer'


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { roomname: '', accessKey: '', creator: this.props.auth.user }
  }

  changeInput = (e, prop) => this.setState({ [prop]: e.target.value })

  createPlayroom = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    const { roomname, accessKey, creator } = this.state;
    if (_.map(this.props.playrooms, pl => pl.roomname).indexOf(roomname) > -1) this.props.duplicatedRoomname();
    else return this.props.createPlayroom(roomname, accessKey, creator)
  }

  render() {
    return(
      <section className="col-xs-offset-2 col-xs-8" style={{paddingTop: '10vh'}}>

        <div className="row center-xs"><h1 style={{fontSize: '2rem'}}>CREATE PLAYROOM</h1></div>
        <div className="row center-xs"><p style={{fontWeight: 300}}>Create your own playroom invite your friends!</p></div>

        <form onSubmit={(e) => this.createPlayroom(e)}>

          <div className="row center-xs">
            <TextField
              hintText="Be creative!"
              floatingLabelText="Room Title"
              onChange={(e) => this.changeInput(e, 'roomname')}
            />
          </div>

          <div className="row center-xs">
            <TextField
              hintText="Enter 4-digit passcode"
              floatingLabelText="Passcode"
              type="password"
              onChange={(e) => this.changeInput(e, 'accessKey')}
            />
          </div>

          { this.props.errors.roomnameError ?
            <div className="row center-xs"><p style={{fontWeight: 300, color: '#F44336'}}>{this.props.errors.roomnameError}</p></div>
          : ''}

          <div className="row center-xs" style={{marginTop: '5vh'}}><RaisedButton label="CREATE" primary={true} style={{margin: 12}} type="submit"/></div>

        </form>

        <div className="row center-xs" style={{marginTop: '35vh'}}><div className="col-xs-12"><Footer /></div></div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth, playrooms, errors }) => ({ auth, playrooms, errors })
export default connect(mapStateToProps, { createPlayroom, duplicatedRoomname, clearErrors }) (Create);
