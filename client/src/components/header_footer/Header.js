import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./header.css";

class Header extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "aqua",
          boxShadow: "none",
          padding: "10px 0",
          borderBottom: "2px solid #00285e"
        }}
      >
        <Toolbar style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="header_logo">
              <div className="header_top">Cinema</div>
              <div className="header_bottom">Centre</div>
            </div>
          </div>
          <Link to="/">
            <Button color="inherit">
              <i className="material-icons">home</i>
              <span className="button_text">Home</span>
            </Button>
          </Link>
          <Link to="/favourite">
            <Button color="inherit">
              <i className="material-icons">favorite</i>
              <span className="button_text">Favourite</span>
            </Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit">
              <i className="material-icons">contact_mail</i>
              <span className="button_text">Contact Us</span>
            </Button>
          </Link>
          <Link to="/buy">
            <Button color="inherit">
              <i className="material-icons">cart</i>
              <span className="button_text">Buy Ticket</span>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
