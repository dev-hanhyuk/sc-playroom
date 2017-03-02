import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { authenticate, updateHistory } from '_actions/auth'
import RaisedButton from 'material-ui/RaisedButton';
import Footer from './Footer'


class Login extends React.Component {
    constructor(props) {
      super(props)
    }

    openAuth = () => {
      this.props.authenticate();
      // this.props.updateHistory(this.props.auth.user.id);
      // browserHistory.push('/main')
    }

    render () {

      return (
        <section className="col-xs-offset-1 col-xs-10" style={{paddingTop: '20vh'}}>
          <div className="row center-xs"><h1 style={{fontSize: '5rem'}}>WELCOME TO PLAYROOM</h1></div>
          <div className="row center-xs"><p style={{fontWeight: 300, fontSize: '3rem'}}>Share your favorite songs with your friends!</p></div>

          <div style={{height: '10vh'}}></div>

          <div className="row center-xs">
            <div className="col-lg-6 col-sm-12">
              <RaisedButton label="Enter" fullWidth={true} backgroundColor="rgb(255, 65, 0)" onTouchTap={this.openAuth} labelColor="#FFF" labelStyle={{fontSize: '3rem'}} buttonStyle={{height: '5rem', borderRadius: '2.5rem'}} style={{borderRadius: '2.5rem', backgroundColor: 'rgb(255, 65, 0'}}/>
            </div>
          </div>

          <div className="row center-xs" style={{marginTop: '10vh'}}><div className="col-xs-12"><Footer /></div></div>

        </section>
      )
    }
}

const styles={}


const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { authenticate, updateHistory }) (Login)
//<FloatingActionButton  style={{height: '10vh', width: '10vh'}}><p style={{color: '#FFF', padding: 0, margin: 0}}>ENTER</p></FloatingActionButton>