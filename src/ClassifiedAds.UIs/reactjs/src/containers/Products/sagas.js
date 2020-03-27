import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./actions";

export function* fetchProductsSaga(action) {
  yield put(actions.fetchProductsStart());
  try {
    const response = yield axios.get("https://localhost:44312/api/products");
    const fetchedProducts = response.data;
    yield put(actions.fetchProductsSuccess(fetchedProducts));
  } catch (error) {
    yield put(actions.fetchProductsFail(error));
  }
}

export function* watchProduct() {
  yield takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga);
}
