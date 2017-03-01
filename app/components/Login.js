import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { authenticate, updateHistory } from '_actions/auth'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Footer from './Footer'


class Login extends React.Component {
    constructor(props) {
      super(props)
    }

    openAuth = () => {
      this.props.authenticate();
      this.props.updateHistory(this.props.auth.user.id);
      browserHistory.push('/main')
    }

    render () {

      return (
        <section className="col-xs-offset-3 col-xs-6" style={{paddingTop: '10vh'}}>
          <div className="row center-xs"><h1 style={{fontSize: '2rem'}}>WELCOME TO PLAYROOM</h1></div>
          <div className="row center-xs"><p style={{fontWeight: 300}}>Share your favorite songs with your friends!</p></div>

          <div style={{height: '10vh'}}></div>

          <div className="row center-xs">
            <FloatingActionButton backgroundColor="rgb(255, 65, 0)" onTouchTap={this.openAuth}><p style={{color: '#FFF', padding: 0, margin: 0}}>ENTER</p></FloatingActionButton>
          </div>

          <div className="row center-xs" style={{marginTop: '10vh'}}><div className="col-xs-12"><Footer /></div></div>

        </section>
      )
    }
}

const styles={}


const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { authenticate, updateHistory }) (Login)