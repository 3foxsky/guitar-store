import * as T from '../types';

const initialState = {
  loginSucces: false,
  isLoading: false,
  register: {
    success: false,
    error: null,
    isLoading: false,
  },
  userData: {
    isAuth: false,
    cart: [],
  },
  cartDetail: [],
};

export default (state = initialState, {type, payload}) => {
  switch(type) {
  // SING UP/IN
  case T.REGISTER_USER_START:
    return {
      ...state,
      register: {
        ...state.register,
        isLoading: true
      }
    };
  case T.REGISTER_USER:
    return {
      ...state,
      register: {
        success: payload.success,
        error: payload.error,
        isLoading: false
      }
    };
  case T.CLEAR_REGISTER: 
    return {
      ...state,
      register: initialState.register
    };
  case T.LOGIN_USER:
    return { 
      ...state,
      loginSucces: payload
    };
  case T.LOGOUT_USER:
    return initialState;

  // AUTHENTICATION
  case T.AUTH_START: 
    return {
      ...state,
      isLoading: true
    };
  case T.AUTH_SUCCESS:
    return{
      ...state, 
      userData: payload,
      isLoading: false,
    };
  case T.AUTH_FAILURE:
    return {
      ...state,
      isLoading: false,
    };

    // CART  
  case T.UPDATE_CART:
    return {
      ...state,
      cartDetail: payload.cartDetail || [],
      userData:{
        ...state.userData,
        cart: payload.cart
      },
    };
  case T.GET_CART_ITEMS_USER:
    return {
      ...state,
      cartDetail: payload
    };
  case T.ON_SUCCESS_BUY_USER:
    return {
      ...state,
      successBuy: payload.success,
      userData:{
        ...state.userData,
        cart: payload.cart
      },
      cartDetail: payload.cartDetail
    };
    
  // PROFILE
  case T.UPDATE_DATA_USER:
    return {
      ...state,
      updateUser: payload
    };
  case T.CLEAR_UPDATE_USER_DATA:
    return {
      ...state,
      updateUser: payload
    };
  default:
    return state;
  }
};