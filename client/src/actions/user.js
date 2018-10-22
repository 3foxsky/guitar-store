import axios from 'axios';

import * as T from '../types';
import r from './routes.config';

export const logoutUser = (history) => {
  history.push('/');
  return {
    type: T.LOGOUT_USER
  };
};

export const loginUser = (data) => async dispatch => {
  try {
    const res = await axios.post(`${r.users}/login`, data);
    dispatch({
      type: T.LOGIN_USER,
      payload: res.data.successs
    });
    return await res.data;
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

/** ======== CART ============ */

export const addToCart = (_id) => dispatch => {

  axios.post( `${r.users}/addToCart?productId=${_id}`)
    .then(res => {
      dispatch({
        type: T.ADD_TO_CART_USER,
        payload: res.data
      });
    });

};