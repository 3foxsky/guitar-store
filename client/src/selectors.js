import { createSelector } from 'reselect';

const products = state => state.products.toShop;
const cartDetail = state => state.user.cartDetail;

export const getProductsLength = createSelector(
  products,
  toShop => toShop.length
);

export const calculateTotal = createSelector(
  cartDetail,
  me => (
    me.reduce((acc, curr) => acc + parseInt(curr.price, 10) * curr.quantity, 0)
  )
);