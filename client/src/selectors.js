import { createSelector } from 'reselect';

const products = state => state.products.toShop;

export const getProductsLength = createSelector(
  products,
  toShop => toShop.length
);

