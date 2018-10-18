import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';

import Input from '../common/Input';

import { userRegister } from '../../actions/user';

const Register = ({
  //? formik props
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <form onSubmit={(event)=>  this.submitForm(event)}>
              <h2>Personal information</h2>
              <div className="form_block_two">
                <div className="block">
                  <Input
                    onChange={handleChange}
                    name={'name'}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    value={values.email}
                  />
                </div>
                <div className="block">
                  <Input
                    onChange={handleChange}
                    name={'lastname'}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    value={values.email}
                  />
                </div>
              </div>
              <div>
                <Input
                  onChange={handleChange}
                  name={'email'}
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
                    name={'password'}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    value={values.email}
                  />
                </div>
                <div className="block">
                  <Input
                    onChange={handleChange}
                    name={'confirmPassword'}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    value={values.email}
                  />
                </div>
              </div>
              <div>
                { this.state.formError ?
                  <div className="error_label">
                                        Please check your data
                  </div>
                  :null}
                <button onClick={(event)=> this.submitForm(event)}>
                                    Create an account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>     

      <Dialog open={this.state.formSuccess}>
        <div className="dialog_alert">
          <div>Congratulations !!</div>
          <div>
                        You will be redirected to the LOGIN in a couple seconds...
          </div>
        </div>
      </Dialog>


    </div>
  );
};

export default connect()(Register);
