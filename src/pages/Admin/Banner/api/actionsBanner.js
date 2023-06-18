import * as requestFromServer from './crudBanner';

import { callTypes, bannerSlice } from './sliceBanner';

const { actions } = bannerSlice;
export const getBannerPanigation = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getListBannerPanigation(queryParams) //goi ben crud
    .then((response) => {
      const { content, size, totalElements, totalPages } = response.data;
      dispatch(actions.BannerListPanigation({ content, size, totalElements, totalPages })); // gui du lieu len redux
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const getAllBanner = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllBannerNoPagination(queryParams)
    .then((response) => {
      const { data } = response;
      dispatch(actions.BannerListAll({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const createBanner = (values) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .createBanner(values)
    .then((response) => {
      const { data } = response;
      dispatch(actions.BannerCreate(data));
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const deleteBanner = (id, imagePublicId) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return (
    requestFromServer
      .deleteBanner(id, imagePublicId)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        dispatch(actions.BannerDeleted({ id }));
      })
      .catch((error) => {
        error.clientMessage = "Can't delete point";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      })
  );
};
