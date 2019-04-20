import React from "react";

import Header from "../header_footer/Header";

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
