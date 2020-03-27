import * as actionTypes from "./actionTypes";

export const fetchProductsSuccess = products => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products: products
  };
};

export const fetchProductsFail = error => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error: error
  };
};

export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START
  };
};

export const fetchProducts = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS
  };
};
