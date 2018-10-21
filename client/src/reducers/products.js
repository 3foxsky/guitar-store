import * as T from '../types';

const initialState = {
  products: null, // []
  bySell: [],
  byArrival: []
};

export default (state = initialState, {type, payload}) => {
  switch(type) {
  case T.GET_PRODUCTS_BY_SELL:
    return {
      ...state,
      bySell: payload
    };
  case T.GET_PRODUCTS_BY_ARRIVAL:
    return {
      ...state,
      byArrival:  payload
    };
  case T.GET_BRANDS:
    return {
      ...state,
      brands: payload
    };
  case T.ADD_BRAND:
    return {
      ...state, 
      addBrand: payload.success , 
      brands:payload.brands 
    };
  case T.GET_WOODS:
    return {
      ...state,
      woods: payload
    };
  case T.ADD_WOOD:
    return {
      ...state, 
      addWood: payload.success , 
      woods:payload.woods 
    };
  case T.GET_PRODUCTS_TO_SHOP:
    return {
      ...state,
      toShop: payload.articles,
      toShopSize: payload.size
    };
  case T.ADD_PRODUCT:
    return { 
      ...state,
      addProduct: payload
    };
  case T.CLEAR_PRODUCT:
    return { 
      ...state,
      addProduct: payload
    };
  case T.GET_PRODUCT_DETAIL:
    return {
      ...state,
      prodDetail: payload
    };
  case T.CLEAR_PRODUCT_DETAIL:
    return {
      ...state,
      prodDetail: payload
    };
  default:
    return state;
  }
};