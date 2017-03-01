import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFavoriteTracks } from '_actions/favorite'
import { resetPlayroom } from '_actions/playroom'
import TrackTable from '_components/TrackTable'
import TrackCard from '_components/TrackCard'


class Favorite extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.resetPlayroom();
    this.props.fetchFavoriteTracks(this.props.auth.user.id)
  }

  render() {
    return (
      <section className="col-md-offset-1 col-md-10 col-xs-12">
        <div className="row" style={{height: '10vh'}}></div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <TrackCard tracks={this.props.favorite} favorite={this.props.favorite}  />
          </div>
          <div className="col-md-6 col-xs-12">
            <TrackTable tracks={this.props.favorite} />
          </div>
        </div>
      </section>
    )
  }
}


const mapStateToProps = ({ auth, favorite }) => ({ auth, favorite })
const mapDispatchToProps = { fetchFavoriteTracks, resetPlayroom }
export default connect(mapStateToProps, mapDispatchToProps) (Favorite);
