import React, { Component } from "react";
import { Switch } from "react-router-dom";

import "./App.css";
import Layout from "./components/hoc/Layout";
import Signin from "./components/admin/auth/Signin";
import VerifyEmail from "./components/admin/auth/VerifyEmail";
import ConfirmPasssword from "./components/admin/auth/ConfirmPasssword";
import NowShowing from "./components/admin/NowShowing";
import Featured from "./components/admin/Featured";
import Votes from "./components/admin/Votes";
import PrivateRoute from "./components/admin/auth/authRoutes/PrivateRoute";
import PublicRoute from "./components/admin/auth/authRoutes/PublicRoute";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <PublicRoute user={false} path="/signin" exact component={Signin} />
          <PublicRoute user={true} path="/verify_email" exact component={VerifyEmail} />
          <PublicRoute user={false} path="/confirm_password" exact component={ConfirmPasssword} />
          <PrivateRoute user={true} path="/admin/now_showing" exact component={NowShowing} />
          <PrivateRoute user={false} path="/admin/featured" exact component={Featured} />
          <PrivateRoute user={true} path="/admin/vote" exact component={Votes} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
