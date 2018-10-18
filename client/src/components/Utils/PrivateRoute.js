import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../actions/user';

import Loader from '../common/Loader';

class PrivateRoute extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.props.dispatch(auth())
      .then(res => {
        this.setState({
          loading: false
        });
        // //! CHANGE TO CORRECT RESPONSE 
        // if (res.success) {
        //   this.setState({
        //     loading: false
        //   });
        // }
      });
  }
  
  render() {
    const { component: Component, isAuth, ...rest } = this.props;
    return (
      <React.Fragment>
        this.state.loading ?
        <Loader />
        :
        <Route
          {...rest}
          render={props =>
            isAuth ? (
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
        />
      </React.Fragment>
    );
  }
}

export default connect(
  ({user}) => ({
    isAuth: user.isAuth,
    user, 
  })
)
(PrivateRoute);
