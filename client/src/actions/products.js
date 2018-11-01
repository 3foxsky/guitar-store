import axios from 'axios';

import * as T from '../types';
import r from './routes.config';
import { getProductsLength } from '../selectors';

//! add FAILURE actinos instead of them absence or logs

/*************************
********** IMAGE UPLOAD
**************************/


export const uploadImage = file => async dispatch => {
  dispatch({type: T.UPLOAD_START});

  axios.get('/api/upload')
    .then( res => {
      return axios.put('/api/upload', file, {
        headers: {
          'Content-Type': file.type
        }
      });
    })
    .then( res => {
      // ! add product id
      return axios.put('/api/products/5b2d4b70e4b4a1d22d374f8b', {url: res.data.url });
    })
    .then( res => {
      dispatch({
        type: T.UPLOAD_SUCCESS,
        payload: res.data.success
      });
    })
    .catch(e => {
      dispatch({
        type: T.UPLOAD_FAILURE,
        error: e,
        message: 'Sorry can\'t upload your file'
      });
    });
  // try {
  //   const res = await axios.get('/api/upload');

  //   dispatch({
  //     type: T.UPLOAD_SUCCESS,
  //     payload: {}
  //   });
  // } catch (e) {
  //   dispatch({
  //     type: T.UPLOAD_FAILURE,
  //     error: e,
  //     message: 'Sorry can\'t upload your file'
  //   });
  // }
};

/*************************
********** PROODUCTS FETCHING
**************************/

export const getProductsToShop = (skip, limit, filters =[], previousState = []) => async dispatch => {
  const settings = {
    limit,
    skip,
    filters
  };
  dispatch({type: T.GET_PRODUCTS_TO_SHOP_START});

  try {
    const res = await axios.post(`${r.products}/shop`, settings);
    const {data} = await res;
    
    dispatch({
      type: T.GET_PRODUCTS_TO_SHOP_SUCCESS,
      payload: {
        size: data.size,
        articles: [
          ...previousState,
          ...data.articles
        ]
      }
    });
    
  } catch (e) {
    console.log(e);
    dispatch({
      type: T.GET_PRODUCTS_TO_SHOP_FAILURE,
      error: e,
    });
  }

};


export const getProductDetail = (id, history) => async dispatch => {
  dispatch({type: T.GET_PRODUCT_DETAIL_START});

  try {
    const { data } = await axios.get(`${r.products}/acrticles-by-id?id=${id}&type=single`);

    dispatch({
      type: T.GET_PRODUCT_DETAIL_SUCCESS,
      payload: data[0]
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: T.GET_PRODUCT_DETAIL_FAILURE,
      error: e
    });
  }

};

export const clearProductDetail = () => {
  return {
    type: T.CLEAR_PRODUCT_DETAIL,
    payload:''
  };
};


export const getProductsBySell = () => dispatch => {
  axios.get(`${r.products}/articles?sortBy=sold&order=desc&limit=4`)
    .then(({data}) => dispatch({
      type: T.GET_PRODUCTS_BY_SELL,
      payload: data
    })
    )
    .catch(console.log);

};

export const getProductsByArrival = () => dispatch => {
  axios.get(`${r.products}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(({data}) => dispatch({
      type: T.GET_PRODUCTS_BY_ARRIVAL,
      payload: data
    })
    )
    .catch(console.log);
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


export const getBrands = () => dispatch => {
  axios.get(`${r.products}/brands`)
    .then(({data}) => 
      dispatch({
        type: T.GET_BRANDS,
        payload: data
      })
    );
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


export const addWood = (dataToSubmit, existingWoods) => dispatch => {
  axios.post(`${r.products}/wood`,dataToSubmit)
    .then(response => { 
      dispatch({
        type: T.ADD_WOOD,
        payload: response
      });
    }
    ).catch(console.log);
};

export const getWoods = () => dispatch => {
  axios.get(`${r.products}/woods`)
    .then( ({data}) => {
      dispatch({
        type: T.GET_WOODS,
        payload: data
      });
    }
    );
};
