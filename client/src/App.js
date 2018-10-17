import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/FooterHeader/Header';
import Footer from './components/FooterHeader/Footer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header/>
          <Switch>
            <div>App</div>
          </Switch>
          {Array(15).fill(1).map((i)=> (
            <div
              style={{
                height: '200px',
                background: 'lightgrey'
              }}
            >DIV</div>
          ))}
          <Footer
            data={{}}
          />
        </React.Fragment>
      </Router>
    );
  }
}
