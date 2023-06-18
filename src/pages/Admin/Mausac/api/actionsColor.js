/* eslint-disable no-unused-vars */
import * as requestFromServer from './crudColor';

import { callTypes, colorSlice } from './sliceColor';

const { actions } = colorSlice;

export const getColorPanigation = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getListColorPanigation(queryParams) //goi ben crud
    .then((response) => {
      const { content, size, totalElements, totalPages } = response.data;
      dispatch(actions.ColorListPanigation({ content, size, totalElements, totalPages })); // gui du lieu len redux
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getAllColor = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllColorNoPagination(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.ColorListAll({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createColor = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createColor(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.ColorCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteColor = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteColor(id)
    .then((response) => {
      dispatch(actions.ColorDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateColor = (id, values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateColor(id, values)
    .then((response) => {
      const { color } = response.data;
      dispatch(actions.ColorUpdate(color));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
