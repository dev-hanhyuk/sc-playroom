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
      <section className="col-xs-offset-1 col-xs-10" style={{paddingTop: '10vh'}}>

        <div className="row center-xs"><h1 style={{fontSize: '5rem'}}>CREATE PLAYROOM</h1></div>
        <div className="row center-xs"><p style={{fontWeight: 300, fontSize: '3rem', marginTop: 0}}>Create your own playroom</p></div>
        <div className="row center-xs"><p style={{fontWeight: 300, fontSize: '3rem', marginTop: 0}}>and invite your friends!</p></div>

        <div style={{height: '5vh'}}></div>
        <form onSubmit={(e) => this.createPlayroom(e)}>

          <div className="row" style={{fontSize: '3rem'}}><div className="col-xs-offset-1">Room Title</div></div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-10">
            <input
              onChange={(e) => this.changeInput(e, 'roomname')}
              type="text"
              autoFocus
              style={styles.input}
              placeholder="Room Title: Be creative!"
            />
            </div>
          </div>

          <div style={{height: '5vh'}}></div>
          <div className="row" style={{fontSize: '3rem'}}><div className="col-xs-offset-1">Passcode</div></div>
          <div className="row">
            <div className="col-xs-offset-1 col-xs-10">
            <input
              onChange={(e) => this.changeInput(e, 'accessKey')}
              type="password"
              style={styles.passcode}
              placeholder="Passcode: 4-digit number"
              maxLength="4"
            />
            </div>
          </div>

          { this.props.errors.roomnameError ?
            <div className="row center-xs"><p style={{fontWeight: 300, color: '#F44336'}}>{this.props.errors.roomnameError}</p></div>
          : ''}

          <div className="row center-xs" style={{marginTop: '10vh'}}>
            <div className="col-lg-6 col-sm-8">
              <RaisedButton type="submit" label="CREATE" fullWidth={true} backgroundColor="#00bbdc" labelColor="#FFF" labelStyle={{fontSize: '3rem'}} buttonStyle={{height: '5rem', borderRadius: '2.5rem'}} style={{borderRadius: '2.5rem', backgroundColor: '#00bbdc'}}/>
            </div>
          </div>

        </form>

        <div className="row center-xs" style={{marginTop: '10vh'}}><div className="col-xs-12"><Footer /></div></div>
      </section>
    )
  }
}

const styles = {
  input: {
    color: '#000',
    fontSize: '3rem',
    fontWeight: '500',
    lineHeight: '120%',
    outline: 0,
    marginTop: '2%',
    display: 'block',
    background: 0,
    border: 0,
    border: '0.3rem solid rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%'
  },
  passcode: {
    color: '#000',
    fontSize: '3rem',
    fontWeight: '500',
    lineHeight: '120%',
    outline: 0,
    marginTop: '2%',
    display: 'block',
    background: 0,
    border: '0.3rem solid rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '100%'
  }
}

const mapStateToProps = ({ auth, playrooms, errors }) => ({ auth, playrooms, errors })
export default connect(mapStateToProps, { createPlayroom, duplicatedRoomname, clearErrors }) (Create);

/*
<TextField
              hintText="Be creative!"
              floatingLabelText="Room Title"
              onChange={(e) => this.changeInput(e, 'roomname')}
            />

<TextField
              hintText="Enter 4-digit passcode"
              floatingLabelText="Passcode"
              type="password"
              onChange={(e) => this.changeInput(e, 'accessKey')}
            />

            <div className="row">Room Title</div>
            <div className="row">Passcode</div>
*/

