import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import store from '../store';
import { changePlayroom, fetchPlayroom } from '_actions/playroom'
import { resetCurrentTrack } from '_actions/audio'
import TrackCard from '_components/TrackCard'
import TrackTable from '_components/TrackTable'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Refresh from 'material-ui/svg-icons/navigation/refresh';

class Playroom extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changePlayroom(this.props.location.pathname, this.props.ploc.current, this.props.params.roomId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname != this.props.ploc.current) this.props.changePlayroom(this.props.location.pathname, this.props.ploc.current, this.props.params.roomId);
  }

  render() {
    const { playroom, audio } = this.props;

    return (
      <section className="col-md-offset-1 col-md-10 col-xs-12">
        <div className="row" style={{height: '10vh'}}></div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <TrackCard tracks={audio.tracks ? audio.tracks : []} favorite={this.props.favorite} />
          </div>
          <div className="col-md-6 col-xs-12">
            <TrackTable tracks={audio.tracks ? audio.tracks : []} room={playroom} />
          </div>
        </div>

        <FloatingActionButton style={styles.fab2} onTouchTap={() => this.props.fetchPlayroom(playroom.id)}><Refresh /></FloatingActionButton>

        <FloatingActionButton secondary={true} style={styles.fab} onTouchTap={() => store.dispatch(push('/sharetracks'))}><ContentAdd /></FloatingActionButton>

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
  },
  fab2: {
    marginRight: 20,
    position: 'fixed',
    bottom: '10vh',
    right: '5vh'
  }
}


const mapStateToProps = ({ auth, playroom, ploc, audio }) => ({ auth, playroom, ploc, audio })
export default connect(mapStateToProps, { changePlayroom, fetchPlayroom, resetCurrentTrack }) (Playroom)
