import "materialize-css/dist/css/materialize.min.css";
import React from "react";

import Header from "../header_footer/Header";
import Footer from "../header_footer/Footer";

const Layout = props => {
  return (
    <div>
      <Header />
      <div className="layout">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
