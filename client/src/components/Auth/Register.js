import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../common/Input';
import Loader from '../common/Loader';

import { registerUser, clearRegister } from '../../actions/user';

const re = 
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = ({
  history,
  isLoading,
  error,
  registerSuccess,
  // func
  clearRegister,
  //? formik props
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  const redirectToLogin = () => {
    setTimeout(() => {
      history.push('/login');
      clearRegister();
    }, 2000);
  };

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container flex-col">
          <div className="left">
            <form onSubmit={handleSubmit}>
              <h2>Personal information</h2>
              <div className="form_block_two">
                <div className="block">
                  <Input
                    onChange={handleChange}
                    name={'firstName'}
                    placeholder="Enter you firstName"
                    onBlur={handleBlur}
                    error={errors.firstName}
                    touched={touched.firstName}
                    value={values.firstName}
                  />
                </div>
                <div className="block">
                  <Input
                    onChange={handleChange}
                    name={'lastName'}
                    placeholder="Enter you lastName"
                    onBlur={handleBlur}
                    error={errors.lastName}
                    touched={touched.lastName}
                    value={values.lastName}
                  />
                </div>
              </div>
              <div>
                <Input
                  onChange={handleChange}
                  name={'email'}
                  placeholder="Enter you email"
                  type="email"
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  value={values.email}
                />
              </div>
              <h2>Verify password</h2>
              <div className="form_block_two">
                <div className="block">
                  <Input
                    onChange={handleChange}
                    type="password"
                    name={'password'}
                    placeholder="Enter you password"
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    value={values.password}
                  />
                </div>
                <div className="block">
                  <Input
                    onChange={handleChange}
                    type="password"
                    name={'confirmPassword'}
                    placeholder="Confirm your password"
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    value={values.confirmPassword}
                  />
                </div>
              </div>
              <div>
                { registerSuccess && !isLoading ? 
                  <React.Fragment>
                    {redirectToLogin()}
                    <Dialog open={true}>
                      <div className="dialog_alert">
                        <div className="text-green">Congratulations !!</div>
                        <div>
                        You will be redirected to the LOGIN in a couple seconds...
                        </div>
                      </div>
                    </Dialog>
                  </React.Fragment>
                  : 
                  <div className="error_label">
                    {error}
                  </div>
                }  
                <button onClick={handleSubmit} type="submit">
                  Create an account
                </button>
              </div>
            </form>
          </div>
          { isLoading ? <Loader/> : null }  
        </div>
      </div>
    </div>
  );
};

const HOC = withFormik({
  mapPropsToValues: () => ({   
    email: 'ok@ok.com',
    password: 'qwe123',
    confirmPassword: 'qwe123',
    firstName: 'and',
    lastName: '',
    sumbitSuccess: false, 
  }),
  validate: values => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = 'Required';
    } else if (!re.test(String(values.email).toLowerCase())) {
      errors.email = 'Email is not valid';
    }
    if (!values.password.trim()) {
      errors.password = 'Field is required';
    } else if (values.password.length < 6){
      errors.password = 'Password must be at least 6 characters';
    } else if (
      !values.password && 
      !values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors.password = 'Password are not the same';
    }

    if (!values.confirmPassword.trim()){
      errors.confirmPassword = 'Field is required';
    }

    if (!values.firstName.trim()) {
      errors.firstName = 'Field is required';
    }

    if (!values.lastName.trim()) {
      errors.lastName = 'Field is required';
    }

    return errors;
  },

  handleSubmit: (values, {props: {location, history, registerUser, isLoading}, setValues}) => {
    registerUser(values); 
  },
  validateOnChange: false,
  displayName: 'RegisterForm',
})(Register);

export default connect(
  ({user}) => ({
    registerSuccess: user.register.success,
    error: user.register.error,
    isLoading: user.register.isLoading,
  }),
  {
    registerUser,
    clearRegister,
  }
)(HOC);
