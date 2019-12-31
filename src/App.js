import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './components/main/Login';
import Dashboard from './components/main/Dashboard';
import './App.css';

const auth = {
  isAuthenticated: false,
  authenticate(callback) {
    auth.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    auth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const App = () => {
  if (process.env.NODE_ENV === 'development') {
    return <Dashboard />;
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login auth={auth} />
          </Route>
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
