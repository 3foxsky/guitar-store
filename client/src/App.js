import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/FooterHeader/Header';
import Footer from './components/FooterHeader/Footer';
import PrivateRoute from './components/common/PrivateRoute';

import Profile from './components/User/Profile';
import HomeContainer from './components/Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header/>
          <Switch>
            <PrivateRoute path="/profile" component={Profile}/> 
            <Route path="/" exact component={HomeContainer} />
          </Switch>
          <Footer
            data={{}}
          />
        </React.Fragment>
      </Router>
    );
  }
}
