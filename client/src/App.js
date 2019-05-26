import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import AuthCheck from "./components/hoc/AuthCheck";
import Layout from "./components/hoc/Layout";
import Signin from "./components/admin/auth/Signin";
import VerifyEmail from "./components/admin/auth/VerifyEmail";
import ConfirmPasssword from "./components/admin/auth/ConfirmPasssword";
import NowShowing from "./components/admin/NowShowing";
import Featured from "./components/admin/Featured";
import About from "./components/admin/About";
import Votes from "./components/admin/Votes";
import Home from "./components/content/Home";
import Favourite from "./components/content/Favourite";
import Paystack from "./components/content/Paystack";
import UserAuth from "./components/hoc/UserAuth";
import Contact from "./components/content/Contact";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/signin" exact component={AuthCheck(Signin, false)} />
          <Route
            path="/verify_email"
            exact
            component={AuthCheck(VerifyEmail, false)}
          />
          <Route
            path="/reset_password/:token"
            exact
            component={AuthCheck(ConfirmPasssword, false)}
          />
          <Route
            path="/admin/now_showing"
            exact
            component={AuthCheck(NowShowing, true)}
          />
          <Route
            path="/admin/featured"
            exact
            component={AuthCheck(Featured, true)}
          />
          <Route path="/admin/about" exact component={AuthCheck(About, true)} />
          <Route path="/admin/vote" exact component={AuthCheck(Votes, true)} />
          <Route path="/contact" exact component={UserAuth(Contact)} />
          <Route path="/favourite" exact component={UserAuth(Favourite)} />
          <Route path="/buy" exact component={UserAuth(Paystack, true)} />
          <Route path="/" exact component={UserAuth(Home)} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
