import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import "./content.css";
import { getFeatured } from "../../actions/movieActions";
import { authUser, checkUserVote, vote } from "../../actions/userActions";
import fbIcon from "../../assets/icons/icons8-facebook-50.png";

class Favourite extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props.dispatch(getFeatured());
    this.props.dispatch(authUser()).then(response => {
      this.setState({ isLoading: false });
    });
    this.props.dispatch(checkUserVote());
  }

  voteUser = (id, user) => {
    this.props
      .dispatch(vote(id, user))
      .then(() => this.props.dispatch(checkUserVote()));
  };

  render() {
    let user = this.props.isUser;
    let shows = this.props.isMovies.favourite ? (
      this.props.isMovies.favourite.map(show => (
        <div key={show._id} className="favourite">
          <iframe
            width={`100%`}
            height={`350`}
            src={show.videoLink}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="title_fav left">{show.title}</div>
          <div className="right">
            {!user.userData.isUserAuth ? (
              <a href="auth/facebook">
                <Button>
                  <div
                    style={{
                      background: `url(${fbIcon}) no-repeat`,
                      width: "44px",
                      height: "46px"
                    }}
                  />
                  <div>to vote</div>
                </Button>
              </a>
            ) : user.checkVote.isVote ? (
              <Button
                onClick={() => this.voteUser(show._id, user.userData.profileId)}
              >
                Vote
              </Button>
            ) : (
              <div className="error">You cannot vote at this time</div>
            )}
          </div>
        </div>
      ))
    ) : (
      <div className="loader">
        <CircularProgress thickness={7} style={{ color: "98c5e9" }} />
      </div>
    );
    return <div className="shows_fav">{shows}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isMovies: state.movie,
    isUser: state.user
  };
};

export default connect(mapStateToProps)(Favourite);
