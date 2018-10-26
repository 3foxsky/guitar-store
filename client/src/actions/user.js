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

export const registerUser = async (data) => dispatch => {
  try {
    const res = axios.post(`${r.users}/register`, data);
  } catch (e) {
    console.log(e);
  }
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



export const getCartItems = (cartItems, userCart) => dispatch => {
  axios.get(`${r.users}/articles_by_id?id=${cartItems}&type=array`)
    .then(res => {
      userCart.map(item=>{
        res.data.map((k,i)=>{
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


export const addToCart = (id) => async (dispatch, getStore) => {
  const userData = getStore.user.userData;
  const isAuth = getStore().user.userData.isAuth;

  axios.put( `${r.users}/updateCart`)
    .then(res => {
      dispatch({
        type: T.ADD_TO_CART_USER,
        payload: res.data
      });
    });
};

export const removeFromCart = (id) => async (dispatch, getStore) => {
  const userData = getStore.user.userData;
  const isAuth = getStore().user.userData.isAuth;
  // if (isAuth) {
  axios.put(`${r.user}/updateCart`)
    .then( res => {
      dispatch({
        type: T.REMOVE_CART_ITEM_USER,
        payload: res.data
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



// export function onSuccessBuy(data){ 
//   const request = axios.post(`${r.user}/successBuy`,data)
//     .then(response => response.data);

//   return {
//     type: T.ON_SUCCESS_BUY_USER,
//     payload: request
//   };
// }

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
