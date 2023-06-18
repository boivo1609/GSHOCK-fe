/* eslint-disable no-unused-vars */
import * as requestFromServer from './crud';

import { callTypes, danhmucSlice } from './slice';

const { actions } = danhmucSlice;

export const getDanhMucPanigation = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getListDanhMucPanigation(queryParams) //goi ben crud
    .then((response) => {
      const { content, size, totalElements, totalPages } = response.data;
      dispatch(actions.DanhmucListPanigation({ content, size, totalElements, totalPages })); // gui du lieu len redux
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getAllDanhMuc = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllDanhMucNoPagination()
    .then((response) => {
      const { data } = response;
      dispatch(actions.DanhmucListAll({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createDanhmuc = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createDanhmuc(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.DanhmucCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const deleteDanhmuc = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDanhmuc(id)
    .then((response) => {
      dispatch(actions.DanhmucDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete point";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateDanhmuc = (id, values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDanhmuc(id, values)
    .then((response) => {
      const { danhmuc } = response.data;
      dispatch(actions.DanhmucUpdate(danhmuc));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
