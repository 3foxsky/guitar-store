import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import Input from '../../common/Input';

// import { updateUserData, clearUpdateUser} from '../../actions/user';
const re =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



class ProfileInfo extends Component {
  render() {
    const {
      // formik props
      values,
      touched,
      errors,
      submitCount,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Personal information</h2>
          <div className="form_block_two">
            <div className="block">
              <Input
                name={'firstName'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={errors.firstName}
                placeholder="Enter your name"
              />
            </div>
            <div className="block">
              <Input
                name={'lastName'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div>
            <Input
              name={'email'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
              placeholder="Enter your email"
            />
          </div>
          <div>
            {/* {
              this.state.formSuccess ?
                <div className="form_success">Success</div>
                :null
            }
            {this.state.formError ?
              <div className="error_label">
                                Please check your data
              </div>
              : null} */}
            <button type="submit" onClick={handleSubmit}>
              Update personal info
            </button>
          </div>

        </form>
      </div>
    );
  }
}

const HOC = withFormik({
  mapPropsToValues: ({user: { user }}) => {
    return {   
      email: user.userData.email,
      firstName: user.userData.firstName,
      lastName: user.userData.lastName,
    };},
  validate: values => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = 'Required';
    } else if (!re.test(String(values.email).toLowerCase())) {
      errors.email = 'Email is not valid';
    }
    if (!values.firstName.trim()) {
      errors.firstName = 'Required';
    }
    if (!values.lastName.trim()) {
      errors.lastName = 'Required';
    }
    return errors;
  },

  handleSubmit: ({email, password}, {props, props: {location, history}, setValues}) => {
    
  },
  validateOnChange: false,
  displayName: 'UpdateForm',
})(ProfileInfo);

export default connect(
  (user) => ({
    user,
  })
)(HOC);