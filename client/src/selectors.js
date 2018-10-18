import { createSelector } from 'reselect';

const shopItemsSelector = state => state.shop.items;
const products = state => state.products;

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
);

export const getProductsLength = createSelector(
  products,
  products => products.length
);

