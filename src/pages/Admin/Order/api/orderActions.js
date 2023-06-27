/* eslint-disable no-unused-vars */
import * as requestFromServer from './orderCrud';

import { callTypes, orderSlice } from './orderSlice';

const { actions } = orderSlice;

export const getOrderPanigation = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getListOrderPanigation(queryParams) //goi ben crud
    .then((response) => {
      const { content, size, totalElements, totalPages } = response.data;
      dispatch(actions.OrderListPanigation({ content, size, totalElements, totalPages })); // gui du lieu len redux
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createOrder = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createOrder(values)
    .then((response) => {
      const { order } = response.data;
      if (response.status == 200) {
        dispatch(actions.orderSuccess(order._id));
      }
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const clearStatusSuccess = () => (dispatch) => {
  dispatch(actions.clearStatusSuccess());
};
export const duyetDonHang = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .duyetDonHang(id)
    .then((response) => {
      dispatch(actions.duyetDonHang({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
