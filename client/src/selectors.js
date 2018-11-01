import { createSelector } from 'reselect';

const products = state => state.products.toShop;
const cartDetail = state => state.user.cartDetail;
const cart = state => state.user.userData.cart;

export const getProductsLength = createSelector(
  products,
  toShop => toShop.length
);

export const calculateTotal = createSelector(
  cartDetail,
  cartDetail => (
    cartDetail.reduce((acc, curr) => acc + parseInt(curr.price, 10) * curr.quantity, 0)
  )
);

export const getCartLength = createSelector(
  cart,
  cart => (
    cart.reduce((acc, curr) => acc + parseInt(curr.quantity), 0)
  )
);
