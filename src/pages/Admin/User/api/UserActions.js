import * as requestFromServer from './UserCrud';

import { callTypes, UserSlice } from './UserSlice';

const { actions } = UserSlice;

export const getUserPanigation = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getListUserPanigation(queryParams) //goi ben crud
    .then((response) => {
      const { content, size, totalElements, totalPages } = response.data;
      dispatch(actions.UserListPanigation({ content, size, totalElements, totalPages })); // gui du lieu len redux
    })
    .catch((error) => {
      error.clientMessage = "Can't find projects";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
