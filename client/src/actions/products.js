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