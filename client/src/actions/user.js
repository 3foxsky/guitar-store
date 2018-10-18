import axios from 'axios';

import * as T from '../types';
import r from './routes.config';

export const logoutUser = () => ({
  type: T.LOGOUT_USER
});

export const loginUser = async (data) => dispatch => {

  try {
    const res = axios.post(`${r.users}/login`, data);
    
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


export const auth = () => {

  const res = axios.get(`${r.users}/auth`)
    .then(response => response.data);

  return {
    type: T.AUTH_USER,
    payload: res
  };
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