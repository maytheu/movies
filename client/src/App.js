import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
import Layout from './components/hoc/Layout';
import Signin from './components/admin/Signin';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/signin' component={Signin} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
