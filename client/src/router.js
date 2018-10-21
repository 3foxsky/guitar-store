import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/FooterHeader/Header';
import Footer from './components/FooterHeader/Footer';
import AuthRoute from './components/Utils/AuthRoute';

import Profile from './components/User/Profile';
import HomeContainer from './components/Home';
import Login from './components/Auth/index';
import Register from './components/Auth/Register';
import NotFound from './components/Utils/NotFound';
import Shop from './components/Shop';

import Loader from './components/common/Loader';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id="wrapper">
          <div className="content">
            <Header/>
            <Switch>
              <AuthRoute path="/profile" component={Profile} privateRoute={true} />
              {/* <AuthRoute path="/profile/dashboard" privateRoute={true} />
              <AuthRoute path="/profile/user-profile" privateRoute={true} /> */}

              {/* <AuthRoute path="/admin/manage-categories" privateRoute={true} />
              <AuthRoute path="/admin/add-product" privateRoute={true} />
              <AuthRoute path="/admin/site-info" privateRoute={true} /> */}

              <AuthRoute path="/" exact component={HomeContainer} privateRoute={false} />
              <AuthRoute path="/login" component={Login} privateRoute={false} />
              <AuthRoute path="/register" component={Register} privateRoute={false} />
              <Route path="/loader" component={Loader} />
              <AuthRoute path="/shop" component={Shop} privateRoute={false} />
              {/* <AuthRoute path="/product/:id" component={Shop} privateRoute={false} /> */}
              <AuthRoute component={NotFound} privateRoute={false} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}


// path="/user/dashboard"
// path="/user/cart" 
// path="/user/user_profile"
// path="/admin/add_product"
// path="/admin/manage_categories"
// path="/admin/site_info"


// path="/product_detail/:id"
// path="/register" 
// path="/register_login" 
// path="/shop" 
// path="/" 