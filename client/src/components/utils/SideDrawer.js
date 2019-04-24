import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import "./utils.css";
import { adminLink } from "./misc";

const SideDrawer = props => {
  let attachedCSS = ["sideDrawer", "close"];
  if (props.show) {
    attachedCSS = ["sideDrawer", "open"];
  }
  const renderLinks = () =>
    adminLink.map(link => (
      <Link key={link.title} to={link.linkTo} onClick={props.close}>
        <ListItem>
          <Button>{link.title}</Button>
        </ListItem>
      </Link>
    ));
  return (
    <div className={attachedCSS.join(" ")} onClick={props.close}>
      {renderLinks()}
    </div>
  );
};

export default SideDrawer;
