import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import Input from '../common/Input';

import { loginUser } from '../../actions/user';

const re =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = ({
  loginSuccess,
  //? formik props
  values,
  touched,
  errors,
  submitCount,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <div className="signin_wrapper">
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Enter you email"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          value={values.email}
          error={errors.email}
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter you password"
          onBlur={handleBlur}
          onChange={handleChange}
          touched={touched.password}
          value={values.password}
          error={errors.password}
        />

        { values.formError ?
          <div className="error_label">
            Please check your data
          </div>
          :null}
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
};


const HOC = withFormik({
  mapPropsToValues: () => ({   
    email: '',
    password: '',
    formError: false,
  }),
  validate: values => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = 'Required';
    } else if (!re.test(String(values.email).toLowerCase())) {
      errors.email = 'Email is not valid';
    }
    if (values.password.length < 6){
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  },

  handleSubmit: ({email, password}, {props, props: {location, history}, setValues}) => {
    props.loginUser({
      email,
      password
    })
      .then( data => {
        console.log(data);
        if(data && data.success){
          history.goBack();
        }else{
          setValues({
            email,
            password,
            formError: true
          });
        }
      });
  },
  validateOnChange: false,
  displayName: 'LoginForm',
})(Login);

export default connect(
  ({user}) => ({
    loginSuccess: user.loginSuccess,
  }),
  {
    loginUser
  }
)(withRouter(HOC));
