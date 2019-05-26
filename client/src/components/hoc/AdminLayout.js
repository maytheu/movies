import React, { Component } from "react";

import ToggleMenu from "../utils/ToggleMenu";
import AdminNav from "../utils/AdminNav";
import SideDrawer from "../utils/SideDrawer";

class AdminLayout extends Component {
  state = {
    isSideDrawer: false
  };

  closeSideDrawerHandler = () => {
    this.setState({ isSideDrawer: false });
  };

  sideDrawerHandler = () => {
    this.setState(prevState => {
      return { isSideDrawer: !prevState.isSideDrawer };
    });
  };

  render() {
    return (
      <div className="admin">
        <h2>
          <div className="menu_toggle">
            <ToggleMenu toggle={this.sideDrawerHandler} />
            <SideDrawer
              show={this.state.isSideDrawer}
              close={this.closeSideDrawerHandler}
            />
          </div>
          Admin Page
        </h2>
        <div className="admin_nav">
          <div className="nav_left">
            <AdminNav />
          </div>
          <div className="nav_right">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default AdminLayout;
