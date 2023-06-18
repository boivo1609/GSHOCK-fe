import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../pages/authentication/_redux/authRedux';
import { rootsSlice } from 'pages/Root/_redux/rootSlice';
import menuSlices from 'store/reducers/menu';
import { danhmucSlice } from 'pages/Admin/Danhmuc/api/slice';
import { colorSlice } from 'pages/Admin/Mausac/api/sliceColor';
import { bannerSlice } from 'pages/Admin/Banner/api/sliceBanner';
import { productSlice } from 'pages/Admin/SanPham/api/sliceProduct';
import { cartSlice } from 'pages/Customer/Cart/_redux/cartSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  roots: rootsSlice.reducer,
  menu: menuSlices.reducer,
  danhmucs: danhmucSlice.reducer,
  colors: colorSlice.reducer,
  banners: bannerSlice.reducer,
  products: productSlice.reducer,
  carts: cartSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
