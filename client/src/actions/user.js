import axios from 'axios';

import * as T from '../types';
import r from './routes.config';

export const logoutUser = () => ({
  type: T.LOGOUT_USER
});

export const loginUser = async (data) => dispatch => {
  try {
    const res = axios.post(`${r.users}/login`, data);
    dispatch({
      type: T.LOGIN_USER,
      payload: res
    });
    // form promise in login components
    return {
      type: T.LOGIN_USER,
      payload: res
    };
  } catch (e) {
    console.log(e);
  }
};

export const registerUser = async (data) => dispatch => {
  try {
    const res = axios.post(`${r.users}/register`, data);
  } catch (e) {
    console.log(e);
  }
};


export const auth = () => async dispatch => {
  dispatch({type: T.AUTH_START});
  
  try {
    const res = await axios.get(`${r.users}/auth`);
    dispatch({
      type: T.AUTH_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: T.AUTH_FAILURE,
      payload: e,
    });
  }


};

const template = () => async dispatch => {
  dispatch({type: 'FETCH_PHONES_START'});

  try {
    const phones = await axios.post('api/test', {});
    dispatch({
      type: 'FETCH_PHONES_SUCCESS',
      payload: phones
    });
  } catch (e) {
    dispatch({
      type: 'FETCH_PHONES_FAILURE',
      payload: e,
      error: true,
    });
  }
};