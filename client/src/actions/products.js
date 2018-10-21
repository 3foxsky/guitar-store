import axios from 'axios';

import * as T from '../types';
import r from './routes.config';
import { getProductsLength } from '../selectors';

export const loadMore = () => async (dispatch, getState) => {
  const offset = getProductsLength(getState());

  dispatch({type: 'LOAD_MORE_START'});
  try {
    const res = await axios.post(`${r.products}/load-more`, {skip: offset});
    dispatch({
      type: 'LOAD_MORE_SUCCESS',
      payload: res
    });
  } catch (e) {
    
  }
};

export const getProductDetail = (id) => {
  const request = axios.get(`${r.products}/articles_by_id?id=${id}&type=single`)
    .then(response=>{
      return response.data[0];
    });

  return {
    type: T.GET_PRODUCT_DETAIL,
    payload: request
  };

};

export const clearProductDetail = () => {
  return {
    type: T.CLEAR_PRODUCT_DETAIL,
    payload:''
  };
};


export const getProductsBySell = () => dispatch => {
  //?sortBy=sold&order=desc&limit=100
  axios.get(`${r.products}/articles?sortBy=sold&order=desc&limit=4`)
    .then(({data}) => dispatch({
      type: T.GET_PRODUCTS_BY_SELL,
      payload: data
    })
    )
    //! SHOULD BE FAILTURE ACTION
    .catch(console.log);

};

export const getProductsByArrival = () => dispatch => {
  axios.get(`${r.products}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(({data}) => dispatch({
      type: T.GET_PRODUCTS_BY_ARRIVAL,
      payload: data
    })
    )
    //! SHOULD BE FAILTURE ACTION
    .catch(console.log);
};


export const getProductsToShop = (skip, limit, filters =[], previousState = [], setSkip) => {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${r.products}/shop`,data)
    .then(response => {
      let newState = [
        ...previousState,
        ...response.data.articles
      ];
      return {
        size: response.data.size,
        articles: newState
      };
    });
  return {
    type: T.GET_PRODUCTS_TO_SHOP,
    payload: request
  };
};

export const addProduct = (datatoSubmit) => {

  const request = axios.post(`${r.products}/article`,datatoSubmit)
    .then(response => response.data);

  return {
    type: T.ADD_PRODUCT,
    payload: request
  };
};

export const clearProduct = () => {
  return {
    type: T.CLEAR_PRODUCT,
    payload: ''
  };
};


/*************************
********** CATEGORIES
**************************/



export const getBrands = () => {

  const request = axios.get(`${r.products}/brands`)
    .then(response => response.data );

  return {
    type: T.GET_BRANDS,
    payload: request
  };

};

export const addBrand = (dataToSubmit, existingBrands) => {
  const request = axios.post(`${r.products}/brand`,dataToSubmit)
    .then(response=>{
      let brands = [
        ...existingBrands,
        response.data.brand
      ];
      return {
        success: response.data.success,
        brands
      };
    });
  return {
    type: T.ADD_BRAND,
    payload: request
  };
};


export const addWood = (dataToSubmit, existingWoods) => {
  const request = axios.post(`${r.products}/wood`,dataToSubmit)
    .then(response=>{
      let woods = [
        ...existingWoods,
        response.data.wood
      ];
      return {
        success: response.data.success,
        woods
      };
    });
  return {
    type: T.ADD_WOOD,
    payload: request
  };
};



export const getWoods = () => {
  const request = axios.get(`${r.products}/woods`)
    .then(response => response.data );

  return {
    type: T.GET_WOODS,
    payload: request
  };
};




