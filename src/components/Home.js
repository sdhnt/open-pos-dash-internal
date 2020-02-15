import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './main/dashboard/Dashboard';
import Business from './main/business/Business';

const Home = () => (
  <Router>
    <Switch>
      <Route path="/details/:id">
        <Business />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  </Router>
);

export default Home;
