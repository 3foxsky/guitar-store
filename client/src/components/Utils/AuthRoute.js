import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../actions/user';

import Loader from '../common/Loader';
import createHistory from 'history/createBrowserHistory';


class AuthRoute extends Component {
  state = {
    from: ''
  }

  componentDidMount() {
    const history = createHistory();

    this.unlisten = this.props.history.listen((location, action) => {
      this.props.auth();
      this.setState({
        from: this.props.location.pathname
      });
    });
    this.props.auth();
  }

  componentDidUpdate(prevProps, prevState) {
    const {from} = this.state;
    if (prevProps.isAuth == false && this.props.isAuth === true) {
      this.props.history.push(from);
    }  
  }
  
  render() {
    const { component: Component, isAuth, privateRoute, loading, ...rest } = this.props;
    return (
      <React.Fragment>
        {loading ?
          <Loader/>
          :
          <Route
            {...rest}
            render={props =>
              !privateRoute || isAuth ? (
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
    isAuth: user.userData.isAuth, 
  }),
  {auth}
)
(AuthRoute));
