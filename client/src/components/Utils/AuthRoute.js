import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../actions/user';

import Loader from '../common/Loader';
import createHistory from 'history/createBrowserHistory';


class AuthRoute extends Component {
  componentDidMount() {
    const history = createHistory();
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.auth();
    });
    this.props.auth();
  }
  
  render() {
    const { component: Component, user, privateRoute, loading, ...rest } = this.props;
    return (
      <React.Fragment>
        {loading ?
          <Loader/>
          :
          <Route
            {...rest}
            render={props =>
              !privateRoute || user.userData.isAuth ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )
            }
          />}
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  ({user}) => ({
    loading: user.isLoading,
    user, 
  }),
  {auth}
)
(AuthRoute));
