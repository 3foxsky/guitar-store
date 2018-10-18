import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/FooterHeader/Header';
import Footer from './components/FooterHeader/Footer';
import PrivateRoute from './components/Utils/PrivateRoute';

import Profile from './components/User/Profile';
import HomeContainer from './components/Home';
import Login from './components/Auth/index';
import Register from './components/Auth/Register';
import NotFound from './components/Utils/NotFound';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header/>
          <Switch>
            <PrivateRoute path="/profile" component={Profile}/> 
            <Route path="/" exact component={HomeContainer} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}
