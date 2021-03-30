import React, { Component } from "react";
import { connect } from "react-redux";

import { contact } from "../../actions/adminActions";
import "../admin/auth/sign.css";

class Contact extends Component {
  state = { isLoading: true };

  componentDidMount() {
    this.props.dispatch(contact()).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    let contact = this.props.contact.contact;
    return (
      <div className="auth" style={{height: "100vh"}}>
        {this.state.isLoading ? (
          "Loading"
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: contact.about
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contact: state.admin
  };
}

export default connect(mapStateToProps)(Contact);
