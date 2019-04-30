import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./utils.css";
import { adminLink } from "./misc";
import { logoutAdmin } from "../../actions/adminActions";

class SideDrawer extends Component {
  signoutHandler = () => {
    this.props.dispatch(logoutAdmin()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  renderLinks = () =>
    adminLink.map(link => (
      <Link key={link.title} to={link.linkTo} onClick={this.props.close}>
        <ListItem>
          {link.title === "Signout" ? (
            <Button onClick={this.signoutHandler}>{link.title}</Button>
          ) : (
            <Button>{link.title}</Button>
          )}{" "}
        </ListItem>
      </Link>
    ));
  render() {
    let attachedCSS = ["sideDrawer", "close"];
    if (this.props.show) {
      attachedCSS = ["sideDrawer", "open"];
    }

    return (
      <div className={attachedCSS.join(" ")} onClick={this.props.close}>
        {this.renderLinks()}
      </div>
    );
  }
}

export default connect()(withRouter(SideDrawer));
