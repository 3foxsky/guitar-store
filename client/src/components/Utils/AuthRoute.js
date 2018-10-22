import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { auth } from '../../actions/user';

import Loader from '../common/Loader';

class AuthRoute extends Component {
  componentDidMount() {
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
              !privateRoute || user.isAuth ? (
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

export default connect(
  ({user}) => ({
    loading: user.isLoading,
    user, 
  }),
  {auth}
)
(AuthRoute);