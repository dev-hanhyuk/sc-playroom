import React, { Component } from 'react'
import { connect } from 'react-redux'
import { play, pause } from '_actions/audio'
import { displayDuration } from '../util'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Duration from 'material-ui/svg-icons/device/access-time';
import Play from 'material-ui/svg-icons/av/play-arrow';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  playTrack = (idx) => {
    const { audio } = this.props;
    if (audio.playing && audio.current_track == idx) return this.props.pause();
    this.props.play(idx, this.props.tracks, this.props.room)
  }

  render() {
    const { tracks, audio } = this.props;
    return (
      <Table>
        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}  >
          <TableRow>
            <TableHeaderColumn style={{width: '15%'}}><p style={{fontSize: '1.5rem'}}>NO</p></TableHeaderColumn>
            <TableHeaderColumn style={{width: '45%'}}><p style={{fontSize: '1.5rem'}}>SONG</p></TableHeaderColumn>
            <TableHeaderColumn style={{width: '20%'}}><p style={{fontSize: '1.5rem'}}>GENRE</p></TableHeaderColumn>
            <TableHeaderColumn style={{width: '15%'}}><Duration style={{height: '1.5rem'}}/></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          tracks.map((track, idx) => (
            <TableRow key={track.id} onTouchTap={() => this.playTrack(idx)}>
              <TableRowColumn style={{width: '15%'}}>
                <p style={{fontSize: '1.5rem'}}>{ audio.current_track == idx ? <Play fill="#000" style={{height: '1rem'}}/> : idx+1 }</p>
              </TableRowColumn>
              <TableRowColumn style={{width: '45%'}}><p style={{fontSize: '1.5rem'}}>{track.title}</p></TableRowColumn>
              <TableRowColumn style={{width: '20%'}}><p style={{fontSize: '1.5rem'}}>{track.genre ? track.genre : 'unknown'}</p></TableRowColumn>
              <TableRowColumn style={{width: '15%'}}><p style={{fontSize: '1.5rem'}}>{displayDuration(track.duration)}</p></TableRowColumn>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    )
  }

}

const styles={
  image: {
    width: '200px',
    height: '200px',
    padding: 0
  },
  font: {
    padding: 0,
    fontSize: '0.7rem'
  }
}

const mapStateToProps = ({ audio }) => ({ audio })
export default connect(mapStateToProps, { play, pause })(Track);
