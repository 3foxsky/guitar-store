import * as T from '../types';

const initialState = {
  isShopLoading: false,
  toShop: [],
  bySell: [],
  byArrival: [],
  upload: {
    isLoading: false,
    signedUrl: null,
  }
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
  case T.GET_PRODUCTS_TO_SHOP_START:
    return {
      ...state,
      isShopLoading: true,
    };
  case T.GET_PRODUCTS_TO_SHOP_SUCCESS:
    return {
      ...state,
      toShop: payload.articles,
      toShopSize: payload.size,
      isShopLoading: false,
    };
  case T.GET_PRODUCTS_TO_SHOP_FAILURE:
    return {
      ...state,
      isShopLoading: false,
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
  case T.GET_PRODUCT_DETAIL_START: 
    return {
      ...state,
      isDetailLoading: true,
    };
  case T.GET_PRODUCT_DETAIL_SUCCESS:
    return {
      ...state,
      prodDetail: payload,
      isDetailLoading: false,
    };
  case T.CLEAR_PRODUCT_DETAIL:
    return {
      ...state,
      prodDetail: payload
    };
  case T.UPLOAD_START:
    return {
      ...state,
      upload: {
        ...state.upload,
        isLoading: true
      }
    };
  default:
    return state;
  }
};