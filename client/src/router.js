import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/FooterHeader/Header';
import Footer from './components/FooterHeader/Footer';
import AuthRoute from './components/Utils/AuthRoute';

import HomeContainer from './components/Home';
import Login from './components/Auth/index';
import Register from './components/Auth/Register';
import NotFound from './components/Utils/NotFound';
import Shop from './components/Shop';
import ProductPage from './components/Product';
// user
import User from './components/User';

import Upload from './components/Upload';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <div className="content">
            <Header/>
            <Switch>
              <AuthRoute path="/user" component={User} privateRoute={true} />

              {/* <AuthRoute path="/admin/manage-categories" privateRoute={true} />
              <AuthRoute path="/admin/add-product" privateRoute={true} />
              <AuthRoute path="/admin/site-info" privateRoute={true} /> */}
              <AuthRoute path="/upload" component={Upload} privateRoute={false}/>
              <AuthRoute path="/" exact component={HomeContainer} privateRoute={false} />
              <AuthRoute path="/login"  component={Login} privateRoute={false} />
              <AuthRoute path="/register" component={Register} privateRoute={false} />
              <AuthRoute path="/shop" component={Shop} privateRoute={false} />
              <AuthRoute path="/product-detail/:id" exact privateRoute={false} component={ProductPage} />
              <AuthRoute component={NotFound} privateRoute={false} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
