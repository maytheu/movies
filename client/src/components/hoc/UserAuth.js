import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { authUser, checkUserVote } from "../../actions/userActions";

export default function(ComposedClass, reload) {
  class UserAuth extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(checkUserVote());
      this.props.dispatch(authUser()).then(response => {
        let user = this.props.isUser.userData;
        if (!user.isUserAuth) {
          if (reload) {
            this.props.history.push("/favourite");
          }
        }
        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={this.props.isUser} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isUser: state.user
    };
  }

  return connect(mapStateToProps)(UserAuth);
}
