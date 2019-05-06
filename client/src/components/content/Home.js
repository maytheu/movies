import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./content.css";
import { getShows } from "../../actions/movieActions";

class Home extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props.dispatch(getShows()).then(response => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    let shows = this.props.isMovies.upcoming ? (
      this.props.isMovies.upcoming.map(show => (
        <div key={show._id}>
          <iframe
            width={`${window.innerWidth}`}
            height={`350`}
            src={show.videoLink}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="title">{show.title}</div>
        </div>
      ))
    ) : (
      <div className="loader">
        <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
      </div>
    );
    return <div className="shows">{shows}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isMovies: state.movie
  };
};

export default connect(mapStateToProps)(Home);
