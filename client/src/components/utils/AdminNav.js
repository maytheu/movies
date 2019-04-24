import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import './utils.css'
import { adminLink } from "./misc";

const AdminNav = () => {
  const renderLinks = () =>
    adminLink.map(link => (
      <Link key={link.title} to={link.linkTo}>
        <ListItem>
          <Button>{link.title}</Button>
        </ListItem>
      </Link>
    ));
  return <div className='link'>{renderLinks()}</div>;
};

export default AdminNav;
