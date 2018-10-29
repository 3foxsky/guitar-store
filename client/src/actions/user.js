import axios from 'axios';
import * as R from 'ramda';

import * as T from '../types';
import r from './routes.config';

export const logoutUser = (history) => dispatch => {
  axios.post(`${r.users}/logout`)
    .then( res => {
      history.push('/');
      dispatch({
        type: T.LOGOUT_USER
      });
    });
};

export const loginUser = (data) => async dispatch => {
  try {
    const res = await axios.post(`${r.users}/login`, data);
    dispatch({
      type: T.LOGIN_USER,
      payload: res.data.success
    });
    return await res.data;
  } catch (e) {
    console.log(e);
  }
};

export const registerUser = (data) => async dispatch => {
  dispatch({
    type: T.REGISTER_USER_START
  });

  try {
    const res = await axios.post(`${r.users}/register`, data);
    dispatch({
      type: T.REGISTER_USER,
      payload: {
        success: res.data.success,
        error: res.data.error,
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const clearRegister = () => dispatch => {
  dispatch({
    type: T.CLEAR_REGISTER
  });
};


export const auth = () => async (dispatch, getStore) => {
  const { isAuth } = getStore().user.userData;
  if (!isAuth) {
    dispatch({type: T.AUTH_START});
  }
  
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

/* 
 * ************* ======== CART STARTS ============ ***************
 */

//* addToCart, removeFromCart LAST functionality
// export const addToCart = (id) => dispatch => {
//   axios.put( `${r.users}/addToCart?productId=${id}`)
//     .then(res => {
//       dispatch({
//         type: T.ADD_TO_CART_USER,
//         payload: res.data
//       });
//     });

// };

// export function removeCartItem(id){

//   const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
//     .then(response => {

//         response.data.cart.forEach(item=>{
//             response.data.cartDetail.forEach((k,i)=>{
//                 if(item.id === k._id){
//                     response.data.cartDetail[i].quantity = item.quantity;
//                 }
//             })
//         })
//             return response.data;
//     })

//   return {
//       type: REMOVE_CART_ITEM_USER,
//       payload: request
//   }

// }
//* addToCart, removeFromCart LAST functionality



export const getCartItems = () => (dispatch, getStore) => {
  const cart = getStore().user.userData.cart;
  const cartItemIds = cart.map( i => i.id);

  axios.get(`${r.products}/acrticles-by-id?id=${cartItemIds}&type=array`)
    .then(res => {
      cart.map(item => {
        res.data.map((k,i) => {
          if(item.id === k._id){
            res.data[i].quantity = item.quantity;
          }
        });
      });
      dispatch({
        type: T.GET_CART_ITEMS_USER,
        payload: res.data,
      });
    });

};


export const addToCart = (id) => (dispatch, getStore) => {
  const cart = R.clone(getStore().user.userData.cart);
  const { isAuth } = getStore().user.userData;

  // if (isAuth) {
  const prodIdx = cart.findIndex(i => i.id === id);
  // cause -1 == true
  if (!prodIdx) {
    cart[prodIdx].quantity += 1;
  } else {
    cart.push({
      id,
      quantity: 1,
      date: new Date().getTime(),
    });
  }
  axios.put(`${r.users}/updateCart`, cart)
    .then(res => {    
      dispatch({
        type: T.UPDATE_CART,
        payload: res.data
      });
    });

  //  else {
  //   const cart = await JSON.parse(localStorage.getItem('cart'));
  //   const prodIdx = R.findIndex(R.propEq('id', id))(cart);
  //   if (prodIdx){
  //     cart[prodIdx].quantity += 1;
  //   } else {
  //     cart.push({
  //       id,
  //       quantity: 1,
  //       date: new Date().getTime(),
  //     });
  //   }
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }
};


export const removeFromCart = (id) => async (dispatch, getStore) => {
  const user = R.clone(getStore().user);
  let cartDetail = R.clone(user.cartDetail);
  let cart = R.clone(user.userData.cart);
  const { isAuth } = getStore().user.userData;
  // if (isAuth) {
  cart = cart.filter(i => i.id !== id);
  cartDetail = cartDetail.filter(i => i._id !== id);

  axios.put(`${r.users}/updateCart`, cart)
    .then( res => {
      dispatch({
        type: T.UPDATE_CART,
        payload: {
          cart: res.data.cart,
          cartDetail
        }
      });
    });
  // } else {
  //   const cart = await JSON.parse(localStorage.getItem('cart'));
  //   const newCart = await cart.filter(i => i._id === id);
  //   await localStorage.setItem('cart', JSON.stringify(newCart));
  //   dispatch({
  //     type: T.UPDATE_DATA_USER,
  //     payload: {
  //       ...userData,
  //       cart: newCart
  //     }
  //   });
  // }
};


//* Paypal payment
// export function onSuccessBuy(data){ 
//   const request = axios.post(`${r.user}/successBuy`,data)
//     .then(response => response.data);

//   return {
//     type: T.ON_SUCCESS_BUY_USER,
//     payload: request
//   };
// }
//* Paypal payment

//* update user profile
// export function updateUserData(dataToSubmit){
//   const request = axios.post(`${r.user}/update_profile`,dataToSubmit)
//     .then(response => {
//       return response.data;
//     });
  
//   return {
//     type: T.UPDATE_DATA_USER,
//     payload: request
//   };
// }

// export function clearUpdateUser(){
//   return {
//     type: T.CLEAR_UPDATE_USER_DATA,
//     payload: ''
//   };
// }
//* update user profile