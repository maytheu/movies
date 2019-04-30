import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { authAdmin } from "../../actions/adminActions";

export default function(ComposedClass, reload) {
  class AuthCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(authAdmin()).then(response => {
        let admin = this.props.isAdmin.adminData;
        if (!admin.isAdminAuth) {
          if (reload) {
            this.props.history.push("/signin");
          }
        } else {
          if (reload === false) {
            this.props.history.push("/admin/now_showing");
          }
          // this.props.history.push("/admin/now_showing");
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
      return <ComposedClass {...this.props} user={this.props.isAdmin} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAdmin: state.admin
    };
  }

  return connect(mapStateToProps)(AuthCheck);
}
